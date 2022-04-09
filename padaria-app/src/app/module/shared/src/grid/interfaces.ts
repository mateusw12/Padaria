import { AggregateColumnModel, AggregateType, ColumnModel, TextAlign } from '@syncfusion/ej2-angular-grids';

export type SfGridColumnType = 'string' | 'number' | 'boolean' | 'date' | 'datetime';

export type SfGridColumnEditType = 'booleanedit' | 'datepickeredit' | 'datetimepickeredit' |
  'defaultedit' | 'dropdownedit' | 'numericedit' | 'templateedit';

export type SfGridAggregateType = AggregateType | 'Total';

export type SfGridCustomAggregateFn = (data: object[], column: AggregateColumnModel) => unknown;

// tslint:disable-next-line: no-any
export type SfGridCalculateFn = (data: any) => any;

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
