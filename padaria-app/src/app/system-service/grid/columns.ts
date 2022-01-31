import {
  ColumnModel,
  ICellFormatter,
  IEditCell,
  TextAlign
} from '@syncfusion/ej2-angular-grids';
import { DateFormatOptions, NumberFormatOptions } from '@syncfusion/ej2-base';
import { Enum, Key } from '../internal/interfaces';
import {
  SfGridAggregateType, SfGridCalculateFn, SfGridColumnEditType, SfGridColumnModel,
  SfGridColumnType, SfGridCustomAggregateFn,
  SfGridEnumCalculateFn
} from './interface';

declare type TemplateRef<C> = import('@angular/core').TemplateRef<C>;
export declare type SfGridColumnMappings<T> = {
  [field in Key<T>]-?: SfGridColumnConfiguration;
};
export declare class SfGridColumnConfiguration {
  protected column: SfGridColumnModel;
  constructor(field: string, headerText: string, type: SfGridColumnType);
  textAlign(value: TextAlign): this;
  format(value: string | NumberFormatOptions | DateFormatOptions): this;
  width(value: string | number): this;
  minWidth(value: string | number): this;
  maxWidth(value: string | number): this;
  enableHtmlEncode(): this;
  formatter(value: ICellFormatter): this;
  template(value: string | TemplateRef<unknown>): this;
  headerTemplate(value: string | TemplateRef<unknown>): this;
  visible(value: boolean): this;
  allowEditing(value: boolean): this;
  allowFiltering(value: boolean): this;
  allowReordering(value: boolean): this;
  allowResizing(value: boolean): this;
  allowSearching(value: boolean): this;
  allowSorting(value: boolean): this;
  isFrozen(value: boolean): this;
  isPrimaryKey(value: boolean): this;
  edit(value: IEditCell): this;
  editType(value: SfGridColumnEditType): this;
  editTemplate(value: string | TemplateRef<unknown>): this;
  custom(value: ColumnModel): this;
  calculate(calculateFn: SfGridCalculateFn): this;
  aggregate(type: Exclude<SfGridAggregateType, 'Custom'>): this;
  aggregate(type: 'Custom', customAggregate: SfGridCustomAggregateFn): this;
  identity(): this;
  get(): SfGridColumnModel;
}
export declare abstract class SfGridColumns {
  private constructor();
  static date(field: string, headerText: string): SfGridColumnConfiguration;
  static time(field: string, headerText: string): SfGridColumnConfiguration;
  static dateTime(field: string, headerText: string): SfGridColumnConfiguration;
  static text(field: string, headerText: string): SfGridColumnConfiguration;
  static numeric(
    field: string,
    headerText: string,
    digits?: number
  ): SfGridColumnConfiguration;
  static percentage(
    field: string,
    headerText: string,
    digits?: number
  ): SfGridColumnConfiguration;
  static currency(
    field: string,
    headerText: string,
    digits?: number
  ): SfGridColumnConfiguration;
  static boolean(
    field: string,
    headerText: string,
    displayAsCheckBox?: boolean
  ): SfGridColumnConfiguration;
  static enum(
    field: string,
    headerText: string,
    enumeration: Enum<unknown>,
    calculateFn: SfGridEnumCalculateFn
  ): SfGridColumnConfiguration;
  static build<T>(mappings: SfGridColumnMappings<T>): SfGridColumnModel[];
}
export { };

