import {
  AsyncValidatorFn,
  FormArray as AngularFormArray,
  FormControl as AngularFormControl,
  FormGroup as AngularFormGroup,
  ValidatorFn
} from '@angular/forms';

import { setErrorMessages } from './form-error-accessor';

import {
  AbstractControl,
  AbstractControlOptions,
  FormArray,
  FormControl,
  FormErrorMessages,
  FormGroup,
  FormModel,
  FormStateOptions
} from './form-interfaces';

export function createFormControl<T>(
  formState?: T | FormStateOptions<T> | null,
  validatorOrOptions?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  errorMessages?: FormErrorMessages
): FormControl<T> {
  const control = new AngularFormControl(
    formState,
    validatorOrOptions,
    asyncValidator
  ) as FormControl<T>;
  setErrorMessages(control, validatorOrOptions, errorMessages);
  return control;
}

export function createFormGroup<T extends FormModel<T>>(
  controls: T,
  validatorOrOptions?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  errorMessages?: FormErrorMessages
): FormGroup<T> {
  const group = new AngularFormGroup(
    controls,
    validatorOrOptions,
    asyncValidator
  ) as FormGroup<T>;
  setErrorMessages(group, validatorOrOptions, errorMessages);
  return group;
}

export function createFormArray<T extends AbstractControl<unknown>[]>(
  controls: T,
  validatorOrOptions?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  errorMessages?: FormErrorMessages
): FormArray<T> {
  const array = new AngularFormArray(
    controls,
    validatorOrOptions,
    asyncValidator
  ) as FormArray<T>;
  setErrorMessages(array, validatorOrOptions, errorMessages);
  return array;
}
