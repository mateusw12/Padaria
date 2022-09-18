import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  Brand,
  Classification,
  Manufacturer,
  Product,
  ProductQueryFilter,
  UnitMeasure
} from '@module/models';
import { ModalComponent } from '@module/shared/src';

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

  form: FormGroup = this.createForm();

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

  private createForm(): FormGroup {
    return (this.form = new FormGroup({
      brandIds: new FormControl([]),
      manufacturerIds: new FormControl([]),
      productIds: new FormControl([]),
      unitMeasureIds: new FormControl([]),
      classificationIds: new FormControl([]),
      productName: new FormControl(null),
    }));
  }
}
