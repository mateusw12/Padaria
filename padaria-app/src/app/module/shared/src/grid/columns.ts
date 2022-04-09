import { InvalidOperationException, Key } from '@module/utils/internal';
import { ColumnModel, ICellFormatter, IEditCell, TextAlign } from '@syncfusion/ej2-angular-grids';
import { DateFormatOptions, NumberFormatOptions } from '@syncfusion/ej2-base';
import {
  SfGridAggregateType,
  SfGridCalculateFn,
  SfGridColumnEditType,
  SfGridColumnModel,
  SfGridColumnType,
  SfGridCustomAggregateFn
} from './interfaces';

type TemplateRef<C> = import('@angular/core').TemplateRef<C>;

export type SfGridColumnMappings<T> = { [field in Key<T>]-?: SfGridColumnConfiguration };

export class SfGridColumnConfiguration {

  protected column: SfGridColumnModel;

  constructor(field: string, headerText: string, type: SfGridColumnType) {
    this.column = { field, headerText, type };
  }

  textAlign(value: TextAlign): this {
    this.column.textAlign = value;
    return this;
  }

  format(value: string | NumberFormatOptions | DateFormatOptions): this {
    this.column.format = value;
    return this;
  }

  width(value: string | number): this {
    this.column.width = value;
    this.column.fixedWidth = true;
    return this;
  }

  minWidth(value: string | number): this {
    this.column.minWidth = value;
    return this;
  }

  maxWidth(value: string | number): this {
    this.column.maxWidth = value;
    return this;
  }

  enableHtmlEncode(): this {
    this.column.disableHtmlEncode = false;
    return this;
  }

  formatter(value: ICellFormatter): this {
    this.column.formatter = value;
    return this;
  }

  template(value: string | TemplateRef<unknown>): this {
    this.column.template = value as string;
    return this;
  }

  headerTemplate(value: string | TemplateRef<unknown>): this {
    this.column.headerTemplate = value as string;
    return this;
  }

  visible(value: boolean): this {
    this.column.visible = value;
    this.column.width = value ? (this.column.width === 0 ? undefined : this.column.width) : 0;
    return this;
  }

  allowEditing(value: boolean): this {
    this.column.allowEditing = value;
    return this;
  }

  allowFiltering(value: boolean): this {
    this.column.allowFiltering = value;
    return this;
  }

  allowReordering(value: boolean): this {
    this.column.allowReordering = value;
    return this;
  }

  allowResizing(value: boolean): this {
    this.column.allowResizing = value;
    return this;
  }

  allowSearching(value: boolean): this {
    this.column.allowSearching = value;
    return this;
  }

  allowSorting(value: boolean): this {
    this.column.allowSorting = value;
    return this;
  }

  isFrozen(value: boolean): this {
    this.column.isFrozen = value;
    return this;
  }

  isPrimaryKey(value: boolean): this {
    this.column.isPrimaryKey = value;
    return this;
  }

  edit(value: IEditCell): this {
    this.column.edit = value;
    return this;
  }

  editType(value: SfGridColumnEditType): this {
    this.column.editType = value;
    return this;
  }

  editTemplate(value: string | TemplateRef<unknown>): this {
    this.column.editTemplate = value as string;
    return this;
  }

  custom(value: ColumnModel): this {
    this.column = { ...this.column, ...value };
    return this;
  }

  calculate(calculateFn: SfGridCalculateFn): this {
    this.column.calculate = calculateFn;
    return this;
  }

  aggregate(type: Exclude<SfGridAggregateType, 'Custom'>): this;
  aggregate(type: 'Custom', customAggregate: SfGridCustomAggregateFn): this;
  aggregate(type: SfGridAggregateType, customAggregate?: SfGridCustomAggregateFn): this {
    this.column.aggregate = { type, customAggregate };
    return this;
  }

  identity(): this {
    if (this.column.type === 'number') {
      delete this.column.format;
    }
    return this.textAlign('Center');
  }

  get(): SfGridColumnModel {
    return this.column;
  }

}

export abstract class SfGridColumns {

  private constructor() { }

  static date(field: string, headerText: string): SfGridColumnConfiguration {
    return new SfGridColumnConfiguration(field, headerText, 'date')
      .format({ type: 'date', format: 'dd/MM/yyyy' })
      .textAlign('Center')
      .minWidth(90);
  }

  static time(field: string, headerText: string): SfGridColumnConfiguration {
    return new SfGridColumnConfiguration(field, headerText, 'datetime')
      .format({ type: 'dateTime', format: 'HH:mm' })
      .textAlign('Center')
      .minWidth(60);
  }

  static dateTime(field: string, headerText: string): SfGridColumnConfiguration {
    return new SfGridColumnConfiguration(field, headerText, 'datetime')
      .format({ type: 'dateTime', format: 'dd/MM/yyyy HH:mm' })
      .textAlign('Center')
      .minWidth(120);
  }

  static text(field: string, headerText: string): SfGridColumnConfiguration {
    return new SfGridColumnConfiguration(field, headerText, 'string');
  }

  static numeric(field: string, headerText: string, digits: number = 2): SfGridColumnConfiguration {
    return new SfGridColumnConfiguration(field, headerText, 'number')
      .format(`N${digits}`)
      .textAlign('Right')
      .minWidth(70);
  }

  static percentage(field: string, headerText: string, digits: number = 2): SfGridColumnConfiguration {
    return new SfGridColumnConfiguration(field, headerText, 'number')
      .format(`P${digits}`)
      .textAlign('Right')
      .minWidth(70);
  }

  static currency(field: string, headerText: string, digits: number = 2): SfGridColumnConfiguration {
    return new SfGridColumnConfiguration(field, headerText, 'number')
      .format(`C${digits}`)
      .textAlign('Right')
      .minWidth(70);
  }

  static boolean(field: string, headerText: string, displayAsCheckBox: boolean = false): SfGridColumnConfiguration {
    return new SfGridColumnConfiguration(field, headerText, 'boolean')
      .textAlign('Center')
      .custom({ displayAsCheckBox });
  }


  static build<T>(mappings: SfGridColumnMappings<T>): SfGridColumnModel[] {
    const columns: SfGridColumnModel[] = [];
    Object.keys(mappings).forEach(field => {
      const column = mappings[field as Key<T>].get();
      if (column.field !== field) {
        throw new InvalidOperationException(`O campo '${column.field}' não corresponde a propriedade '${field}'.`);
      }
      columns.push(column);
    });
    return columns;
  }

}
