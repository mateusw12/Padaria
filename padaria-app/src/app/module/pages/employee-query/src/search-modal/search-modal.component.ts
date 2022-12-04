import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  Employee,
  EmployeeQueryFilter,
  Gender,
  Job,
  LevelSchooling,
  MaritalStatus,
  State,
} from '@module/models';
import { ModalComponent } from '@module/shared';
import { toArray } from '@module/utils/functions/enum';
import { StateProperty } from '@module/utils/interfaces';

const BRAZILIAN_STATES: State = new State();

interface FormModel {
  employeeIds: FormControl<number[] | null>;
  gender: FormControl<Gender[] | null>;
  maritalStatus: FormControl<MaritalStatus[] | null>;
  levelSchooling: FormControl<LevelSchooling[] | null>;
  jobIds: FormControl<number[] | null>;
  states: FormControl<string[] | null>;
  admissionDate: FormControl<Date | null>;
  city: FormControl<string | null>;
}

@Component({
  selector: 'app-search-employee-modal',
  templateUrl: './search-modal.component.html',
})
export class SearchEmployeeModalComponent implements OnInit, OnDestroy {
  @Output()
  filter = new EventEmitter<EmployeeQueryFilter>();

  @Input()
  jobs: Job[] = [];

  @Input()
  employees: Employee[] = [];

  form: FormGroup = this.createForm();
  genders = toArray(Gender).filter((el) => el.value !== Gender.None);
  martialStatus = toArray(MaritalStatus).filter(
    (el) => el.value !== MaritalStatus.None
  );
  levelSchoolings = toArray(LevelSchooling).filter(
    (el) => el.value !== LevelSchooling.None
  );
  states: StateProperty[] = BRAZILIAN_STATES.state;

  @ViewChild(ModalComponent, { static: true })
  private modal!: ModalComponent;

  constructor() {}

  ngOnInit(): void {}

  async onOpen(): Promise<void> {
    this.reset();
    this.modal.open();
  }

  onApplyClick(): void {
    const model = this.getModel();
    this.filter.emit(model);
    this.modal.onCloseClick();
  }

  onModalClose(): void {
    this.modal.onCloseClick();
  }

  reset(): void {
    this.form.reset();
  }

  ngOnDestroy(): void {}

  private getModel(): EmployeeQueryFilter {
    const model = new EmployeeQueryFilter();
    const formValue = this.form.getRawValue();
    model.admissionDate = formValue.admissionDate as Date | null;
    model.city = formValue.city as string;
    model.employeeIds = formValue.employeeIds as number[];
    model.jobIds = formValue.jobIds as number[];
    model.gender = formValue.gender as Gender[];
    model.levelSchooling = formValue.levelSchooling as LevelSchooling[];
    model.maritalStatus = formValue.maritalStatus as MaritalStatus[];
    model.states = formValue.states as string[];
    return model;
  }

  private createForm(): FormGroup<FormModel> {
    return new FormGroup<FormModel>({
      employeeIds: new FormControl<number[] | null>([]),
      gender: new FormControl<Gender[] | null>([]),
      maritalStatus: new FormControl<MaritalStatus[] | null>([]),
      levelSchooling: new FormControl<LevelSchooling[] | null>([]),
      jobIds: new FormControl<number[] | null>([]),
      states: new FormControl<string[] | null>([]),
      admissionDate: new FormControl<Date | null>(null),
      city: new FormControl<string | null>(null),
    });
  }
}
