import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  Brand,
  Product,
  SalesControl,
  SalesControlFiter
} from '@module/models';
import { SalesControlRepository } from '@module/repository';
import { FormGridCommandEventArgs } from '@module/shared';
import { SfGridColumnModel, SfGridColumns } from '@module/shared/src/grid';
import { untilDestroyed } from '@module/utils/common';
import { toDictionary } from '@module/utils/functions';
import { ErrorHandler } from '@module/utils/services';
import { forkJoin } from 'rxjs';
import { SalesControlService } from '../sales-control.service';
import { SearchModalComponent } from './search-modal/search-modal.component';

interface GridRow {
  productId: string;
  productName: string;
  brandName: string;
  totalSalesValue: number;
  salesDate: string;
  salesId: string;
}

@Component({
  selector: 'app-historic-sales-query',
  templateUrl: './historic-sales-control.component.html',
})
export class HistoricSalesQueryComponent implements OnInit, OnDestroy {
  dataSource: GridRow[] = [];
  columns: SfGridColumnModel[] = this.createColumns();

  @ViewChild(SearchModalComponent, { static: false })
  private searchModal!: SearchModalComponent;

  constructor(
    private errorHandler: ErrorHandler,
    private salesControlRepository: SalesControlRepository,
    private salesControlService: SalesControlService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  onCommand(event: FormGridCommandEventArgs): void {
    switch (event.command) {
      case 'Search':
        this.onCommandSearch();
        break;
      default:
        break;
    }
  }

  onFilter(filter: SalesControlFiter): void {
    this.loadData(filter);
  }

  ngOnDestroy(): void {}

  private onCommandSearch(): void {
    this.searchModal.onOpen();
  }

  private loadData(filter?: SalesControlFiter): void {
    forkJoin([
      this.salesControlRepository.find(filter),
      this.salesControlService.loadBrands(),
      this.salesControlService.loadProducts(),
    ])
      .pipe(untilDestroyed(this))
      .subscribe(
        async ([sales, brands, products]) => {
          const dataSource: GridRow[] = [];
          const productDictionary = toDictionary<Product>(products);
          const brandDictionary = toDictionary<Brand>(brands);

          for (const item of sales) {
            const product = productDictionary[item.productId];
            const brand = brandDictionary[item.brandId];

            dataSource.push({
              productId: item.productId.toString(),
              productName: product ? product.name : '',
              brandName: brand ? brand.name : '',
              salesDate: item.registrationDate.toString(),
              totalSalesValue: item.totalValue,
              salesId: item.id.toString(),
            });
          }
          await this.createTotalRow(dataSource, sales);
          this.dataSource = dataSource;
        },
        (error) => this.handleError(error)
      );
  }

  private async createTotalRow(
    dataSource: GridRow[],
    sales: SalesControl[]
  ): Promise<void> {
    dataSource.push({
      brandName: '',
      productId: '',
      productName: '',
      salesDate: '',
      totalSalesValue: sales
        .map((statistic) => statistic.totalValue)
        .reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          0
        ),
      salesId: 'TOTAL',
    });
    this.dataSource = dataSource;
  }

  private handleError(error: unknown): void {
    this.errorHandler.present(error);
  }

  private createColumns(): SfGridColumnModel[] {
    return SfGridColumns.build<GridRow>({
      salesId: SfGridColumns.numeric('salesId', 'Código')
        .minWidth(75)
        .isPrimaryKey(true),
      brandName: SfGridColumns.text('brandName', 'Marca').minWidth(100),
      productId: SfGridColumns.numeric('productId', 'Cód Produto').minWidth(
        100
      ),
      productName: SfGridColumns.text('productName', 'Produto').minWidth(100),
      salesDate: SfGridColumns.date('salesDate', 'Data Venda').minWidth(100),
      totalSalesValue: SfGridColumns.text(
        'totalSalesValue',
        'Valor Total Venda'
      ).minWidth(100),
    });
  }
}
