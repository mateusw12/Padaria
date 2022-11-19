import { Component, OnDestroy, OnInit } from '@angular/core';
import { Employee, NoteType, Product, Supplier } from '@module/models';
import { SalesRequestRepository } from '@module/repository';
import { SfGridColumnModel, SfGridColumns } from '@module/shared/src/grid';
import { untilDestroyed } from '@module/utils/common';
import { toDictionary } from '@module/utils/functions';
import { ErrorHandler } from '@module/utils/services';
import { forkJoin } from 'rxjs';
import { InventoryService } from '../inventory.service';

interface GridRow {
  itemId: number;
  productName: string;
  observation: string;
  noteTypeName: string;
  totalValue: number;
  supplierName: string;
  amount: number;
  employeeName: string;
  requestId: string;
}

@Component({
  selector: 'app-sales-request',
  templateUrl: './sales-request.component.html',
})
export class SalesRequestComponent implements OnInit, OnDestroy {
  dataSource: GridRow[] = [];
  columns: SfGridColumnModel[] = this.createColumns();

  constructor(
    private errorHandler: ErrorHandler,
    private salesRequestRepository: SalesRequestRepository,
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  load(): void {
    this.loadData();
  }

  ngOnDestroy(): void {}

  private loadData(): void {
    forkJoin([
      this.salesRequestRepository.findAll(),
      this.inventoryService.loadNoteTypes(),
      this.inventoryService.loadSuppliers(),
      this.inventoryService.loadProducts(),
      this.inventoryService.loadEmployees(),
    ])
      .pipe(untilDestroyed(this))
      .subscribe(
        ([buyRequests, noteTypes, suppliers, products, employees]) => {
          const dataSource: GridRow[] = [];

          const noteTypeDictionary = toDictionary<NoteType>(noteTypes);
          const productDictionary = toDictionary<Product>(products);
          const employeeDictionary = toDictionary<Employee>(employees);
          const supplierDictionary = toDictionary<Supplier>(suppliers);

          for (const item of buyRequests) {
            const noteType = noteTypeDictionary[item.noteTypeId];
            const product = productDictionary[item.productId];
            const employee = employeeDictionary[item.employeeId];
            const supplier = supplierDictionary[item.supplierId];

            dataSource.push({
              amount: item.amount,
              itemId: item.itemId,
              noteTypeName: noteType ? noteType.name : '',
              observation: item.observation,
              productName: product ? product.name : '',
              supplierName: supplier ? supplier.name : '',
              totalValue: item.totalValue,
              employeeName: employee ? employee.name : '',
              requestId: item.requestId,
            });
          }
          this.dataSource = dataSource;
        },
        (error) => this.handleError(error)
      );
  }

  private handleError(error: unknown): void {
    this.errorHandler.present(error);
  }

  private createColumns(): SfGridColumnModel[] {
    return SfGridColumns.build<GridRow>({
      itemId: SfGridColumns.numeric('itemId', 'Cód. Item')
        .minWidth(75)
        .isPrimaryKey(true),
      requestId: SfGridColumns.text('requestId', 'N° Pedido').minWidth(100),
      productName: SfGridColumns.text('productName', 'Produto').minWidth(200),
      employeeName: SfGridColumns.text('employeeName', 'Funcionário').minWidth(
        200
      ),
      supplierName: SfGridColumns.text('supplierName', 'Fornecedor').minWidth(
        200
      ),
      noteTypeName: SfGridColumns.text('noteTypeName', 'Tipo Nota').minWidth(
        200
      ),
      observation: SfGridColumns.text('observation', 'Observação').minWidth(
        200
      ),
      amount: SfGridColumns.numeric('amount', 'Quantidade').minWidth(100),
      totalValue: SfGridColumns.numeric('totalValue', 'Valor Total').minWidth(
        100
      ),
    });
  }
}
