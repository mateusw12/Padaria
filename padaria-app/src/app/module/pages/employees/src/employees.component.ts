import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ChronicCondition,
  chronicCondition,
  Employee,
  Gender,
  gender,
  Job,
  LevelSchooling,
  levelSchooling,
  MaritalStatus,
  maritalStatus,
  State
} from '@module/models';
import { EmployeeService, JobService, ZipCodeAddressesService } from '@module/services';
import { ToastServiceComponent } from '@module/shared/toast-service/toast-service.component';
import { getEnumArray, getEnumDescription } from '@module/utils';
import { SortService } from '@syncfusion/ej2-angular-grids';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { cpf } from 'cpf-cnpj-validator';
import { forkJoin } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

const NEW_ID = 'NOVO';
const BRAZILIAN_STATES: State = new State();
const ZIPCODEREGEX = /^[0-9]{8}$/;

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
}

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  providers: [
    SortService,
    EmployeeService,
    DialogComponent,
    ToastServiceComponent,
  ],
})
export class EmployeesComponent implements OnInit, OnDestroy {
  @ViewChild('modal', { static: true })
  modal!: DialogComponent;

  dataSource: GridRow[] = [];
  form: FormGroup = this.createForm();
  isModalOpen = false;
  genders = getEnumArray(gender);
  martialStatus = getEnumArray(maritalStatus);
  chronicConditions = getEnumArray(chronicCondition);
  levelSchoolings = getEnumArray(levelSchooling);
  today: Date = new Date();
  jobs: Job[] = [];

  constructor(
    private toastService: ToastServiceComponent,
    private employeeService: EmployeeService,
    private jobService: JobService,
    private zipCodeAddressesService: ZipCodeAddressesService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.registerEvents();
  }

  async onOpen(id?: number): Promise<void> {
    this.reset();
    try {
      if (id) {
        this.findEmployee(id);
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
    this.employeeService
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
      this.toastService.showError('Formulário inválido!');
      return;
    }
    const model = this.getModel();
    const exists = model.id > 1;
    if (
      exists
        ? this.employeeService
            .updateById(model)
            .pipe()
            .subscribe(
              async () => {
                await this.toastService.showUpdate();
                this.reset();
              },
              (error) => this.toastService.showError(error)
            )
        : this.employeeService
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
        const valid = await this.isValidCPF(value);
        if (!valid) {
          await this.toastService.showError('CPF Inválido!');
          controls.cpf.reset();
          return;
        }
      });
  }

  private getZipCodeAddresses(zipCode: string): void {
    this.resetZipCodeAddressesField();
    if (!ZIPCODEREGEX.test(zipCode)) return;
    this.zipCodeAddressesService.getZipCodeAddresses(zipCode).subscribe(
      async (zipCodeAddresses) => {
        this.form.patchValue({
          city: zipCodeAddresses.localidade,
          street: zipCodeAddresses.logradouro,
          district: zipCodeAddresses.bairro,
          state: this.getReplaceState(zipCodeAddresses.uf),
        });
      },
      (error: string | undefined) => this.toastService.showError(error)
    );
  }

  private getReplaceState(state: string): string {
    const stateReplace = BRAZILIAN_STATES.state.find((el) => el.abbreviation === state);
    return stateReplace ? stateReplace.displayName : '';
  }

  private async isValidCPF(value: string): Promise<boolean> {
    if (!value) return false;
    if (cpf.isValid(value)) {
      return true;
    } else {
      return false;
    }
  }

  private loadData(): void {
    forkJoin([this.employeeService.findAll(), this.jobService.findAll()])
      .pipe()
      .subscribe(async ([employees, jobs]) => {
        const dataSource: GridRow[] = [];
        for (const item of employees) {
          const job = jobs.find((el) => el.id === item.jobId);

          dataSource.push({
            birthDate: item.birthDate,
            city: item.city,
            district: item.district,
            name: item.name,
            gender: getEnumDescription(gender, item.gender),
            id: item.id,
            phone: item.phone,
            street: item.street,
            jobName: job ? job.name : '',
          });
        }
        this.dataSource = dataSource;
      });
  }

  private async findEmployee(id: number): Promise<void> {
    this.employeeService
      .findById(id)
      .pipe()
      .subscribe(
        async (employee) => {
          this.populateForm(employee);
        },
        (error) => this.toastService.showError(error)
      );
  }

  private populateForm(employee: Employee): void {
    this.form.patchValue({
      id: employee.id,
      name: employee.name,
    });
  }

  private getModel(): Employee {
    const model = new Employee();
    const formValue = this.form.getRawValue();
    model.id = formValue.id === NEW_ID ? 0 : (formValue.id as number);
    model.name = formValue.name as string;
    model.admissionDate = formValue.admissionDate as Date;
    model.birthDate = formValue.birthDate as Date;
    model.chronicCondition = formValue.chronicCondition as ChronicCondition[];
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

  private createForm(): FormGroup {
    return (this.form = new FormGroup({
      id: new FormControl({ value: NEW_ID, disabled: true }),
      name: new FormControl(null, [
        FormValidators.required,
        Validators.maxLength(200),
      ]),
      admissionDate: new FormControl(null, [FormValidators.required]),
      birthDate: new FormControl(null, [Validators.maxLength(200)]),
      chronicCondition: new FormControl(null, [FormValidators.required]),
      city: new FormControl({ value: null, disabled: true }),
      street: new FormControl({ value: null, disabled: true }),
      district: new FormControl({ value: null, disabled: true }),
      state: new FormControl({ value: null, disabled: true }),
      email: new FormControl(null, [
        FormValidators.email,
        Validators.maxLength(250),
      ]),
      gender: new FormControl(null, [FormValidators.required]),
      hourlyWork: new FormControl(null, [FormValidators.required]),
      jobId: new FormControl(null, [FormValidators.required]),
      levelSchooling: new FormControl(null, [FormValidators.required]),
      maritalStatus: new FormControl(null, [FormValidators.required]),
      phone: new FormControl(null, [Validators.maxLength(15)]),
      workingHours: new FormControl(null, [FormValidators.required]),
      zipCodeAddresses: new FormControl(null, [
        FormValidators.required,
        Validators.maxLength(14),
      ]),
      cpf: new FormControl(null, [
        FormValidators.required,
        Validators.maxLength(11),
      ]),
    }));
  }
}
