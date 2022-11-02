import { ChangeDetectorRef, Directive, EventEmitter, HostBinding, Input, OnDestroy, Optional, Output, SkipSelf } from '@angular/core';
import { untilDestroyed, OnPropertyChange } from '@module/utils/common';
import { isNil } from '@module/utils/internal';
import { ActionEventArgs, Column, ColumnModel, GridComponent, ResizeArgs } from '@syncfusion/ej2-angular-grids';
import { DataManager, DataResult } from '@syncfusion/ej2-data';
import { isArray } from 'jquery';
import { EMPTY, from, iif, ObservableInput, Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ViewRefreshService } from '../view-refresh/view-refresh.service';
import { SfGridHelper } from './helper';
import { SfGridColumnModel } from './interfaces';

interface SfGridComponent extends GridComponent {
  autoWrapHeaderText?: boolean;
}

interface SfGridActionFilterSearchBeginEventArgs {
  requestType: 'filtersearchbegin';
  column: { type: string };
  operator: string;
}

type SfGridActionEventArgs = ActionEventArgs | SfGridActionFilterSearchBeginEventArgs;

@Directive({
  selector: 'ejs-grid'
})
export class GridDirective implements OnDestroy {

  private destroyedEventHandler$ = new Subject<void>();
  private isDataBound = false;
  private isCreated = false;

  @HostBinding('class.invisible')
  isInvisible = true;

  @Input()
  enableAutoFitColumns = true;

  @Output()
  dataBounded = new EventEmitter<void>();

  @Input()
  columns!: Column[] | string[] | ColumnModel[];

  @Input()
  dataSource!: object | DataManager | DataResult;

  constructor(
    private component: GridComponent,
    private changeDetectorRef: ChangeDetectorRef,
    @SkipSelf() @Optional() private viewRefreshService: ViewRefreshService
  ) {
    this.configure();
    this.registerEvents();
  }

  ngOnDestroy(): void { }

  getCurrentData(): Promise<{ result: object[] }> {
    const skipQueries = ['onAggregates', 'onPage'];
    const dataModule = this.component.getDataModule();
    const query = dataModule.generateQuery(true);
    query.queries = query.queries.filter(item => !skipQueries.includes(item.fn as string));
    return dataModule.getData({}, query) as Promise<{ result: object[] }>;
  }

  autoFitColumns(): void {
    if (!this.hasDataSource() || this.enableAutoFitColumns) {
      const columns = SfGridHelper.getAutoFitColumns(this.component.columns as SfGridColumnModel[]);
      if (columns.length > 0) {
        this.component.autoFitColumns(columns);
      }
    }
  }

  private configure(): void {
    (this.component as SfGridComponent).autoWrapHeaderText = true;
    this.component.pageSettings = { pageSize: 250 };
    this.component.filterSettings = { type: 'Excel', ignoreAccent: true };
    this.component.searchSettings = { ignoreAccent: true };
    this.component.selectionSettings = { mode: 'Row', type: 'Single', cellSelectionMode: 'Flow' };
    this.component.contextMenuItems = ['PdfExport', 'ExcelExport', 'CsvExport'];
    this.component.enableAltRow = true;
    this.component.enableVirtualization = true;
    this.component.enableColumnVirtualization = false;
    this.component.allowExcelExport = true;
    this.component.allowPdfExport = true;
    this.component.allowSorting = true;
    this.component.allowSelection = true;
    this.component.allowReordering = false;
    this.component.allowResizing = true;
    this.component.allowFiltering = true;
    this.component.rowHeight = 17;
    this.component.gridLines = 'Both';
    this.component.width = '100%';
    this.component.height = '100%';
  }

  private registerEvents(): void {

    from(this.component.created as ObservableInput<object>)
      .pipe(untilDestroyed(this))
      .subscribe(this.onCreated.bind(this));

    from(this.component.destroyed as ObservableInput<object>)
      .pipe(untilDestroyed(this))
      .subscribe(this.onDestroyed.bind(this));

    from(this.component.destroyed as ObservableInput<object>)
      .pipe(untilDestroyed(this))
      .subscribe(this.onDestroyed.bind(this));

    from(this.component.resizing as ObservableInput<ResizeArgs>)
      .pipe(untilDestroyed(this))
      .subscribe(this.onResizing.bind(this));

    from(this.component.resizeStop as ObservableInput<ResizeArgs>)
      .pipe(untilDestroyed(this))
      .subscribe(this.onResizeStop.bind(this));

    from(this.component.actionBegin as ObservableInput<SfGridActionEventArgs>)
      .pipe(untilDestroyed(this))
      .subscribe(this.onActionBegin.bind(this));

    from(this.component.dataBound as ObservableInput<object>)
      .pipe(untilDestroyed(this))
      .subscribe(this.onDataBound.bind(this));

    if (this.viewRefreshService) {
      this.viewRefreshService.onRefresh
        .pipe(untilDestroyed(this))
        .subscribe(this.onViewRefresh.bind(this));
    }

  }

  private onCreated(): void {
    this.isCreated = true;
  }

  private onDestroyed(): void {
    this.isCreated = false;
    this.destroyedEventHandler$.next();
  }

  private onResizing(): void {
    this.refreshScroll();
  }

  private onResizeStop(): void {
    timer(0).pipe(
      takeUntil(this.destroyedEventHandler$)
    ).subscribe(this.refreshScroll.bind(this));
  }

  private onActionBegin(event: SfGridActionEventArgs): void {
    if (event.requestType === 'filtersearchbegin' && event.column.type === 'string') {
      event.operator = 'contains';
    }
  }

  private onDataBound(): void {
    if (this.isDataBound) return;
    this.isDataBound = true;
    this.autoFitColumns();
    this.refreshScroll();
    iif(() => !this.isInvisible, EMPTY, timer(0))
      .pipe(takeUntil(this.destroyedEventHandler$))
      .subscribe({
        next: () => {
          this.isInvisible = false;
          this.changeDetectorRef.markForCheck();
        },
        complete: () => this.dataBounded.emit()
      });
  }

  private onViewRefresh(): void {
    if (!this.isCreated) return;
    this.autoFitColumns();
    this.refreshScroll();
  }

  private hasDataSource(): boolean {
    return !isNil(this.component.dataSource)
      && (!isArray(this.component.dataSource) || this.component.dataSource.length > 0);
  }

  private refreshScroll(): void {
    this.component.scrollModule.refresh();
  }

  @OnPropertyChange(['columns', 'dataSource'])
  private onPropertyChange(): void {
    this.isDataBound = false;
  }

}
