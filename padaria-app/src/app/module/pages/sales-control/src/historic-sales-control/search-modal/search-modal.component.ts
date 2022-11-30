import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Brand, Product, SalesControlFiter } from '@module/models';
import { ModalComponent } from '@module/shared';
import { untilDestroyed } from '@module/utils/common';
import { ErrorHandler } from '@module/utils/services';
import { forkJoin } from 'rxjs';
import { SalesControlService } from '../../sales-control.service';

interface FormModel {
  brandIds: FormControl<number[] | null>;
  productIds: FormControl<number[] | null>;
  startSalesDate: FormControl<Date | null>;
  endSalesDate: FormControl<Date | null>;
}

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
})
export class SearchModalComponent implements OnInit, OnDestroy {
  @Output()
  filter = new EventEmitter<SalesControlFiter>();

  products: Product[] = [];
  brands: Brand[] = [];
  form = this.createForm();

  @ViewChild(ModalComponent, { static: true })
  private modal!: ModalComponent;

  constructor(
    private errorHandler: ErrorHandler,
    private salesControlService: SalesControlService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  async onOpen(): Promise<void> {
    this.reset();
    this.modal.open();
  }

  async onSearchClick(): Promise<void> {
    const model = this.getModel();
    this.filter.emit(model);
    this.modal.onCloseClick();
  }

  onModalClose(): void {
    this.modal.onCloseClick();
  }

  ngOnDestroy(): void {}

  private loadData(): void {
    forkJoin([
      this.salesControlService.loadBrands(),
      this.salesControlService.loadProducts(),
    ])
      .pipe(untilDestroyed(this))
      .subscribe(
        ([brands, products]) => {
          this.products = products;
          this.brands = brands;
        },
        (error) => this.handleError(error)
      );
  }

  private reset(): void {
    this.form.reset();
  }

  private getModel(): SalesControlFiter {
    const model = new SalesControlFiter();
    const formValue = this.form.getRawValue();
    model.brandIds = formValue.brandIds as number[];
    model.productIds = formValue.productIds as number[];
    model.startSalesDate = formValue.startSalesDate as Date;
    model.endSalesDate = formValue.endSalesDate as Date;
    return model;
  }

  private handleError(error: unknown): void {
    this.errorHandler.present(error);
  }

  private createForm(): FormGroup<FormModel> {
    return new FormGroup<FormModel>({
      brandIds: new FormControl<number[]>([]),
      productIds: new FormControl<number[]>([]),
      startSalesDate: new FormControl<Date | null>(null),
      endSalesDate: new FormControl<Date | null>(null),
    });
  }
}
