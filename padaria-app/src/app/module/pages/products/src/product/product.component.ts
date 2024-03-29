import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Brand, Manufacturer, Product, UnitMeasure } from '@module/models';
import {
  BrandRepository,
  ManufacturerRepository,
  ProductRepository,
  UnitMeasureRepository,
} from '@module/repository';
import { ModalComponent, FormGridCommandEventArgs } from '@module/shared';
import { SfGridColumnModel, SfGridColumns } from '@module/shared/src/grid';
import { untilDestroyed, untilDestroyedAsync } from '@module/utils/common';
import { markAllAsTouched } from '@module/utils/forms';
import { toDictionary } from '@module/utils/functions';
import {
  ErrorHandler,
  MessageService,
  ToastService,
} from '@module/utils/services';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { forkJoin } from 'rxjs';

const NEW_ID = 'NOVO';

interface GridRow {
  id: number;
  name: string;
  manufacturerName: string;
  brandName: string;
  unitMeasureName: string;
  unitaryPrice: number;
  amount: number;
}

interface FormModel {
  id: FormControl<string | null>;
  name: FormControl<string | null>;
  description: FormControl<string | null>;
  groupedCodes: FormControl<string | null>;
  manufacturerId: FormControl<number | null>;
  brandId: FormControl<number | null>;
  unitMeasureId: FormControl<number | null>;
  unitaryPrice: FormControl<number | null>;
  amount: FormControl<number | null>;
  barCode: FormControl<string | null>;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit, OnDestroy {
  @ViewChild(ModalComponent, { static: true })
  modal!: ModalComponent;

  dataSource: GridRow[] = [];
  form = this.createForm();
  products: Product[] = [];
  unitMeasures: UnitMeasure[] = [];
  brands: Brand[] = [];
  manufacturers: Manufacturer[] = [];
  columns: SfGridColumnModel[] = this.createColumns();

  constructor(
    private toastService: ToastService,
    private unitMeasureRepository: UnitMeasureRepository,
    private brandRepository: BrandRepository,
    private manufacturerRepository: ManufacturerRepository,
    private productRepository: ProductRepository,
    private messageService: MessageService,
    private errorHandler: ErrorHandler
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  async onOpen(id?: number): Promise<void> {
    this.reset();
    this.getBarCode();
    try {
      if (id) {
        await this.findProduct(id);
      }
      this.modal.open();
    } catch (error) {
      this.handleError(error);
    }
  }

  async onModalClose(): Promise<void> {
    this.modal.onCloseClick();
  }

  async onSaveClick(): Promise<void> {
    if (!this.form.valid) {
      markAllAsTouched(this.form);
      return;
    }
    const model = this.getModel();
    const exists = model.id > 1;

    if (exists) {
      const confirmed = await this.messageService.showConfirmSave();
      if (!confirmed) return;
    }

    (exists
      ? this.productRepository.updateById(model)
      : this.productRepository.add(model)
    )
      .pipe(untilDestroyed(this))
      .subscribe(
        async () => {
          this.toastService.showSuccess();
          this.loadData();
          this.reset();
          if (exists) this.modal.onCloseClick();
        },
        async (error) => this.handleError(error)
      );
  }

  onCommand(event: FormGridCommandEventArgs): void {
    switch (event.command) {
      case 'Add':
        this.onCommandAdd();
        break;
      case 'Edit':
        this.onCommandEdit(event.rowData as GridRow);
        break;
      case 'Remove':
        this.onCommandRemove(event.rowData as GridRow);
        break;
      default:
        break;
    }
  }

  ngOnDestroy(): void {}

  private onCommandAdd(): void {
    this.onOpen();
  }

  private onCommandEdit(model: GridRow): void {
    this.onOpen(model.id);
  }

  private async onCommandRemove(model: GridRow): Promise<void> {
    const confirmed = await this.messageService.showConfirmDelete();
    if (!confirmed) return;
    this.productRepository
      .deleteById(model.id)
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
      this.productRepository.findAll(),
      this.brandRepository.findAll(),
      this.manufacturerRepository.findAll(),
      this.unitMeasureRepository.findAll(),
    ])
      .pipe(untilDestroyed(this))
      .subscribe(
        async ([products, brands, manufacturers, unitMeasures]) => {
          this.unitMeasures = unitMeasures;
          this.manufacturers = manufacturers;
          this.brands = brands;

          const dataSource: GridRow[] = [];
          const brandDictionary = toDictionary<Brand>(brands);
          const manufacturerDictionary =
            toDictionary<Manufacturer>(manufacturers);
          const unitMeasureDictionary = toDictionary<UnitMeasure>(unitMeasures);

          for (const item of products) {
            const brand = brandDictionary[item.brandId];
            const unitMeasure = unitMeasureDictionary[item.unitMeasureId];
            const manufacturer = manufacturerDictionary[item.manufacturerId];

            dataSource.push({
              id: item.id,
              name: item.name,
              amount: item.amount,
              brandName: brand ? brand.displayName : '',
              manufacturerName: manufacturer ? manufacturer.displayName : '',
              unitaryPrice: item.unitaryPrice,
              unitMeasureName: unitMeasure ? unitMeasure.displayName : '',
            });
          }
          this.dataSource = dataSource;
        },
        (error) => this.handleError(error)
      );
  }

  private async findProduct(id: number): Promise<void> {
    this.productRepository
      .findById(id)
      .pipe(untilDestroyed(this))
      .subscribe(async (product) => {
        this.populateForm(product);
      });
  }

  private populateForm(product: Product): void {
    this.form.patchValue({
      id: product.id.toString(),
      name: product.name,
      brandId: product.brandId,
      manufacturerId: product.manufacturerId,
      unitMeasureId: product.unitMeasureId,
      description: product.description,
      groupedCodes: product.groupedCodes,
      unitaryPrice: product.unitaryPrice,
      amount: product.amount,
    });
  }

  private getModel(): Product {
    const model = new Product();
    const formValue = this.form.getRawValue();
    model.id =
      formValue.id === NEW_ID ? 0 : (formValue.id as unknown as number);
    model.name = formValue.name as string;
    model.amount = formValue.amount as number;
    model.brandId = formValue.brandId as number;
    model.manufacturerId = formValue.manufacturerId as number;
    model.unitMeasureId = formValue.unitMeasureId as number;
    model.unitaryPrice = formValue.unitaryPrice as number;
    model.groupedCodes = formValue.groupedCodes as string;
    model.description = formValue.description as string;
    model.barCode = formValue.barCode as string;
    return model;
  }

  private reset(): void {
    this.form.reset({
      id: NEW_ID,
    });
  }

  private getBarCode(): void {
    const min = Math.ceil(0);
    const max = Math.floor(9);
    let random: string = '';
    for (let index = 0; index < 13; index++) {
      random =
        random + String(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    this.form.controls.barCode.setValue(random);
  }

  private handleError(error: unknown): void {
    this.errorHandler.present(error);
  }

  private createForm(): FormGroup<FormModel> {
    return new FormGroup<FormModel>({
      id: new FormControl<string | null>({ value: NEW_ID, disabled: true }),
      name: new FormControl<string | null>(null, [
        FormValidators.required,
        Validators.maxLength(200),
      ]),
      description: new FormControl<string | null>(null, [
        Validators.maxLength(200),
      ]),
      barCode: new FormControl<string | null>(null, [
        Validators.maxLength(200),
      ]),
      unitMeasureId: new FormControl<number | null>(null, [
        FormValidators.required,
      ]),
      brandId: new FormControl<number | null>(null, [FormValidators.required]),
      manufacturerId: new FormControl<number | null>(null, [
        FormValidators.required,
      ]),
      unitaryPrice: new FormControl<number | null>(null, [
        FormValidators.required,
      ]),
      groupedCodes: new FormControl<string | null>(null, [
        Validators.maxLength(200),
      ]),
      amount: new FormControl<number | null>(null, [
        Validators.min(0),
        FormValidators.required,
      ]),
    });
  }

  private createColumns(): SfGridColumnModel[] {
    return SfGridColumns.build<GridRow>({
      id: SfGridColumns.numeric('id', 'Código')
        .minWidth(100)
        .isPrimaryKey(true)
        .identity(),
      name: SfGridColumns.text('name', 'Nome').minWidth(200),
      manufacturerName: SfGridColumns.text(
        'manufacturerName',
        'Fabricante'
      ).minWidth(100),
      brandName: SfGridColumns.text('brandName', 'Marca').minWidth(100),
      unitMeasureName: SfGridColumns.text(
        'unitMeasureName',
        'Unidade Medida'
      ).minWidth(100),
      unitaryPrice: SfGridColumns.text(
        'unitaryPrice',
        'Preço Unitário'
      ).minWidth(100),
      amount: SfGridColumns.text('amount', 'Qtd').minWidth(100),
    });
  }
}
