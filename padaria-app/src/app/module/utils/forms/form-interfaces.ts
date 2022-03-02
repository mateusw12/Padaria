import {
  AbstractControl as AngularAbstractControl,
  AbstractControlOptions as AngularAbstractControlOptions,
  FormArray as AngularFormArray,
  FormControl as AngularFormControl,
  FormGroup as AngularFormGroup
} from '@angular/forms';

import { Observable } from 'rxjs';

// tslint:disable-next-line: ban-types
type NonFormModel = string | number | boolean | Function | null | undefined | never;

type FormModelPropertyValue<T> =
  T extends NonFormModel ? T | null
  : T extends FormControl<infer C> ? C | null
  : T extends FormGroup<infer G> ? FormModelValue<G>
  : T extends FormArray<infer A> ? FormModelValue<A>
  : T extends FormModel<T> ? FormModelValue<T>
  : T | null;

type FormModelPropertyResetValue<T> =
  T extends NonFormModel ? T | FormStateOptions<T> | null
  : T extends FormControl<infer C> ? C | FormStateOptions<C> | null
  : T extends FormGroup<infer G> ? FormModelResetValue<G>
  : T extends FormArray<infer A> ? FormModelResetValue<A>
  : T extends FormModel<T> ? FormModelResetValue<T>
  : T | FormStateOptions<T> | null;

export type FormStatus = 'VALID' | 'INVALID' | 'PENDING' | 'DISABLED';

export interface FormStateOptions<T> {
  value: T | null;
  disabled: boolean;
}

export type FormModel<T> = { [key in keyof T]: AbstractControl<unknown> };

export type FormModelValue<T> = { [P in keyof T]: FormModelPropertyValue<T[P]> };

export type FormModelResetValue<T> = { [P in keyof T]?: FormModelPropertyResetValue<T[P]> };

export type FormErrorMessageFn = (...args: any[]) => string;

export type FormErrorMessage = string | FormErrorMessageFn;

export type FormErrorMessages = { readonly [errorCode in string]: FormErrorMessage };

export interface AbstractControlOptions extends AngularAbstractControlOptions {
  errorMessages?: FormErrorMessages;
}

export interface FormEventOptions {
  onlySelf?: boolean;
  emitEvent?: boolean;
}

export interface FormControlEventOptions {
  onlySelf?: boolean;
  emitEvent?: boolean;
  emitModelToViewChange?: boolean;
  emitViewToModelChange?: boolean;
}

export interface AbstractControl<T> extends AngularAbstractControl {
  readonly value: T | null;
  valueChanges: Observable<T>;
  readonly status: FormStatus | string;
  statusChanges: Observable<FormStatus>;
  get<V = unknown>(path: (string | number)[] | string): AbstractControl<V> | null;
  setValue(value: T | null, options?: FormEventOptions): void;
  patchValue(value: Partial<T>, options?: FormEventOptions): void;
  reset(value?: T | FormStateOptions<T> | null, options?: FormEventOptions): void;
}

export interface FormControl<T> extends AngularFormControl {
  readonly value: T | null;
  valueChanges: Observable<T | null>;
  readonly status: FormStatus | string;
  statusChanges: Observable<FormStatus>;
  get<V = unknown>(path: (string | number)[] | string): AbstractControl<V> | null;
  setValue(value: T | null, options?: FormControlEventOptions): void;
  patchValue(value: Partial<T>, options?: FormControlEventOptions): void;
  reset(value?: T | FormStateOptions<T> | null, options?: FormControlEventOptions): void;
}

export interface FormGroup<T extends FormModel<T>> extends AngularFormGroup {
  readonly value: FormModelValue<T>;
  valueChanges: Observable<FormModelValue<T>>;
  readonly status: FormStatus | string;
  statusChanges: Observable<FormStatus>;
  controls: T;
  get<V = unknown>(path: (string | number)[] | string): AbstractControl<V> | null;
  get<P extends keyof T>(path: P): AbstractControl<T[P]>;
  setValue(value: FormModelValue<T>, options?: FormEventOptions): void;
  patchValue(value: Partial<FormModelValue<T>>, options?: FormEventOptions): void;
  reset(value?: FormModelResetValue<T>, options?: FormEventOptions): void;
  getRawValue(): FormModelValue<T>;
}

export interface FormArray<T extends AbstractControl<unknown>[]> extends AngularFormArray {
  readonly value: FormModelValue<T>;
  valueChanges: Observable<FormModelValue<T>>;
  readonly status: FormStatus | string;
  statusChanges: Observable<FormStatus>;
  controls: T;
  get<V = unknown>(path: (string | number)[] | string): AbstractControl<V> | null;
  setValue(value: FormModelValue<T>, options?: FormEventOptions): void;
  patchValue(value: Partial<FormModelValue<T>>, options?: FormEventOptions): void;
  reset(value?: FormModelResetValue<T>, options?: FormEventOptions): void;
  getRawValue(): FormModelValue<T>;
}
