import {
  AggregateColumnModel,
  AggregateType,
  ColumnModel,
  TextAlign
} from '@syncfusion/ej2-angular-grids';
import { Nilable } from '../internal/interfaces';
export declare type SfGridColumnType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'date'
  | 'datetime';
export declare type SfGridColumnEditType =
  | 'booleanedit'
  | 'datepickeredit'
  | 'datetimepickeredit'
  | 'defaultedit'
  | 'dropdownedit'
  | 'numericedit'
  | 'templateedit';
export declare type SfGridAggregateType = AggregateType | 'Total';
export declare type SfGridCustomAggregateFn = (
  data: object[],
  column: AggregateColumnModel
) => unknown;
export declare type SfGridCalculateFn = (data: any) => any;
export declare type SfGridEnumCalculateFn = (data: any) => Nilable<number>;
export interface SfGridAggregateModel {
  type: SfGridAggregateType;
  customAggregate?: SfGridCustomAggregateFn;
}
export interface SfGridColumnModel extends ColumnModel {
  aggregate?: SfGridAggregateModel;
  calculate?: SfGridCalculateFn;
  fixedWidth?: boolean;
}
export interface SfGridAggregateColumnModel extends AggregateColumnModel {
  textAlign?: TextAlign;
}
