import { Directive, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { untilDestroyed } from '@module/utils/common';
import { Delegate } from '@module/utils/internal';
import { DropDownListComponent, FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { DataManager, Predicate, Query } from '@syncfusion/ej2-data';
import { EmptyError, from, Observable, ObservableInput, of, throwError } from 'rxjs';
import { catchError, debounceTime, map, takeUntil, tap, throwIfEmpty } from 'rxjs/operators';

type DropDownListSearchType = 'Search' | 'Find';

type DropDownListValue = string | number | boolean;

// tslint:disable-next-line: no-any
type DropDownListItem = { [key in PropertyKey]: any };

interface DropDownListState {
  value: DropDownListValue | null;
  isDataFetched: boolean;
  list: HTMLElement | null;
  actionCompleteData: object;
  listData: DropDownListItem[];
  selectData: DropDownListItem[];
  sortedData: DropDownListItem[];
  ulElement: HTMLUListElement | null;
  liCollections: HTMLLIElement[];
  selectedLI: HTMLLIElement | null;
}

interface DropDownListSearchResult {
  result: DropDownListItem[];
}

class DropDownListSearchDataManager extends DataManager {

  constructor(private service: DropDownListSearchDirective) {
    super();
  }

  executeQuery(query: Query, done?: Delegate, fail?: Delegate, always?: Delegate): Promise<any> {
    const filter = this.getFilter(query);
    const type = filter && filter.operator === 'equal' ? 'Find' : 'Search';
    const value = filter ? filter.value as DropDownListValue : '';
    const promise = this.search(type, value);
    if (done || fail) promise.then(done, fail);
    if (always) promise.then(always, always);
    return promise;
  }

  clear(): void {
    this.dataSource.json = [];
  }

  private search(type: DropDownListSearchType, value: DropDownListValue): Promise<DropDownListSearchResult> {
    const event: DropDownListSearchEventArgs = { type, value };
    this.service.search.next(event);
    if (!event.response) event.response = of([]);
    return event.response.pipe(
      takeUntil(this.service.search),
      tap(data => this.dataSource.json = data),
      map(result => ({ result })),
      throwIfEmpty(),
      catchError(error =>
        error instanceof EmptyError
          ? of({ result: this.dataSource.json as DropDownListItem[] })
          : throwError(error)
      ),
      untilDestroyed(this.service)
    ).toPromise();
  }

  private getFilter(query: Query): Predicate | null {
    if (query.queries.length === 0) return null;
    return query.queries[0].e as Predicate;
  }

}

export interface DropDownListSearchEventArgs {
  type: DropDownListSearchType;
  value: DropDownListValue;
  response?: Observable<DropDownListItem[]>;
}

@Directive({
  selector: '[mnuDropDownListSearch]'
})
export class DropDownListSearchDirective implements OnInit, OnDestroy {

  private dataSource = new DropDownListSearchDataManager(this);

  @Output()
  search = new EventEmitter<DropDownListSearchEventArgs>();

  constructor(private component: DropDownListComponent) {
    this.component.filterBarPlaceholder = 'Pesquisar...';
    this.component.allowFiltering = true;
    this.component.dataSource = this.dataSource;
  }

  ngOnInit(): void {
    this.component.on('beforeValueChange', this.onBeforeValueChange);

    from(this.component.filtering as ObservableInput<FilteringEventArgs>)
      .pipe(debounceTime(500), untilDestroyed(this))
      .subscribe(this.onFiltering.bind(this));

    const showPopup = this.component.showPopup;
    this.component.showPopup = () => {
      this.onShowPopup();
      showPopup.call(this.component);
    };
  }

  ngOnDestroy(): void { }

  clear(): void {
    this.dataSource.clear();
    const state = this.getState();
    state.isDataFetched = false;
    state.listData = [];
    state.selectData = [];
    state.sortedData = [];
    state.ulElement = null;
    state.liCollections = [];
    state.selectedLI = null;
    this.reset();
  }

  private reset(): void {
    const state = this.getState();
    state.list = null;
    state.actionCompleteData = { ulElement: null, list: null, isUpdated: false };
  }

  private getState(): DropDownListState {
    return this.component as unknown as DropDownListState;
  }

  private onBeforeValueChange = (event: { newProp: { value: DropDownListValue | null } }) => {
    if (!this.getState().list) return;
    const value = event.newProp.value as DropDownListValue;
    const item = this.component.getDataByValue(value);
    if (item) return;
    this.clear();
  }

  private onFiltering(event: FilteringEventArgs) {
    if (event.text) {
      const field = this.component.fields.text || 'text';
      const query = new Query().where(field, 'contains', event.text, true, true);
      event.updateData(this.component.dataSource, query);
    } else {
      event.updateData(this.component.dataSource);
    }
  }

  private onShowPopup(): void {
    if (this.component.itemTemplate && this.getState().list) {
      this.reset();
    }
  }

}
