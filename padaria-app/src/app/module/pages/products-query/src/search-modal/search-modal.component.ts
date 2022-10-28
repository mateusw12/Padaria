import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  Brand,
  Classification,
  Manufacturer,
  Product,
  ProductQueryFilter,
  UnitMeasure,
} from '@module/models';
import { ModalComponent } from '@module/shared/src';

interface FormModel {
  brandIds: FormControl<number[] | null>;
  manufacturerIds: FormControl<number[] | null>;
  productIds: FormControl<number[] | null>;
  unitMeasureIds: FormControl<number[] | null>;
  classificationIds: FormControl<number[] | null>;
  productName: FormControl<string | null>;
}

@Component({
  selector: 'app-search-product-modal',
  templateUrl: './search-modal.component.html',
})
export class SearchModalomponent implements OnInit, OnDestroy {
  @Output()
  filter = new EventEmitter<ProductQueryFilter>();

  @Input()
  products: Product[] = [];

  @Input()
  manufacturers: Manufacturer[] = [];

  @Input()
  brands: Brand[] = [];

  @Input()
  unitMeasures: UnitMeasure[] = [];

  @Input()
  classifications: Classification[] = [];

  form = this.createForm();

  @ViewChild(ModalComponent, { static: true })
  private modal!: ModalComponent;

  constructor() {}

  ngOnInit(): void {}

  async onOpen(): Promise<void> {
    this.reset();
    this.modal.open();
  }

  onApplyClick(): void {
    const model = this.getModel();
    this.filter.emit(model);
    this.modal.onCloseClick();
  }

  onModalClose(): void {
    this.modal.onCloseClick();
  }

  reset(): void {
    this.form.reset();
  }

  ngOnDestroy(): void {}

  private getModel(): ProductQueryFilter {
    const model = new ProductQueryFilter();
    const formValue = this.form.getRawValue();
    model.brandIds = formValue.brandIds as number[];
    model.manufacturerIds = formValue.manufacturerIds as number[];
    model.productIds = formValue.productIds as number[];
    model.productName = formValue.productName as string;
    model.unitMeasureIds = formValue.unitMeasureIds as number[];
    model.classificationIds = formValue.classificationIds as number[];
    return model;
  }

  private createForm(): FormGroup<FormModel> {
    return new FormGroup<FormModel>({
      brandIds: new FormControl<number[] | null>([]),
      manufacturerIds: new FormControl<number[] | null>([]),
      productIds: new FormControl<number[] | null>([]),
      unitMeasureIds: new FormControl<number[] | null>([]),
      classificationIds: new FormControl<number[] | null>([]),
      productName: new FormControl<string | null>(null),
    });
  }
}
