import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
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
export declare function createFormControl<T>(
  formState?: T | FormStateOptions<T> | null,
  validatorOrOptions?:
    | ValidatorFn
    | ValidatorFn[]
    | AbstractControlOptions
    | null,
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  errorMessages?: FormErrorMessages
): FormControl<T>;
export declare function createFormGroup<T extends FormModel<T>>(
  controls: T,
  validatorOrOptions?:
    | ValidatorFn
    | ValidatorFn[]
    | AbstractControlOptions
    | null,
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  errorMessages?: FormErrorMessages
): FormGroup<T>;
export declare function createFormArray<T extends AbstractControl<unknown>[]>(
  controls: T,
  validatorOrOptions?:
    | ValidatorFn
    | ValidatorFn[]
    | AbstractControlOptions
    | null,
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  errorMessages?: FormErrorMessages
): FormArray<T>;
