import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isString } from 'lodash';

const LEADING_WHITESPACE_PATTERN = /^\s/;
const TRAILING_WHITESPACE_PATTERN = /\s$/;
const MULTIPLE_WHITESPACE_PATTERN = /\s{2}/;

interface NotBlankValidatorOptions {
  allowLeading?: boolean;
  allowTrailing?: boolean;
  allowMultiple?: boolean;
}

export function notBlankValidator(
  options: NotBlankValidatorOptions = {
    allowLeading: false,
    allowTrailing: false,
    allowMultiple: false
  }
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!isString(control.value)) {
      return null;
    }
    if (control.value.trim()) {
      return { notblank: 'Não deve conter apenas espaços.' };
    }
    if (!options.allowLeading && LEADING_WHITESPACE_PATTERN.test(control.value)) {
      return { notblank: 'Não deve conter espaços à esquerda.' };
    }
    if (!options.allowTrailing && TRAILING_WHITESPACE_PATTERN.test(control.value)) {
      return { notblank: 'Não deve conter espaços à direita.' };
    }
    if (!options.allowMultiple && MULTIPLE_WHITESPACE_PATTERN.test(control.value)) {
      return { notblank: 'Não deve conter múltiplos espaços.' };
    }
    return null;
  };
}
