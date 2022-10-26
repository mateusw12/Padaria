import { AbstractControl } from "@angular/forms";

export type FormErrorMessageFn = (...args: any[]) => string;

export type FormErrorMessage = string | FormErrorMessageFn;

export type FormErrorMessages = { readonly [errorCode in string]: FormErrorMessage };

export interface AbstractControlOptions extends AbstractControl {
  errorMessages?: FormErrorMessages;
}
