import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Departament } from '@module/models';
import { DepartamentService } from '@module/services';
import { FormGridCommandEventArgs, ModalComponent } from '@module/shared/src';
import { SfGridColumnModel, SfGridColumns } from '@module/shared/src/grid';
import { untilDestroyed } from '@module/utils/common';
import { markAllAsTouched } from '@module/utils/forms';
import { ToastService } from '@module/utils/services';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';

const NEW_ID = 'NOVO';

interface GridRow {
  id: number;
  name: string;
}

@Component({
  selector: 'app-departaments',
  templateUrl: './departaments.component.html',
})
export class DepartamentsComponent implements OnInit, OnDestroy {
  @ViewChild(ModalComponent, { static: true })
  modal!: ModalComponent;

  columns: SfGridColumnModel[] = this.createColumns();
  dataSource: GridRow[] = [];
  form: FormGroup = this.createForm();

  constructor(
    private toastService: ToastService,
    private departametService: DepartamentService
  ) {}

  ngOnInit(): void {
    this.loadData();
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
    if (
      (exists
        ? this.departametService.updateById(model)
        : this.departametService.add(model)
      )
        .pipe(untilDestroyed(this))
        .subscribe(
          async () => {
            await this.toastService.showSuccess();
            this.loadData();
          },
          async (error) => {
            this.toastService.showError(error);
          }
        )
    )
      return;
  }

  ngOnDestroy(): void {}

  private async onOpen(id?: number): Promise<void> {
    this.reset();
    try {
      if (id) {
        this.findDepartament(id);
      }
      this.modal.open();
    } catch (error) {}
  }

  private onCommandAdd(): void {
    this.onOpen();
  }

  private onCommandEdit(model: GridRow): void {
    this.onOpen(model.id);
  }

  private async onCommandRemove(model: GridRow): Promise<void> {
    this.departametService
      .deleteById(model.id)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.toastService.showSuccess('Excluído com sucesso!');
          this.loadData();
        },
        (error) => this.toastService.showError()
      );
  }

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

  private createForm(): FormGroup {
    return (this.form = new FormGroup({
      id: new FormControl({ value: NEW_ID, disabled: true }),
      name: new FormControl(null, [
        FormValidators.required,
        Validators.maxLength(200),
      ]),
    }));
  }

  private createColumns() {
    return SfGridColumns.build<GridRow>({
      id: SfGridColumns.text('id', 'Código').minWidth(100).isPrimaryKey(true),
      name: SfGridColumns.text('name', 'Nome').minWidth(200),
    });
  }
}
