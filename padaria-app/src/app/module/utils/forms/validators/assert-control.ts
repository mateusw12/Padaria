import { AbstractControl } from '@angular/forms';
import { FormPath, FormPathInfo } from '../form-path-info';

export function assertControl(control: AbstractControl | null, path: FormPath): asserts control is AbstractControl {
  if (!control) {
    throw new Error(`O controle '${new FormPathInfo(path).getRawPath()}' não foi encontrado.`);
  }
}
