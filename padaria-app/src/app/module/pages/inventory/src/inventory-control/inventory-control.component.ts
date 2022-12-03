import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  BuyRequest,
  InventoryStatus,
  Product,
  SalesRequest,
} from '@module/models';
import {
  BuyRequestRepository,
  InventoryRepository,
  SalesRequestRepository,
} from '@module/repository';
import { FormGridCommandEventArgs } from '@module/shared';
import { SfGridColumnModel, SfGridColumns } from '@module/shared/src/grid';
import { untilDestroyed, untilDestroyedAsync } from '@module/utils/common';
import { getDescription } from '@module/utils/functions/enum';
import {
  ErrorHandler,
  MessageService,
  ToastService,
} from '@module/utils/services';
import { forkJoin } from 'rxjs';
import { InventoryService } from '../inventory.service';
import { BuyRequestRegistrationModalComponent } from './buy-request-registration-modal/request-buy-registration-modal.component';
import { SalesRequestRegistrationModalComponent } from './sales-request-registration-modal/sales-request-registration-modal.component';

interface GridRow {
  productName: string;
  itemId: number;
  minimumStock: number;
  retirementStock: number;
  initialStock: number;
  currentStock: number;
  purchaseValue: number;
  salesValue: number;
  profitPercentage: number;
  inventoryStatus: string;
}

@Component({
  selector: 'app-inventory-control',
  templateUrl: './inventory-control.component.html',
})
export class InventoryControlComponent implements OnInit, OnDestroy {
  dataSource: GridRow[] = [];
  columns: SfGridColumnModel[] = this.createColumns();

  @ViewChild(BuyRequestRegistrationModalComponent, { static: false })
  private buyRequestModal!: BuyRequestRegistrationModalComponent;

  @ViewChild(SalesRequestRegistrationModalComponent, { static: false })
  private salesRequestModal!: SalesRequestRegistrationModalComponent;

  constructor(
    private errorHandler: ErrorHandler,
    private inventoryRepository: InventoryRepository,
    private salesRequestRepository: SalesRequestRepository,
    private buyRequestRepository: BuyRequestRepository,
    private inventoryService: InventoryService,
    private messageService: MessageService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  async onAddBuyRequest(): Promise<void> {
    this.buyRequestModal.onOpen();
  }

  async onAddSalesRequest(): Promise<void> {
    this.salesRequestModal.onOpen();
  }

  onCommand(event: FormGridCommandEventArgs): void {
    switch (event.command) {
      case 'Remove':
        this.onCommandRemove(event.rowData as GridRow);
        break;
      default:
        break;
    }
  }

  onSaved(): void {
    this.loadData();
  }

  load():void{
    this.columns = this.createColumns();
    this.loadData();
  }

  ngOnDestroy(): void {}

  private async onCommandRemove(model: GridRow): Promise<void> {
    this.inventoryRepository
      .deleteById(model.itemId)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.toastService.showRemove();
          this.loadData();
        },
        (error) => this.handleError(error)
      );
  }

  private loadData(): void {
    forkJoin([
      this.inventoryService.loadProducts(),
      this.buyRequestRepository.findAll(),
      this.salesRequestRepository.findAll(),
      this.inventoryRepository.findAll(),
    ])
      .pipe(untilDestroyed(this))
      .subscribe(
        ([
          products,
          buyRequests,
          salesRequests,
          inventories,
        ]) => {
          const dataSource: GridRow[] = [];

          for (const item of inventories) {
            const buyRequest = buyRequests.find(
              (el) => el.productId === item.productId
            );
            const salesRequest = salesRequests.find(
              (el) => el.productId === item.productId
            );
            const product = products.find((el) => el.id === item.productId);

            dataSource.push({
              itemId: item.itemId,
              profitPercentage: this.getProfitPercentage(
                buyRequest,
                salesRequest
              ),
              minimumStock: product ? product.amount : 0,
              initialStock: product ? product.amount : 0,
              retirementStock: salesRequest ? salesRequest.amount : 0,
              currentStock: this.getCurrentStock(
                buyRequest,
                salesRequest,
                product
              ),
              inventoryStatus: this.getInventoryStatus(
                buyRequest,
                salesRequest,
                product
              ),
              productName: product ? product.name : '',
              purchaseValue: buyRequest ? buyRequest.totalValue : 0,
              salesValue: salesRequest ? salesRequest.totalValue : 0,
            });
          }
        },
        (error) => this.handleError(error)
      );
  }

  private getInventoryStatus(
    buyRequest: BuyRequest | undefined,
    salesRequest: SalesRequest | undefined,
    product: Product | undefined
  ): string {
    const currentStock = this.getCurrentStock(
      buyRequest,
      salesRequest,
      product
    );
    const minimumStock = product ? product.amount : 0;
    const stockPercentage =
      ((currentStock - minimumStock) / currentStock) * 100;

    if (stockPercentage <= 0)
      return getDescription(InventoryStatus, InventoryStatus.Out);
    if (stockPercentage <= 50)
      return getDescription(InventoryStatus, InventoryStatus.Low);
    return getDescription(InventoryStatus, InventoryStatus.Normal);
  }

  private getCurrentStock(
    buyRequest: BuyRequest | undefined,
    salesRequest: SalesRequest | undefined,
    product: Product | undefined
  ): number {
    const buyStock = buyRequest ? buyRequest.amount : 0;
    const salesStock = salesRequest ? salesRequest.amount : 0;
    const minimumStock = product ? product.amount : 0;
    if (minimumStock <= 0) return 0;
    return buyStock - salesStock;
  }

  private getProfitPercentage(
    buyRequest: BuyRequest | undefined,
    salesRequest: SalesRequest | undefined
  ): number {
    const purchaseValue = buyRequest ? buyRequest.totalValue : 0;
    const salesValue = salesRequest ? salesRequest.totalValue : 0;
    return ((salesValue - purchaseValue) / salesValue) * 100;
  }

  private handleError(error: unknown): void {
    this.errorHandler.present(error);
  }

  private createColumns(): SfGridColumnModel[] {
    return SfGridColumns.build<GridRow>({
      itemId: SfGridColumns.numeric('itemId', 'Cód. Item')
        .minWidth(75)
        .isPrimaryKey(true),
      productName: SfGridColumns.text('productName', 'Produto').minWidth(200),
      inventoryStatus: SfGridColumns.text('inventoryStatus', 'Status').minWidth(
        100
      ),
      minimumStock: SfGridColumns.numeric(
        'minimumStock',
        'Estoque Mínimo'
      ).minWidth(75),
      initialStock: SfGridColumns.numeric('initialStock', 'Entradas').minWidth(
        75
      ),
      retirementStock: SfGridColumns.numeric(
        'retirementStock',
        'Saídas'
      ).minWidth(75),
      currentStock: SfGridColumns.numeric(
        'currentStock',
        'Estoque Atual'
      ).minWidth(75),
      purchaseValue: SfGridColumns.numeric(
        'purchaseValue',
        'Valor Compra'
      ).minWidth(100),
      salesValue: SfGridColumns.numeric('salesValue', 'Valor Venda').minWidth(
        100
      ),
      profitPercentage: SfGridColumns.numeric(
        'profitPercentage',
        'Percentual Lucro'
      ).minWidth(100),
    });
  }
}
