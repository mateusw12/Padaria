import { AbstractControl, ValidationErrors } from '@angular/forms';
import { FormPath, FormPathInfo, getControlPath } from './form-path-info';

const ERROR_SEPARATOR = ':';

export function parseErrorInfo(errorCode: string): FormErrorInfo | null {
  if (!errorCode) return null;
  const parts = errorCode.split(ERROR_SEPARATOR, 2);
  if (parts.length !== 2) return null;
  return new FormErrorInfo(parts[0], parts[1]);
}

export function createFormError(control: AbstractControl, name: string, data: unknown = true): ValidationErrors {
  const pathInfo = getControlPath(control);
  const errorInfo = new FormErrorInfo(pathInfo, name);
  const errors: ValidationErrors = {};
  errors[errorInfo.getCode()] = data;
  return errors;
}

export function mergeFormErrors(errors: ValidationErrors[]): ValidationErrors {
  const result: ValidationErrors = {};
  for (const error of errors) {
    for (const key of Object.keys(error)) {
      result[key] = error[key];
    }
  }
  return result;
}

export function hasFormError(control: AbstractControl): boolean {
  if (control.invalid) return true;
  const pathInfo = getControlPath(control);
  const controlPath = pathInfo.getPath() as string[];
  let current = control.parent;
  while (current) {
    if (current.errors) {
      const errorCodes = Object.keys(current.errors);
      for (const errorCode of errorCodes) {
        const errorInfo = parseErrorInfo(errorCode);
        if (!errorInfo) continue;
        const errorPath = errorInfo.getPath();
        if (!errorPath.isPath(controlPath)) continue;
        return true;
      }
    }
    current = current.parent;
  }
  return false;
}

export class FormErrorInfo {

  private path: FormPathInfo;
  private name: string;

  constructor(path: FormPath | FormPathInfo, name: string) {
    this.path = path instanceof FormPathInfo ? path : new FormPathInfo(path);
    this.name = name;
  }

  getPath(): FormPathInfo {
    return this.path;
  }

  getName(): string {
    return this.name;
  }

  getCode(): string {
    return `${this.getPath().getRawPath()}${ERROR_SEPARATOR}${this.getName()}`;
  }

}
