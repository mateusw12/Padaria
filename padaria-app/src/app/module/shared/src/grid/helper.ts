import { ObjectValue, InvalidOperationException } from '@module/utils/internal';
import { AggregateColumnModel, AggregateRowModel, CustomSummaryType } from '@syncfusion/ej2-angular-grids';

import {
  SfGridAggregateColumnModel,
  SfGridAggregateModel,
  SfGridCalculateFn,
  SfGridColumnModel,
  SfGridCustomAggregateFn
} from './interfaces';

export abstract class SfGridHelper {

  private constructor() { }

  static getAutoFitColumns(columns: SfGridColumnModel[]): string[] {
    const autoFitColumns = columns
      .filter(column => column.field !== undefined
        && column.visible !== false
        && column.fixedWidth !== true)
      .map(column => column.field as string);
    return autoFitColumns;
  }

  static generateCalculatedColumns(dataSource: object[], columns: SfGridColumnModel[]): void {
    if (dataSource.length === 0) return;
    const calculatedColumns = columns.filter(column => column.calculate !== undefined);
    if (calculatedColumns.length === 0) return;
    const dataSourceLength = dataSource.length;
    const calculatedColumnsLength = calculatedColumns.length;

    for (let dataIndex = 0; dataIndex < dataSourceLength; dataIndex++) {
      const data = dataSource[dataIndex] as ObjectValue<unknown>;

      for (let columnIndex = 0; columnIndex < calculatedColumnsLength; columnIndex++) {
        const column = calculatedColumns[columnIndex];
        const calculateFn = column.calculate as SfGridCalculateFn;
        data[column.field as string] = calculateFn(data);
      }
    }
  }

  static createAggregateRows(columns: SfGridColumnModel[]): AggregateRowModel[] {
    const aggregateColumns: SfGridAggregateColumnModel[] = [];
    for (const column of columns) {
      if (!column.aggregate) continue;
      aggregateColumns.push(SfGridHelper.createAggregateColumn(column, column.aggregate));
    }
    return aggregateColumns.length > 0
      ? [{ columns: aggregateColumns }]
      : [];
  }

  private static createAggregateColumn(column: SfGridColumnModel, aggregate: SfGridAggregateModel): SfGridAggregateColumnModel {
    const aggregateColumn: SfGridAggregateColumnModel = {
      field: column.field,
      type: aggregate.type === 'Total' ? 'Count' : aggregate.type,
      format: aggregate.type === 'Total' ? undefined : column.format,
      textAlign: aggregate.type === 'Total' ? 'Left' : column.textAlign,
      footerTemplate: aggregate.type === 'Total' ? 'TOTAL (${Count})' : '${' + aggregate.type + '}'
    };
    if (aggregate.type === 'Custom') {
      if (!aggregate.customAggregate) throw new InvalidOperationException('A função de agregação não foi definida.');
      aggregateColumn.customAggregate = SfGridHelper.createCustomSummary(aggregate.customAggregate);
    }
    return aggregateColumn;
  }

  private static createCustomSummary(customAggregate: SfGridCustomAggregateFn): CustomSummaryType {
    const customSummaryFn = (data: object | object[], column: AggregateColumnModel): object => {
      const summaryData = data as { aggregates?: { results: object[] }, result: object[] };
      const dataSource = summaryData.aggregates ? summaryData.aggregates.results : summaryData.result;
      return customAggregate(dataSource, column) as object;
    };
    return customSummaryFn;
  }

}
