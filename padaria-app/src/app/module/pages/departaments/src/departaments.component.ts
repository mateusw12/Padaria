import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Departament } from '@module/models';
import { DepartamentService } from '@module/services';
import { ToastServiceComponent } from '@module/shared';
import { untilDestroyed } from '@module/utils';
import { SortService } from '@syncfusion/ej2-angular-grids';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

const NEW_ID = 'NOVO';

interface GridRow {
  id: number;
  name: string;
}

@Component({
  selector: 'app-departaments',
  templateUrl: './departaments.component.html',
  styleUrls: ['./departaments.component.scss'],
  providers: [
    SortService,
    DepartamentService,
    DialogComponent,
    ToastServiceComponent,
  ],
})
export class DepartamentsComponent implements OnInit, OnDestroy {

  @ViewChild('modal', { static: true })
  modal!: DialogComponent;

  dataSource: GridRow[] = [];
  form: FormGroup = this.createForm();
  isModalOpen = false;

  constructor(
    private toastService: ToastServiceComponent,
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
          await this.toastService.showRemove('Removido');
        },
        (error) => this.toastService.showError(error)
      );
    this.loadData();
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
                await this.toastService.showSucess();
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
      .subscribe(
        async (departaments) => {
          this.dataSource = departaments;
        },
        (error) => this.toastService.showError()
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
      id: departament.id,
      name: departament.name,
    });
  }

  private getModel(): Departament {
    const model = new Departament();
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
