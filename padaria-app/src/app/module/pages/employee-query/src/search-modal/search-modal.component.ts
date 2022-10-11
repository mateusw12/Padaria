import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  chronicCondition,
  ChronicCondition,
  EmployeeQueryFilter,
  gender,
  Gender,
  Job,
  levelSchooling,
  LevelSchooling,
  maritalStatus,
  MaritalStatus,
  State
} from '@module/models';
import { ModalComponent } from '@module/shared/src';
import { getEnumArray } from '@module/utils/functions';
import { StateProperty } from '@module/utils/interfaces';

const BRAZILIAN_STATES: State = new State();

@Component({
  selector: 'app-search-employee-modal',
  templateUrl: './search-modal.component.html',
})
export class SearchEmployeeModalComponent implements OnInit, OnDestroy {
  @Output()
  filter = new EventEmitter<EmployeeQueryFilter>();

  @Input()
  jobs: Job[] = [];

  form: FormGroup = this.createForm();
  genders = getEnumArray(gender);
  martialStatus = getEnumArray(maritalStatus);
  chronicConditions = getEnumArray(chronicCondition);
  levelSchoolings = getEnumArray(levelSchooling);
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
    model.chronicCondition = formValue.chronicCondition as ChronicCondition[];
    model.city = formValue.city as string;
    model.employeeIds = formValue.employeeIds as number[];
    model.jobIds = formValue.jobIds as number[];
    model.gender = formValue.gender as Gender[];
    model.levelSchooling = formValue.levelSchooling as LevelSchooling[];
    model.maritalStatus = formValue.maritalStatus as MaritalStatus[];
    model.states = formValue.states as string[];
    return model;
  }

  private createForm(): FormGroup {
    return (this.form = new FormGroup({
      employeeIds: new FormControl([]),
      gender: new FormControl([]),
      maritalStatus: new FormControl([]),
      chronicCondition: new FormControl([]),
      levelSchooling: new FormControl([]),
      jobIds: new FormControl([]),
      states: new FormControl([]),
      admissionDate: new FormControl(null),
      city: new FormControl(null),
    }));
  }
}