import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function mustValidator(mustFn: (control: AbstractControl) => boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return mustFn(control) ? null : { must: false };
  };
}
