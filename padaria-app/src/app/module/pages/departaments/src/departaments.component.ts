import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { Departament } from '@module/models';
import { DepartamentService } from '@module/services';
import { ToastService } from '@module/shared';
import {
  createFormControl,
  createFormGroup,
  FormControl,
  FormGroup,
  untilDestroyed,
} from '@module/utils';
import { SortService } from '@syncfusion/ej2-angular-grids';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

const NEW_ID = 'NOVO';

interface FormModel {
  id: FormControl<string>;
  name: FormControl<string>;
}

interface GridRow {
  id: number;
  name: string;
}

@Component({
  selector: 'app-departaments',
  templateUrl: './departaments.component.html',
  styleUrls: ['./departaments.component.scss'],
  providers: [SortService, DepartamentService, DialogComponent],
})
export class DepartamentsComponent implements OnInit, OnDestroy {
  @ViewChild('modal', { static: true })
  modal!: DialogComponent;

  dataSource: GridRow[] = [];
  form: FormGroup<FormModel> = this.createForm();
  isModalOpen = false;

  constructor(
    private toastService: ToastService,
    private departametService: DepartamentService
  ) {}

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
              (error) => {
                this.toastService.showError(error);
              }
            )
    )
      return;
  }

  ngOnDestroy(): void {}

  private loadData(): void {
    this.departametService
      .findAll()
      .pipe(untilDestroyed(this))
      .subscribe(
        async (departaments) => {
          this.dataSource = departaments;
        },
        (error) => this.toastService.showError(error)
      );
  }

  private async findDepartament(id: number): Promise<void> {
    this.departametService
      .findById(id)
      .pipe(untilDestroyed(this))
      .subscribe(
        async (departament) => {
          this.populateForm(departament);
        },
        (error) => this.toastService.showError(error)
      );
  }

  private populateForm(departament: Departament): void {
    this.form.patchValue({
      id: departament.id.toString(),
      name: departament.name,
    });
  }

  private getModel(): Departament {
    const model = new Departament();
    const formValue = this.form.getRawValue();
    model.id = formValue.id === NEW_ID ? 0 : Number(formValue.id);
    model.name = formValue.name as string;
    return model;
  }

  private reset(): void {
    this.form.reset({
      id: NEW_ID,
    });
  }

  private createForm(): FormGroup<FormModel> {
    return createFormGroup<FormModel>({
      id: createFormControl<string>({ value: NEW_ID, disabled: true }, [
        Validators.required,
      ]),
      name: createFormControl<string>(null, [
        Validators.required,
        Validators.maxLength(100),
      ]),
    });
  }
}
