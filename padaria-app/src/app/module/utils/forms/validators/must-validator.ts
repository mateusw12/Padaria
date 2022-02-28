import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function mustValidator(mustFn: (control: AbstractControl) => boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => mustFn(control) ? null : { must: false };
}
