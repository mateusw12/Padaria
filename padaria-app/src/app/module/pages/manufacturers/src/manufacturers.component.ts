import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SortService } from '@syncfusion/ej2-angular-grids';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { Manufacturer } from 'src/app/module/models';
import { ManufacturerService } from 'src/app/module/services/src';
import { ToastServiceComponent } from 'src/app/module/shared/toast-service/toast-service.component';

const NEW_ID = 'NOVO';

interface GridRow {
  id: number;
  name: string;
}

@Component({
  selector: 'app-manufacturers',
  templateUrl: './manufacturers.component.html',
  styleUrls: ['./manufacturers.component.scss'],
  providers: [
    SortService,
    ManufacturerService,
    DialogComponent,
    ToastServiceComponent,
  ],
})
export class ManufacturersComponent implements OnInit, OnDestroy {
  @ViewChild('modal', { static: true })
  modal!: DialogComponent;

  dataSource: GridRow[] = [];
  form: FormGroup = this.createForm();
  isModalOpen = false;

  private manufacturerService!: ManufacturerService;

  constructor(private toastService: ToastServiceComponent) {}

  ngOnInit(): void {
    this.loadData();
  }

  async onOpen(id?: number): Promise<void> {
    this.reset();
    try {
      if (id) {
        this.findDepartament(id);
      }
      this.isModalOpen = true;
      this.modal.show();
    } catch (error) {}
  }

  async onModalClose(): Promise<void> {
    this.isModalOpen = false;
  }

  async onEdit(model: GridRow): Promise<void> {
    console.log(model);
    await this.onOpen(model.id);
  }

  async onRemove(model: GridRow): Promise<void> {
    if (!model.id) return;
    this.manufacturerService
      .deleteById(model.id)
      .pipe()
      .subscribe(
        async () => {
          await this.toastService.showRemove();
          this.loadData();
        },
        (error) => this.toastService.showRemove(error)
      );
  }

  async onSaveClick(): Promise<void> {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    const model = this.getModel();
    const exists = model.id > 1;
    if (
      exists
        ? this.manufacturerService
            .updateById(model)
            .pipe()
            .subscribe(
              async () => {
                await this.toastService.showUpdate();
                this.reset();
              },
              (error) => this.toastService.showError(error)
            )
        : this.manufacturerService
            .add(model)
            .pipe()
            .subscribe(
              async () => {
                await this.toastService.showSucess();
              },
              (error) => this.toastService.showError(error)
            )
    )
      this.loadData();
    return;
  }

  ngOnDestroy(): void {}

  private loadData(): void {
    this.manufacturerService
      .findAll()
      .pipe()
      .subscribe(async (departaments) => {
        this.dataSource = departaments;
      });
  }

  private async findDepartament(id: number): Promise<void> {
    this.manufacturerService
      .findById(id)
      .pipe()
      .subscribe(
        async (departament) => {
          this.populateForm(departament);
        },
        (error) => this.toastService.showError(error)
      );
  }

  private populateForm(departament: Manufacturer): void {
    this.form.patchValue({
      id: departament.id,
      name: departament.name,
    });
  }

  private getModel(): Manufacturer {
    const model = new Manufacturer();
    const formValue = this.form.getRawValue();
    model.id = formValue.id === NEW_ID ? 0 : (formValue.id as number);
    model.name = formValue.name as string;
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
    }));
  }
}
