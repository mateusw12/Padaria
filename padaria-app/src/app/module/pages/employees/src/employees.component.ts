import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ChronicCondition,
  Employee,
  Gender,
  Job,
  LevelSchooling,
  MaritalStatus,
  State,
} from '@module/models';
import {
  EmployeeRepository,
  JobRepository,
  ZipCodeAddressesRepository,
} from '@module/repository';
import { FormGridCommandEventArgs, ModalComponent } from '@module/shared';
import { SfGridColumnModel, SfGridColumns } from '@module/shared/src/grid';
import { untilDestroyed, untilDestroyedAsync } from '@module/utils/common';
import { ZIP_CODE_ADDRESSES_REGEX } from '@module/utils/constant';
import { markAllAsTouched } from '@module/utils/forms';
import {
  EnumItem,
  getDescription,
  toArray,
} from '@module/utils/functions/enum';
import {
  ErrorHandler,
  MessageService,
  ToastService,
} from '@module/utils/services';
import { isValidCPF } from '@module/utils/validations';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { forkJoin } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

const NEW_ID = 'NOVO';
const BRAZILIAN_STATES: State = new State();

interface GridRow {
  id: number;
  name: string;
  birthDate: Date;
  gender: string;
  city: string;
  district: string;
  street: string;
  phone: string;
  jobName: string;
  monthlySalary: number;
}

interface FormModel {
  id: FormControl<string | null>;
  name: FormControl<string | null>;
  birthDate: FormControl<Date | null>;
  admissionDate: FormControl<Date | null>;
  gender: FormControl<Gender | null>;
  maritalStatus: FormControl<MaritalStatus | null>;
  chronicCondition: FormControl<ChronicCondition[] | null>;
  levelSchooling: FormControl<LevelSchooling | null>;
  city: FormControl<string | null>;
  district: FormControl<string | null>;
  street: FormControl<string | null>;
  phone: FormControl<string | null>;
  zipCodeAddresses: FormControl<string | null>;
  state: FormControl<string | null>;
  email: FormControl<string | null>;
  cpf: FormControl<string | null>;
  hourlyWork: FormControl<number | null>;
  workingHours: FormControl<number | null>;
  jobId: FormControl<number | null>;
}

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
})
export class EmployeesComponent implements OnInit, OnDestroy {
  @ViewChild(ModalComponent, { static: true })
  modal!: ModalComponent;

  dataSource: GridRow[] = [];
  form: FormGroup = this.createForm();
  columns: SfGridColumnModel[] = this.createColumns();

  genders: EnumItem[] = toArray(Gender).filter(
    (el) => el.value !== Gender.None
  );
  martialStatus = toArray(MaritalStatus).filter(
    (el) => el.value !== MaritalStatus.None
  );
  chronicConditions = toArray(ChronicCondition).filter(
    (el) => el.value !== ChronicCondition.None
  );
  levelSchoolings = toArray(LevelSchooling).filter(
    (el) => el.value !== LevelSchooling.None
  );
  today: Date = new Date();
  jobs: Job[] = [];

  constructor(
    private toastService: ToastService,
    private employeeRepository: EmployeeRepository,
    private jobRepository: JobRepository,
    private messageService: MessageService,
    private errorHandler: ErrorHandler,
    private zipCodeAddressesRepository: ZipCodeAddressesRepository
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.registerEvents();
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
        ? this.employeeRepository.updateById(model)
        : this.employeeRepository.add(model)
      )
        .pipe(untilDestroyed(this))
        .subscribe(
          async () => {
            this.toastService.showSuccess();
            this.loadData();
            this.reset();
            if (exists) this.modal.onCloseClick();
          },
          async (error) => this.handleError(error)
        )
    )
      return;
  }

  ngOnDestroy(): void {}

  private onCommandAdd(): void {
    this.onOpen();
  }

  private onCommandEdit(model: GridRow): void {
    this.onOpen(model.id);
  }

  private async onCommandRemove(model: GridRow): Promise<void> {
    this.employeeRepository
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

  private async onOpen(id?: number): Promise<void> {
    this.reset();
    try {
      if (id) {
        await this.findEmployee(id);
      }
      this.modal.open();
    } catch (error) {
      this.handleError(error);
    }
  }

  private registerEvents(): void {
    const controls = this.form.controls;

    controls.zipCodeAddresses.valueChanges
      .pipe(debounceTime(200))
      .subscribe((value) => {
        if (value as string) this.getZipCodeAddresses(value);
      });

    controls.cpf.valueChanges
      .pipe(debounceTime(700))
      .subscribe(async (value) => {
        if (!value) return;
        const valid = isValidCPF(value);
        if (valid) return;
        this.toastService.showWarning('CPF Inválido!');
        controls.cpf.reset();
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
    forkJoin([this.employeeRepository.findAll(), this.jobRepository.findAll()])
      .pipe(untilDestroyed(this))
      .subscribe(
        async ([employees, jobs]) => {
          const dataSource: GridRow[] = [];
          this.jobs = jobs;

          for (const item of employees) {
            const job = jobs.find((el) => el.id === item.jobId);

            dataSource.push({
              birthDate: item.birthDate,
              city: item.city,
              district: item.district,
              name: item.name,
              gender: getDescription(Gender, item.gender),
              id: item.id,
              phone: item.phone,
              street: item.street,
              jobName: job ? job.name : '',
              monthlySalary: this.getMonthlySalary(
                Number(item.workingHours),
                Number(item.hourlyWork)
              ),
            });
          }
          this.dataSource = dataSource;
        },
        (error) => this.handleError(error)
      );
  }

  private getMonthlySalary(workingHours: number, hourlyWork: number): number {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const totalDays = new Date(year, month, 0).getDate();
    return workingHours * hourlyWork * totalDays;
  }

  private async findEmployee(id: number): Promise<void> {
    this.employeeRepository
      .findById(id)
      .pipe(untilDestroyed(this))
      .subscribe(async (employee) => {
        this.populateForm(employee);
      });
  }

  private populateForm(employee: Employee): void {
    this.form.patchValue({
      id: employee.id,
      name: employee.name,
      admissionDate: employee.admissionDate,
      birthDate: employee.birthDate,
      gender: employee.gender,
      hourlyWork: employee.hourlyWork,
      jobId: employee.jobId,
      levelSchooling: employee.levelSchooling,
      maritalStatus: employee.maritalStatus,
      phone: employee.phone,
      chronicCondition: employee.chronicCondition,
      state: employee.state,
      street: employee.street,
      city: employee.city,
      district: employee.district,
      workingHours: employee.workingHours,
      zipCodeAddresses: employee.zipCodeAddresses,
      cpf: employee.cpf,
      email: employee.email,
    });
  }

  private getModel(): Employee {
    const model = new Employee();
    const formValue = this.form.getRawValue();
    model.id = formValue.id === NEW_ID ? 0 : (formValue.id as number);
    model.name = formValue.name as string;
    model.admissionDate = formValue.admissionDate as Date;
    model.birthDate = formValue.birthDate as Date;
    model.chronicCondition = formValue.chronicCondition
      ? (formValue.chronicCondition as ChronicCondition[])
      : [];
    model.city = formValue.city as string;
    model.district = formValue.district as string;
    model.email = formValue.email as string;
    model.gender = formValue.gender as Gender;
    model.hourlyWork = formValue.hourlyWork as number;
    model.jobId = formValue.jobId as number;
    model.levelSchooling = formValue.levelSchooling as LevelSchooling;
    model.maritalStatus = formValue.maritalStatus as MaritalStatus;
    model.phone = formValue.phone as string;
    model.state = formValue.state as string;
    model.street = formValue.street as string;
    model.workingHours = formValue.workingHours as number;
    model.zipCodeAddresses = formValue.zipCodeAddresses as string;
    model.cpf = formValue.cpf as string;
    return model;
  }

  private reset(): void {
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
      admissionDate: new FormControl<Date | null>(null, [
        FormValidators.required,
      ]),
      birthDate: new FormControl<Date | null>(null, [
        Validators.maxLength(200),
      ]),
      chronicCondition: new FormControl<ChronicCondition[] | null>(null),
      city: new FormControl<string | null>({ value: null, disabled: true }),
      street: new FormControl<string | null>({ value: null, disabled: true }),
      district: new FormControl<string | null>({ value: null, disabled: true }),
      state: new FormControl<string | null>({ value: null, disabled: true }),
      email: new FormControl<string | null>(null, [
        Validators.email,
        Validators.maxLength(250),
      ]),
      gender: new FormControl<Gender | null>(null, [FormValidators.required]),
      hourlyWork: new FormControl<number | null>(null, [
        FormValidators.required,
      ]),
      jobId: new FormControl<number | null>(null, [FormValidators.required]),
      levelSchooling: new FormControl<LevelSchooling | null>(null, [
        FormValidators.required,
      ]),
      maritalStatus: new FormControl<MaritalStatus | null>(null, [
        FormValidators.required,
      ]),
      phone: new FormControl<string | null>(null, [Validators.maxLength(15)]),
      workingHours: new FormControl<number | null>(null, [
        FormValidators.required,
      ]),
      zipCodeAddresses: new FormControl<string | null>(null, [
        FormValidators.required,
        Validators.maxLength(14),
      ]),
      cpf: new FormControl<string | null>(null, [
        FormValidators.required,
        Validators.maxLength(11),
      ]),
    });
  }

  private createColumns(): SfGridColumnModel[] {
    return SfGridColumns.build<GridRow>({
      id: SfGridColumns.text('id', 'Código').minWidth(100).isPrimaryKey(true),
      name: SfGridColumns.text('name', 'Nome').minWidth(200),
      gender: SfGridColumns.text('gender', 'Gênero').minWidth(100),
      birthDate: SfGridColumns.date('birthDate', 'Data Aniversário').minWidth(
        100
      ),
      city: SfGridColumns.text('city', 'Cidade').minWidth(200),
      district: SfGridColumns.text('district', 'Bairro').minWidth(200),
      jobName: SfGridColumns.text('jobName', 'Cargo').minWidth(100),
      street: SfGridColumns.text('street', 'Endereço').minWidth(200),
      phone: SfGridColumns.text('phone', 'Telefone').minWidth(100),
      monthlySalary: SfGridColumns.numeric(
        'monthlySalary',
        'Salário Mensal'
      ).minWidth(100),
    });
  }
}
