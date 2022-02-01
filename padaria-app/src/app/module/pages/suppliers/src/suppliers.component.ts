import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { SortService } from '@syncfusion/ej2-angular-grids';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { cnpj } from 'cpf-cnpj-validator';
import { Supplier } from 'src/app/module/models';
import {
  SupplierService,
  ZipCodeAddressesService,
} from 'src/app/module/services';
import { ToastServiceComponent } from 'src/app/module/shared/toast-service/toast-service.component';
import { State } from './../../../models/src/state/state';

const NEW_ID = 'NOVO';
const states: State = new State();
const zipCodeRegex = /^[0-9]{8}$/;

interface GridRow {
  id: number;
  name: string;
  cnpj: string;
  city: string;
  state: string;
  email: string;
}

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss'],
  providers: [
    SortService,
    SupplierService,
    ZipCodeAddressesService,
    DialogComponent,
    ToastServiceComponent,
  ],
})
export class SuppliersComponent implements OnInit, OnDestroy {
  @ViewChild('modal', { static: true })
  private modal!: DialogComponent;

  dataSource: GridRow[] = [];
  form: FormGroup = this.createForm();
  isModalOpen = false;

  constructor(
    private toastService: ToastServiceComponent,
    private supplierService: SupplierService,
    private zipCodeAddresses: ZipCodeAddressesService
  ) {}

  ngOnInit(): void {
    this.registerEvents();
    this.loadData();
  }

  async onOpen(id?: number): Promise<void> {
    this.reset(false);
    try {
      if (id) {
        this.findSupplier(id);
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
    this.supplierService
      .deleteById(model.id)
      .pipe()
      .subscribe(
        async () => {
          await this.toastService.removeToast('Removido');
        },
        (error) => this.toastService.errorToast(error)
      );
    this.loadData();
  }

  async onSaveClick(): Promise<void> {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      this.toastService.alertToast('Formulário Inválido');
      return;
    }
    const model = this.getModel();
    const exists = model.id > 1;
    if (
      exists
        ? this.supplierService
            .updateById(model)
            .pipe()
            .subscribe(
              async () => {
                await this.toastService.updateToast();
                this.reset(false);
              },
              (error) => this.toastService.errorToast(error)
            )
        : this.supplierService
            .add(model)
            .pipe()
            .subscribe(
              async () => {
                await this.toastService.saveToast();
              },
              (error) => this.toastService.errorToast(error)
            )
    )
      return;
  }

  ngOnDestroy(): void {}

  private registerEvents(): void {
    this.form.controls.zipCodeAddresses.valueChanges
      .pipe()
      .subscribe((value) => {
        if (value as string) this.getZipCodeAddresses(value);
      });
  }

  private getZipCodeAddresses(zipCode: string): void {
    if (zipCodeRegex.test(zipCode)) {
      this.zipCodeAddresses
        .getZipCodeAddresses(zipCode)
        .pipe()
        .subscribe(async (zipCodeAddresses) => {
          this.reset(true);
          this.form.patchValue({
            city: zipCodeAddresses.localidade,
            street: zipCodeAddresses.logradouro,
            district: zipCodeAddresses.bairro,
            state: this.getReplaceState(zipCodeAddresses.uf),
          });
        });
    }
  }

  private getReplaceState(state: string): string {
    const stateReplace = states.state.find((el) => el.abbreviation === state);
    return stateReplace ? stateReplace.displayName : '';
  }

  private loadData(): void {
    this.supplierService
      .findAll()
      .pipe()
      .subscribe(
        async (suppliers) => {
          const dataSouce: GridRow[] = [];
          for (const item of suppliers) {
            dataSouce.push({
              city: item.city,
              cnpj: item.cnpj,
              email: item.email,
              id: item.id,
              name: item.name,
              state: this.getStateAbbreviation(item.state),
            });
          }
          this.dataSource = dataSouce;
        },
        (error) => this.toastService.errorToast()
      );
  }

  private getStateAbbreviation(state: string): string {
    const stateProperty = states.state.find((el) => el.name === state);
    return stateProperty ? stateProperty.abbreviation : '';
  }

  private async findSupplier(id: number): Promise<void> {
    this.supplierService
      .findById(id)
      .pipe()
      .subscribe(
        async (departament) => {
          this.populateForm(departament);
        },
        (error) => this.toastService.errorToast(error)
      );
  }

  private populateForm(supplier: Supplier): void {
    this.form.patchValue({
      id: supplier.id,
      name: supplier.name,
      comercialName: supplier.comercialName,
      cnpj: supplier.cnpj,
      phone: supplier.phone,
      email: supplier.email,
      zipCodeAddresses: supplier.zipCodeAddresses,
      state: supplier.state,
      district: supplier.district,
      city: supplier.city,
      street: supplier.street,
    });
  }

  private getModel(): Supplier {
    const model = new Supplier();
    const formValue = this.form.getRawValue();
    model.id = formValue.id === NEW_ID ? 0 : (formValue.id as number);
    model.name = formValue.name as string;
    model.city = formValue.city as string;
    model.cnpj = formValue.cnpj as string;
    model.comercialName = formValue.comercialName as string;
    model.district = formValue.district as string;
    model.email = formValue.email as string;
    model.phone = formValue.phone as string;
    model.state = formValue.state as string;
    model.street = formValue.street as string;
    model.zipCodeAddresses = formValue.zipCodeAddresses as string;
    return model;
  }

  private reset(resetZipCode: boolean): void {
    if (resetZipCode) {
      this.form.reset({
        state: null,
        district: null,
        city: null,
        street: null,
      });
      return;
    }
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
      comercialName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),
      cnpj: new FormControl(null, [
        Validators.maxLength(14),
        this.customCnpjValidator,
      ]),
      phone: new FormControl(null, [Validators.maxLength(15)]),
      zipCodeAddresses: new FormControl(null, [
        Validators.required,
        Validators.maxLength(8),
      ]),
      state: new FormControl({ value: null, disabled: true }),
      district: new FormControl({ value: null, disabled: true }),
      street: new FormControl({ value: null, disabled: true }),
      city: new FormControl({ value: null, disabled: true }),
      email: new FormControl(null, [Validators.maxLength(200)]),
    }));
  }

  private customCnpjValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const value: string = control.value as string;
    if (!value) return null;
    if (cnpj.isValid(value)) {
      return null;
    } else {
      this.toastService.alertToast('Cnpj Inválido');
      return this.toastService.alertToast('Cnpj Inválido');
    }
  }
}
