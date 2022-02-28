import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { hasFormError } from './form-error-info';

export function forEachControl(parent: AbstractControl, callback: (child: AbstractControl) => void): void {
  if (parent instanceof FormGroup) {
    const keys = Object.keys(parent.controls);
    for (const key of keys) {
      callback(parent.controls[key]);
    }
  } else if (parent instanceof FormArray) {
    for (const child of parent.controls) {
      callback(child);
    }
  }
}

export function markAllAsTouched(control: AbstractControl): void {
  if (hasFormError(control)) control.markAsTouched();
  forEachControl(control, markAllAsTouched);
}
