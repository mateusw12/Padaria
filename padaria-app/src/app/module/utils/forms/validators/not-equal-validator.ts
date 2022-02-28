import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormErrorInfo } from '../form-error-info';
import { getControlPath } from '../form-path-info';
import { assertControl } from './assert-control';

export function notEqualValidator(
  targetPath: string | (string | number)[],
  matchPath: string | (string | number)[]): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    const targetControl = control.get(targetPath);
    const matchControl = control.get(matchPath);

    assertControl(targetControl, targetPath);
    if (!targetControl.valid) { return null; }

    assertControl(matchControl, matchPath);
    if (!matchControl.valid) { return null; }

    if (targetControl.value === matchControl.value) {
      const pathInfo = getControlPath(targetControl);
      const errorInfo = new FormErrorInfo(pathInfo, 'notequal');
      const errors: ValidationErrors = {};
      errors[errorInfo.getCode()] = { targetPath, matchPath };
      return errors;
    }
    return null;
  };
}
