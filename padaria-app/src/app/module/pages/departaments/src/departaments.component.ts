import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Departament } from '@module/models';
import { DepartamentService } from '@module/services';
import { FormGridCommandEventArgs } from '@module/shared/src/form-grid/formgrid.component';
import { SfGridColumnModel } from '@module/shared/src/grid';
import { SfGridColumns } from '@module/shared/src/grid/columns';
import { untilDestroyed } from '@module/utils/common';
import { ToastService } from '@module/utils/services';
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
  providers: [SortService, DepartamentService, DialogComponent],
})
export class DepartamentsComponent implements OnInit, OnDestroy {
  @ViewChild('modal', { static: true })
  modal!: DialogComponent;

  columns: SfGridColumnModel[] = this.createColumns();
  dataSource: GridRow[] = [
    {
      id: 1,
      name: 'Ola',
    },
  ];
  form: FormGroup = this.createForm();
  isModalOpen = false;

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
    this.modal.close();
  }

  async onEdit(model: any): Promise<void> {
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
      (exists
        ? this.departametService.updateById(model)
        : this.departametService.add(model)
      )
        .pipe(untilDestroyed(this))
        .subscribe(
          async () => {
            await this.toastService.showSuccess();
          },
          async (error) => {
            this.toastService.showError(error);
          }
        )
    )
      return;
  }

  ngOnDestroy(): void {}

  private onCommandAdd(): void {
    console.log('add');
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
