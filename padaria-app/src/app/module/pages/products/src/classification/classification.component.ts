import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product, Classification } from '@module/models';
import { ClassificationService, ProductService } from '@module/services';
import { ToastServiceComponent } from '@module/shared';
import { untilDestroyed } from '@module/utils';
import { SortService } from '@syncfusion/ej2-angular-grids';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { forkJoin } from 'rxjs';

const NEW_ID = 'NOVO';

interface GridRow {
  id: number;
  name: string;
}

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  providers: [
    SortService,
    ClassificationService,
    ProductService,
    DialogComponent,
    ToastServiceComponent,
  ],
})
export class ClassificationComponent implements OnInit, OnDestroy {
  @ViewChild('modal', { static: true })
  modal!: DialogComponent;

  dataSource: GridRow[] = [];
  form: FormGroup = this.createForm();
  isModalOpen = false;
  products: Product[] = [];

  constructor(
    private toastService: ToastServiceComponent,
    private classificationService: ClassificationService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  async onOpen(id?: number): Promise<void> {
    this.reset();
    try {
      if (id) {
        await this.findClassification(id);
      }
      this.isModalOpen = true;
      this.modal.show();
    } catch (error) {}
  }

  async onModalClose(): Promise<void> {
    this.isModalOpen = false;
  }

  async onEdit(model: GridRow): Promise<void> {
    await this.onOpen(model.id);
  }

  async onRemove(model: GridRow): Promise<void> {
    if (!model.id) return;
    this.classificationService
      .deleteById(model.id)
      .pipe(untilDestroyed(this))
      .subscribe(
        async () => {
          await this.toastService.showRemove();
        },
        (error) => this.toastService.showError(error)
      );
    this.loadData();
  }

  async onSaveClick(): Promise<void> {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      this.toastService.showError('Formulário inválido!');
      return;
    }
    const model = this.getModel();
    const exists = model.id > 1;
    if (
      exists
        ? this.classificationService
            .updateById(model)
            .pipe(untilDestroyed(this))
            .subscribe(
              async () => {
                await this.toastService.showUpdate();
                this.reset();
              },
              (error) => this.toastService.showError(error)
            )
        : this.classificationService
            .add(model)
            .pipe(untilDestroyed(this))
            .subscribe(
              async () => {
                await this.toastService.showSucess();
              },
              (error) => this.toastService.showError(error)
            )
    )
      return;
  }

  ngOnDestroy(): void {}

  private loadData(): void {
    forkJoin([
      this.productService.findAll(),
      this.classificationService.findAll(),
    ])
      .pipe(untilDestroyed(this))
      .subscribe(async ([products, classifications]) => {
        const dataSource: GridRow[] = [];
        this.products = products;

        for (const item of classifications) {
          dataSource.push({
            id: item.id,
            name: item.name,
          });
        }
        this.dataSource = dataSource;
      });
  }

  private async findClassification(id: number): Promise<void> {
    this.classificationService
      .findById(id)
      .pipe(untilDestroyed(this))
      .subscribe(
        async (classification) => {
          this.populateForm(classification);
        },
        (error) => this.toastService.showError(error)
      );
  }

  private populateForm(classification: Classification): void {
    this.form.patchValue({
      id: classification.id,
      name: classification.name,
      productIds: classification.productIds,
    });
  }

  private getModel(): Classification {
    const model = new Classification();
    const formValue = this.form.getRawValue();
    model.id = formValue.id === NEW_ID ? 0 : (formValue.id as number);
    model.name = formValue.name as string;
    model.productIds = formValue.productIds as number[];
    return model;
  }

  private reset(): void {
    this.form.reset({
      id: NEW_ID,
    });
  }

  private createForm(): FormGroup {
    return (this.form = new FormGroup({
      id: new FormControl({ value: NEW_ID, disabled: true }),
      name: new FormControl(null, [
        FormValidators.required,
        Validators.maxLength(200),
      ]),
      productIds: new FormControl(null, FormValidators.required),
    }));
  }
}
