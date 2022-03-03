import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UnitMeasure } from '@module/models';
import { UnitMeasureService } from '@module/services';
import { ToastService } from '@module/utils/services';
import { untilDestroyed } from '@module/utils/common';
import { SortService } from '@syncfusion/ej2-angular-grids';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

const NEW_ID = 'NOVO';

interface GridRow {
  id: number;
  name: string;
  abbreviation: string;
}

@Component({
  selector: 'app-unit-measure',
  templateUrl: './unit-measure.component.html',
  providers: [SortService, UnitMeasureService, DialogComponent],
})
export class UnitMeasureComponent implements OnInit, OnDestroy {
  @ViewChild('modal', { static: true })
  modal!: DialogComponent;

  dataSource: GridRow[] = [];
  form: FormGroup = this.createForm();
  isModalOpen = false;

  constructor(
    private toastService: ToastService,
    private departametService: UnitMeasureService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  async onOpen(id?: number): Promise<void> {
    this.reset();
    try {
      if (id) {
        this.findUnitMeasure(id);
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
    this.departametService
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
      this.toastService.showWarning('Formulário inválido!');
      return;
    }
    const model = this.getModel();
    const exists = model.id > 1;
    if (
      exists
        ? this.departametService
            .updateById(model)
            .pipe(untilDestroyed(this))
            .subscribe(
              async () => {
                await this.toastService.showUpdate();
                this.reset();
              },
              (error) => this.toastService.showError(error)
            )
        : this.departametService
            .add(model)
            .pipe(untilDestroyed(this))
            .subscribe(
              async () => {
                await this.toastService.showSuccess();
              },
              (error) => this.toastService.showError(error)
            )
    )
      return;
  }

  ngOnDestroy(): void {}

  private loadData(): void {
    this.departametService
      .findAll()
      .pipe(untilDestroyed(this))
      .subscribe(async (unitMeasures) => {
        this.dataSource = unitMeasures;
      });
  }

  private async findUnitMeasure(id: number): Promise<void> {
    this.departametService
      .findById(id)
      .pipe(untilDestroyed(this))
      .subscribe(
        async (unitMeasure) => {
          this.populateForm(unitMeasure);
        },
        (error) => this.toastService.showError(error)
      );
  }

  private populateForm(unitMeasure: UnitMeasure): void {
    this.form.patchValue({
      id: unitMeasure.id,
      name: unitMeasure.name,
      abbreviation: unitMeasure.abbreviation,
    });
  }

  private getModel(): UnitMeasure {
    const model = new UnitMeasure();
    const formValue = this.form.getRawValue();
    model.id = formValue.id === NEW_ID ? 0 : (formValue.id as number);
    model.name = formValue.name as string;
    model.abbreviation = formValue.abbreviation as string;
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
      abbreviation: new FormControl(null, Validators.maxLength(5)),
    }));
  }
}
