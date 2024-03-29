import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { State, Supplier } from '@module/models';
import {
  SupplierRepository,
  ZipCodeAddressesRepository,
} from '@module/repository';
import { ModalComponent } from '@module/shared/src';
import { FormGridCommandEventArgs } from '@module/shared/src/form-grid/formgrid.component';
import { SfGridColumnModel, SfGridColumns } from '@module/shared/src/grid';
import { untilDestroyed, untilDestroyedAsync } from '@module/utils/common';
import { ZIP_CODE_ADDRESSES_REGEX } from '@module/utils/constant';
import { markAllAsTouched } from '@module/utils/forms';
import {
  ErrorHandler,
  MessageService,
  ToastService,
} from '@module/utils/services';
import { isValidCNPJ } from '@module/utils/validations';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { debounceTime } from 'rxjs/operators';

const NEW_ID = 'NOVO';
const BRAZILIAN_STATES: State = new State();

interface GridRow {
  id: number;
  name: string;
  cnpj: string;
  city: string;
  state: string;
  email: string;
}

interface FormModel {
  id: FormControl<string | null>;
  name: FormControl<string | null>;
  cnpj: FormControl<string | null>;
  city: FormControl<string | null>;
  state: FormControl<string | null>;
  email: FormControl<string | null>;
  district: FormControl<string | null>;
  comercialName: FormControl<string | null>;
  phone: FormControl<string | null>;
  street: FormControl<string | null>;
  zipCodeAddresses: FormControl<string | null>;
}

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
})
export class SuppliersComponent implements OnInit, OnDestroy {
  @ViewChild(ModalComponent, { static: true })
  private modal!: ModalComponent;

  dataSource: GridRow[] = [];
  form = this.createForm();
  columns: SfGridColumnModel[] = this.createColumns();

  constructor(
    private toastService: ToastService,
    private supplierRepository: SupplierRepository,
    private zipCodeAddressesRepository: ZipCodeAddressesRepository,
    private messageService: MessageService,
    private errorHandler: ErrorHandler
  ) {}

  ngOnInit(): void {
    this.registerEvents();
    this.loadData();
  }

  async onOpen(id?: number): Promise<void> {
    this.resetForm();
    try {
      if (id) {
        await this.findSupplier(id);
      }
      this.modal.open();
    } catch (error) {
      this.handleError(error);
    }
  }

  async onModalClose(): Promise<void> {
    this.modal.onCloseClick();
  }

  async onEdit(model: GridRow): Promise<void> {
    await this.onOpen(model.id);
  }

  async onSaveClick(): Promise<void> {
    if (!this.form.valid) {
      markAllAsTouched(this.form);
      return;
    }
    const model = this.getModel();
    const exists = model.id > 1;

    if (exists) {
      const confirmed = await this.messageService.showConfirmSave();
      if (!confirmed) return;
    }

    (exists
      ? this.supplierRepository.updateById(model)
      : this.supplierRepository.add(model)
    )
      .pipe(untilDestroyed(this))
      .subscribe(
        async () => {
          this.toastService.showSuccess();
          this.loadData();
          this.resetForm();
          if (exists) this.modal.onCloseClick();
        },
        async (error) => this.handleError(error)
      );
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

  ngOnDestroy(): void {}

  private onCommandAdd(): void {
    this.onOpen();
  }

  private onCommandEdit(model: GridRow): void {
    this.onOpen(model.id);
  }

  private async onCommandRemove(model: GridRow): Promise<void> {
    const confirmed = await this.messageService.showConfirmDelete();
    if (!confirmed) return;
    this.supplierRepository
      .deleteById(model.id)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.toastService.showRemove();
          this.loadData();
        },
        (error) => this.handleError(error)
      );
  }

  private registerEvents(): void {
    const controls = this.form.controls;

    controls.zipCodeAddresses.valueChanges
      .pipe(debounceTime(200))
      .subscribe((value) => {
        if (value as string) this.getZipCodeAddresses(value as string);
      });

    controls.cnpj.valueChanges
      .pipe(debounceTime(2000))
      .subscribe(async (value) => {
        if (!value) return;
        const valid = isValidCNPJ(value);
        if (!valid) {
          await this.toastService.showWarning('CNPJ Inválido!');
          controls.cnpj.reset();
          return;
        }
      });
  }

  private getZipCodeAddresses(zipCode: string): void {
    this.resetZipCodeAddressesField();
    if (!ZIP_CODE_ADDRESSES_REGEX.test(zipCode)) return;
    this.zipCodeAddressesRepository
      .getZipCodeAddresses(zipCode)
      .pipe(untilDestroyed(this))
      .subscribe(
        async (zipCodeAddresses) => {
          this.form.patchValue({
            city: zipCodeAddresses.localidade,
            street: zipCodeAddresses.logradouro,
            district: zipCodeAddresses.bairro,
            state: this.getReplaceState(zipCodeAddresses.uf),
          });
        },
        (error) => this.handleError(error)
      );
  }

  private getReplaceState(state: string): string {
    const stateReplace = BRAZILIAN_STATES.state.find(
      (el) => el.abbreviation === state
    );
    return stateReplace ? stateReplace.displayName : '';
  }

  private loadData(): void {
    this.supplierRepository
      .findAll()
      .pipe(untilDestroyed(this))
      .subscribe(
        async (suppliers) => {
          const dataSouce: GridRow[] = [];
          for (const item of suppliers) {
            const state = BRAZILIAN_STATES.state.find(
              (el) => el.name === item.name
            );

            dataSouce.push({
              city: item.city,
              cnpj: item.cnpj,
              email: item.email,
              id: item.id,
              name: item.name,
              state: state ? state.displayName : '',
            });
          }
          this.dataSource = dataSouce;
        },
        (error) => this.handleError(error)
      );
  }

  private async findSupplier(id: number): Promise<void> {
    this.supplierRepository
      .findById(id)
      .pipe(untilDestroyed(this))
      .subscribe(
        async (suppliers) => {
          this.populateForm(suppliers);
        },
        (error) => this.handleError(error)
      );
  }

  private populateForm(supplier: Supplier): void {
    this.form.patchValue({
      id: supplier.id.toString(),
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
    model.id =
      formValue.id === NEW_ID ? 0 : (formValue.id as unknown as number);
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

  private resetForm(): void {
    this.form.reset({
      id: NEW_ID,
    });
  }

  private resetZipCodeAddressesField(): void {
    this.form.patchValue({
      state: null,
      district: null,
      city: null,
      street: null,
    });
  }

  private handleError(error: unknown): void {
    this.errorHandler.present(error);
  }

  private createForm(): FormGroup<FormModel> {
    return new FormGroup<FormModel>({
      id: new FormControl<string | null>({ value: NEW_ID, disabled: true }),
      name: new FormControl<string | null>(null, [
        FormValidators.required,
        Validators.maxLength(200),
      ]),
      comercialName: new FormControl<string | null>(null, [
        FormValidators.required,
        Validators.maxLength(200),
      ]),
      cnpj: new FormControl<string | null>(null, [Validators.maxLength(14)]),
      phone: new FormControl<string | null>(null, [Validators.maxLength(15)]),
      zipCodeAddresses: new FormControl<string | null>(null, [
        FormValidators.required,
        Validators.maxLength(11),
      ]),
      state: new FormControl<string | null>({ value: null, disabled: true }),
      district: new FormControl<string | null>({ value: null, disabled: true }),
      street: new FormControl<string | null>({ value: null, disabled: true }),
      city: new FormControl<string | null>({ value: null, disabled: true }),
      email: new FormControl<string | null>(null, [
        Validators.maxLength(200),
        Validators.email,
      ]),
    });
  }

  private createColumns(): SfGridColumnModel[] {
    return SfGridColumns.build<GridRow>({
      id: SfGridColumns.text('id', 'Código').minWidth(75).isPrimaryKey(true),
      name: SfGridColumns.text('name', 'Nome').minWidth(200),
      city: SfGridColumns.text('city', 'Cidade').minWidth(100),
      cnpj: SfGridColumns.text('cnpj', 'CNPJ').minWidth(100),
      email: SfGridColumns.text('email', 'E-mail').minWidth(100),
      state: SfGridColumns.text('state', 'Estado').minWidth(100),
    });
  }
}
