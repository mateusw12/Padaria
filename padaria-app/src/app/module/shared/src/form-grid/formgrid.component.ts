import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { OnPropertyChange, untilDestroyed } from '@module/utils/common';
import { InvalidOperationException, isNil } from '@module/utils/internal';
import {
  CommandClickEventArgs,
  CommandModel,
  GridComponent,
  QueryCellInfoEventArgs,
} from '@syncfusion/ej2-angular-grids';
import { InputEventArgs } from '@syncfusion/ej2-angular-inputs';
import { Subject } from 'rxjs';
import { debounceTime, throttleTime } from 'rxjs/operators';
import { SfGridHelper } from '../grid/helper';
import { SfGridColumnModel } from '../grid/interfaces';

interface FormGridAddCommandEventArgs {
  command: 'Add';
}

interface FormGridSearchCommandEventArgs {
  command: 'Search';
}

interface FormGridRowCommandEventArgs {
  command: 'Edit' | 'Remove' | 'Copy' | 'Add';
  rowData: object;
}

export type FormGridCommandEventArgs =
  | FormGridSearchCommandEventArgs
  | FormGridAddCommandEventArgs
  | FormGridRowCommandEventArgs;

@Component({
  selector: 'ejs-formgrid',
  templateUrl: './formgrid.component.html',
  styleUrls: ['./formgrid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormGridComponent implements OnInit, OnDestroy {

  private initialized = false;
  private loadEventHandler$ = new Subject<void>();
  private commandEventHandler$ = new Subject<FormGridCommandEventArgs>();
  private dataSourceChanged = false;

  private gridCommandColumn: SfGridColumnModel = {
    field: 'formgridcommandcolumn',
    headerText: '',
    textAlign: 'Center',
    allowFiltering: false,
    allowSorting: false,
    allowReordering: false,
    allowSearching: false,
    allowResizing: true,
    fixedWidth: true,
  };

  private gridEditCommand: CommandModel = {
    title: 'Editar',
    buttonOption: { cssClass: 'e-info', iconCss: 'e-icons e-edit' },
  };
  private gridRemoveCommand: CommandModel = {
    title: 'Remover',
    buttonOption: { cssClass: 'e-danger', iconCss: 'e-icons e-close' },
  };
  private gridCopyCommand: CommandModel = {
    title: 'Copiar',
    buttonOption: { cssClass: 'e-info', iconCss: 'e-icons e-copy' },
  };

  gridDataSource: object[] = [];
  gridColumns: SfGridColumnModel[] = [];
  gridSearch = '';
  gridLoaded = false;

  @ViewChild(GridComponent, { static: false })
  private grid: GridComponent | undefined;

  @ContentChild('toolbarTemplate', { read: TemplateRef, static: true })
  toolbarTemplate!: TemplateRef<unknown>;

  @Input()
  @HostBinding('style.width')
  width: string = '';

  @Input()
  @HostBinding('style.height')
  height: string = '';

  @Input()
  dataSource: object[] = [];

  @Input()
  columns: SfGridColumnModel[] | undefined;

  @Input()
  enableAutoFitColumns = true;

  @Input()
  showSearchButton = false;

  @Input()
  showAddButton = true;

  @Input()
  showEditButton = true;

  @Input()
  showRemoveButton = true;

  @Input()
  showCopyButton = false;

  @Output()
  command = new EventEmitter<FormGridCommandEventArgs>();

  @Output()
  dataBounded = new EventEmitter<void>();

  @Output()
  queryCellInfo = new EventEmitter<QueryCellInfoEventArgs>();

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.registerEvents();
  }

  ngOnInit(): void {
    this.initialized = true;
    this.triggerLoad();
  }

  ngOnDestroy(): void {}

  onGridCommandClick(event: CommandClickEventArgs): void {
    if (!event.rowData) return;
    if (!event.commandColumn) return;

    switch (event.commandColumn) {
      case this.gridEditCommand:
        this.triggerCommand({ command: 'Edit', rowData: event.rowData });
        break;
      case this.gridRemoveCommand:
        this.triggerCommand({ command: 'Remove', rowData: event.rowData });
        break;
      case this.gridCopyCommand:
        this.triggerCommand({ command: 'Copy', rowData: event.rowData });
        break;
      default:
        break;
    }
  }

  onButtonSearchClick(): void {
    this.triggerCommand({ command: 'Search' });
  }

  onButtonAddClick(): void {
    this.triggerCommand({ command: 'Add' });
  }

  onSearch(event: any): void {
    console.log(event);
    const input = event as InputEventArgs;
    this.executeGridSearch(input.value as string);
  }

  @OnPropertyChange([
    'columns',
    'showEditButton',
    'showRemoveButton',
    'showCopyButton',
  ])
  onColumnsChange(): void {
    this.gridColumns = this.getGridColumns();
    this.triggerLoad();
  }

  @OnPropertyChange('dataSource')
  onDataSourceChange(): void {
    this.dataSourceChanged = true;
    this.triggerLoad();
  }

  @OnPropertyChange('showAddButton')
  onInputPropertyChange(): void {
    this.changeDetectorRef.markForCheck();
  }

  getGrid(): GridComponent {
    if (!this.grid)
      throw new InvalidOperationException('A grade não foi inicializada.');
    return this.grid;
  }

  hasGrid(): boolean {
    return !!this.grid;
  }

  private registerEvents(): void {
    this.loadEventHandler$
      .pipe(debounceTime(0), untilDestroyed(this))
      .subscribe(this.onLoad.bind(this));

    this.commandEventHandler$
      .pipe(throttleTime(500), untilDestroyed(this))
      .subscribe(this.command);
  }

  private triggerLoad(): void {
    if (!this.initialized) return;
    this.loadEventHandler$.next();
  }

  private triggerCommand(event: FormGridCommandEventArgs): void {
    this.commandEventHandler$.next(event);
  }

  private onLoad(): void {
    this.clearGridSearch();
    this.gridDataSource = this.dataSource;
    this.gridLoaded =
      this.gridColumns.length > 0 && !isNil(this.gridDataSource);
    this.generateCalculatedColumns();
    this.changeDetectorRef.markForCheck();
  }

  private generateCalculatedColumns(): void {
    if (!this.dataSourceChanged) return;
    this.dataSourceChanged = false;
    if (!this.gridDataSource) return;
    SfGridHelper.generateCalculatedColumns(
      this.gridDataSource,
      this.gridColumns
    );
  }

  private getGridColumnCommands(): CommandModel[] {
    const commands: CommandModel[] = [];
    if (this.showEditButton) commands.push(this.gridEditCommand);
    if (this.showRemoveButton) commands.push(this.gridRemoveCommand);
    if (this.showCopyButton) commands.push(this.gridCopyCommand);
    return commands;
  }

  private getGridCommandColumn(): SfGridColumnModel | null {
    const commands = this.getGridColumnCommands();
    if (commands.length === 0) return null;
    const width = commands.length * 38 + commands.length * 7 + 20;
    this.gridCommandColumn.commands = commands;
    this.gridCommandColumn.width = width;
    this.gridCommandColumn.minWidth = width;
    this.gridCommandColumn.maxWidth = width;
    return this.gridCommandColumn;
  }

  private getGridColumns(): SfGridColumnModel[] {
    const columns: SfGridColumnModel[] = [];
    const columnCommand = this.getGridCommandColumn();
    if (columnCommand) columns.push(columnCommand);
    if (this.columns) columns.push(...this.columns);
    return columns;
  }

  private executeGridSearch(value: string): void {
    if (!this.hasGrid()) return;
    this.getGrid().search(value);
  }

  private clearGridSearch(): void {
    this.gridSearch = '';
    if (!this.hasGrid()) return;
    this.getGrid().searchSettings.key = '';
  }
}
