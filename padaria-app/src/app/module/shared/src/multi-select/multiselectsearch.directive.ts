import {
  Directive,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { untilDestroyed } from '@module/utils/common';
import { Delegate } from '@module/utils/internal';
import {
  FilteringEventArgs,
  MultiSelectComponent,
} from '@syncfusion/ej2-angular-dropdowns';
import { DataManager, Predicate, Query } from '@syncfusion/ej2-data';
import { Popup } from '@syncfusion/ej2-popups';
import {
  EmptyError,
  from,
  Observable,
  ObservableInput,
  of,
  throwError,
} from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  takeUntil,
  tap,
  throwIfEmpty,
} from 'rxjs/operators';

type MultiSelectSearchType = 'Search' | 'Find';

type MultiSelectValue = string | number | boolean;

type MultiSelectItem = { [key in PropertyKey]: any };

interface MultiSelectState {
  value: MultiSelectValue | null;
  isDataFetched: boolean;
  list: HTMLElement | null;
  listData: MultiSelectItem[];
  selectData: MultiSelectItem[];
  sortedData: MultiSelectItem[];
  ulElement: HTMLUListElement | null;
  liCollections: HTMLLIElement[];
  selectedLI: HTMLLIElement | null;
  mainList: HTMLElement | null;
  mainData: MultiSelectItem[];
  popupObj: Popup | null;
  initializeData(): void;
}

interface MultiSelectSearchResult {
  result: MultiSelectItem[];
}

class MultiSelectSearchDataManager extends DataManager {
  constructor(private service: MultiSelectSearchDirective) {
    super();
  }

  executeQuery(
    query: Query,
    done?: Delegate,
    fail?: Delegate,
    always?: Delegate
  ): Promise<any> {
    const filter = this.getFilter(query);
    const type = filter && filter.operator === 'equal' ? 'Find' : 'Search';
    const value = filter ? (filter.value as MultiSelectValue) : '';
    const promise = this.search(type, value);
    if (done || fail) promise.then(done, fail);
    if (always) promise.then(always, always);
    return promise;
  }

  clear(): void {
    this.dataSource.json = [];
  }

  private search(
    type: MultiSelectSearchType,
    value: MultiSelectValue
  ): Promise<MultiSelectSearchResult> {
    const event: MultiSelectSearchEventArgs = { type, value };
    this.service.search.next(event);
    if (!event.response) event.response = of([]);
    return event.response
      .pipe(
        takeUntil(this.service.search),
        tap((data) => (this.dataSource.json = data)),
        map((result) => ({ result })),
        throwIfEmpty(),
        catchError((error) =>
          error instanceof EmptyError
            ? of({ result: this.dataSource.json as MultiSelectItem[] })
            : throwError(error)
        ),
        untilDestroyed(this.service)
      )
      .toPromise();
  }

  private getFilter(query: Query): Predicate | null {
    if (query.queries.length === 0) return null;
    return query.queries[0].e as Predicate;
  }
}

export interface MultiSelectSearchEventArgs {
  type: MultiSelectSearchType;
  value: MultiSelectValue;
  response?: Observable<MultiSelectItem[]>;
}

@Directive({
  selector: '[mnuMultiSelectSearch]',
})
export class MultiSelectSearchDirective implements OnInit, OnDestroy {
  private dataSource = new MultiSelectSearchDataManager(this);

  @Output()
  search = new EventEmitter<MultiSelectSearchEventArgs>();

  constructor(private component: MultiSelectComponent) {
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

  ngOnDestroy(): void {}

  clear(): void {
    this.dataSource.clear();
    const state = this.getState();
    state.initializeData();
    state.isDataFetched = false;
    state.listData = [];
    if (state.list) {
      state.list.remove();
      state.list = null;
    }
    state.mainData = [];
    if (state.mainList) {
      state.mainList.remove();
      state.mainList = null;
    }
    if (state.popupObj) {
      state.popupObj.destroy();
      state.popupObj = null;
    }
    state.selectData = [];
    state.sortedData = [];
    state.ulElement = null;
    state.liCollections = [];
    state.selectedLI = null;
    this.reset();
  }

  private reset(): void {
    const state = this.getState();
    if (state.list) {
      state.list.remove();
      state.list = null;
    }
  }

  private getState(): MultiSelectState {
    return this.component as unknown as MultiSelectState;
  }

  private onBeforeValueChange = (event: {
    newProp: { value: MultiSelectValue | null };
  }) => {
    if (!this.getState().list) return;
    const value = event.newProp.value as MultiSelectValue;
    const item = this.component.getDataByValue(value);
    if (item) return;
    this.clear();
  };

  private onFiltering(event: FilteringEventArgs) {
    if (event.text) {
      const field = this.component.fields.text || 'text';
      const query = new Query().where(
        field,
        'contains',
        event.text,
        true,
        true
      );
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
