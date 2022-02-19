import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GridComponent, SortService } from '@syncfusion/ej2-angular-grids';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { Departament } from 'src/app/module/models';
import { DepartamentService } from 'src/app/module/services/src';
import { ToastServiceComponent } from 'src/app/module/shared/toast-service/toast-service.component';

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
  @ViewChild(GridComponent, { static: false })
  private gridComponent!: GridComponent;
  @ViewChild('modal', { static: true })
  modal!: DialogComponent;

  dataSource: GridRow[] = [];
  form: FormGroup = this.createForm();
  isModalOpen = false;

  private departametService!: DepartamentService;

  constructor(private toastService: ToastServiceComponent) {}

  ngOnInit(): void {
    // this.loadData();
      this.dataSource = [
        { id: 1, name: 'mateus' },
        { id: 1, name: 'asd' },
        { id: 1, name: 'fasfas' },
        { id: 1, name: 'matfdsfeus' },
        { id: 1, name: 'matesdffdus' },
      ];

  }

  get name_check(){ return this.form.get('name')}

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
    this.departametService
      .deleteById(model.id)
      .pipe()
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
            .pipe()
            .subscribe(
              async () => {
                await this.toastService.showUpdate();
                this.reset();
              },
              (error) => this.toastService.showError(error)
            )
        : this.departametService
            .add(model)
            .pipe()
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
      .pipe()
      .subscribe(async (departaments) => {
      });
  }

  private async findDepartament(id: number): Promise<void> {
    this.departametService
      .findById(id)
      .pipe()
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
      'id': new FormControl({ value: NEW_ID, disabled: true }),
      'name': new FormControl(null, [
        FormValidators.required,
        Validators.maxLength(200),
      ]),
    }));
  }
}
