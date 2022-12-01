import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Brand, Product, SalesControl, User } from '@module/models';
import { SalesControlRepository, UserRepository } from '@module/repository';
import { FormGridCommandEventArgs } from '@module/shared';
import { SfGridColumnModel, SfGridColumns } from '@module/shared/src/grid';
import { untilDestroyed, untilDestroyedAsync } from '@module/utils/common';
import { ErrorHandler, ToastService } from '@module/utils/services';
import { forkJoin } from 'rxjs';
import { SalesControlService } from '../sales-control.service';

const NEW_ID = 'NOVO';

interface GridRow {
  salesId: number;
  productId: number;
  productName: string;
  brandName: string;
  brandId: number;
  registrationDate: Date;
  totalSalesValue: number;
  amount: number;
}

interface FormModel {
  salesId: FormControl<string | null>;
  productId: FormControl<number | null>;
  brandId: FormControl<number | null>;
  amount: FormControl<number | null>;
  totalSalesValue: FormControl<number | null>;
  registrationDate: FormControl<Date | null>;
  barCode: FormControl<string | null>;
  unitPrice: FormControl<number | null>;
}

@Component({
  selector: 'app-cashier-control',
  templateUrl: './cashier-control.component.html',
})
export class CashierControlComponent implements OnInit, OnDestroy {
  get disabledFinishButton(): boolean {
    return this.dataSource.length <= 0 && this.salesModel.length <= 0;
  }

  dataSource: GridRow[] = [];
  columns: SfGridColumnModel[] = this.createColumns();
  products: Product[] = [];
  brands: Brand[] = [];
  form: FormGroup<FormModel> = this.createForm();

  private salesModel: SalesControl[] = [];
  private user: User = new User();

  constructor(
    private errorHandler: ErrorHandler,
    private toastService: ToastService,
    private salesControlService: SalesControlService,
    private userRepository: UserRepository,
    private salesControlRepository: SalesControlRepository
  ) {}

  ngOnInit(): void {
    this.reset();
    this.loadData();
    this.formEvents();
  }

  onCommand(event: FormGridCommandEventArgs): void {
    switch (event.command) {
      case 'Add':
        this.onCommandAdd();
        break;
      case 'Remove':
        this.onCommandRemove(event.rowData as GridRow);
        break;
      default:
        break;
    }
  }

  async onFinishBuyClick(): Promise<void> {
    this.salesControlRepository
      .add(this.salesModel)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.toastService.showSuccess();
          this.reset();
          this.dataSource = [];
          this.salesModel = [];
        },
        (error) => this.handleError(error)
      );
  }

  ngOnDestroy(): void {}

  private formEvents(): void {
    const controls = this.form.controls;

    controls.barCode.valueChanges.pipe(untilDestroyed(this)).subscribe(
      async (value) => {
        if (!value) {
          this.form.reset(
            {
              salesId: NEW_ID,
              registrationDate: new Date(),
            },
            { emitEvent: false }
          );
          return;
        }
        await this.findProduct(value);
      },
      (error) => this.handleError(error)
    );

    controls.amount.valueChanges.pipe(untilDestroyed(this)).subscribe(
      (value) => {
        controls.amount.setValue(value, { emitEvent: false });
        this.calculateTotalSalesValue();
      },
      (error) => this.handleError(error)
    );

    controls.unitPrice.valueChanges.pipe(untilDestroyed(this)).subscribe(
      (value) => {
        controls.unitPrice.setValue(value, { emitEvent: false });
        this.calculateTotalSalesValue();
      },
      (error) => this.handleError(error)
    );
  }

  private async findProduct(barCode: string): Promise<void> {
    try {
      const product = await untilDestroyedAsync(
        this.salesControlService.findProductByBarCode(barCode),
        this
      );
      this.populateForm(product);
    } catch (error) {
      this.handleError(error);
    }
  }

  private populateForm(product: Product): void {
    this.form.patchValue({
      brandId: product.brandId,
      productId: product.id,
      unitPrice: product.unitaryPrice,
    });
  }

  private onCommandAdd(): void {
    const model = this.getModel();
    this.salesModel.push(model);
    this.dataSource.push({
      amount: model.amount,
      brandId: model.brandId,
      productId: model.productId,
      registrationDate: model.registrationDate,
      salesId: model.id,
      totalSalesValue: model.totalValue,
      brandName: this.findBrandName(model.brandId),
      productName: this.findProductName(model.productId),
    });
  }

  private onCommandRemove(data: GridRow): void {
    const index = this.dataSource.indexOf(data, data.salesId);
    this.dataSource = this.dataSource.splice(index, 1);
    this.salesModel = this.salesModel.splice(index, 1);
  }

  private loadData(): void {
    forkJoin([
      this.salesControlService.loadBrands(),
      this.salesControlService.loadProducts(),
      this.userRepository.findMe(),
    ])
      .pipe(untilDestroyed(this))
      .subscribe(
        ([brands, products, user]) => {
          this.brands = brands;
          this.products = products;
          this.user = user;
        },
        (error) => this.handleError(error)
      );
  }

  private getModel(): SalesControl {
    const model = new SalesControl();
    const formValue = this.form.getRawValue();
    model.amount = formValue.amount as number;
    model.brandId = formValue.brandId as number;
    model.id =
      formValue.salesId === NEW_ID
        ? 0
        : (formValue.salesId as unknown as number);
    model.productId = formValue.productId as number;
    model.registrationDate = formValue.registrationDate as Date;
    model.totalValue = formValue.totalSalesValue as number;
    model.userSales = this.user.userName;
    return model;
  }

  private calculateTotalSalesValue(): void {
    const controls = this.form.controls;
    const amount = controls.amount.value as number;
    const unitPrice = controls.unitPrice.value as number;

    const totalValue = amount * unitPrice;
    controls.totalSalesValue.setValue(totalValue, { emitEvent: false });
  }

  private reset(): void {
    this.form.reset({
      salesId: NEW_ID,
      registrationDate: new Date(),
    });
  }

  private findProductName(productId: number): string {
    const product = this.products.find((el) => el.id === productId);
    return product ? product.name : '';
  }

  private findBrandName(brandId: number): string {
    const brand = this.brands.find((el) => el.id === brandId);
    return brand ? brand.name : '';
  }

  private handleError(error: unknown): void {
    this.errorHandler.present(error);
  }

  private createForm(): FormGroup<FormModel> {
    return new FormGroup<FormModel>({
      brandId: new FormControl<number | null>({
        value: null,
        disabled: true,
      }),
      totalSalesValue: new FormControl<number | null>(
        {
          value: null,
          disabled: true,
        },
        [Validators.required, Validators.min(0)]
      ),
      amount: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(0),
      ]),
      productId: new FormControl<number | null>(
        {
          value: null,
          disabled: true,
        },
        Validators.required
      ),
      salesId: new FormControl<string | null>({
        value: NEW_ID,
        disabled: true,
      }),
      barCode: new FormControl<string | null>(null, Validators.required),
      registrationDate: new FormControl<Date | null>({
        value: null,
        disabled: true,
      }),
      unitPrice: new FormControl<number | null>({
        value: null,
        disabled: true,
      }),
    });
  }

  private createColumns(): SfGridColumnModel[] {
    return SfGridColumns.build<GridRow>({
      salesId: SfGridColumns.numeric('salesId', 'Código')
        .minWidth(75)
        .isPrimaryKey(true),
      productId: SfGridColumns.numeric('productId', 'Cód Produto')
        .minWidth(100)
        .visible(false),
      brandId: SfGridColumns.numeric('brandId', 'Cód Marca')
        .minWidth(100)
        .visible(false),
      registrationDate: SfGridColumns.date(
        'registrationDate',
        'Data Venda'
      ).minWidth(100),
      totalSalesValue: SfGridColumns.text(
        'totalSalesValue',
        'Valor Total Venda'
      ).minWidth(100),
      amount: SfGridColumns.text('amount', 'Quantidade').minWidth(100),
      brandName: SfGridColumns.text('brandName', 'Marca').minWidth(100),
      productName: SfGridColumns.text('productName', 'Produto').minWidth(100),
    });
  }
}
