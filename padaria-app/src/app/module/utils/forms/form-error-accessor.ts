import { ControlContainer, FormGroupDirective, ValidatorFn } from '@angular/forms';
import { isFunction, isString } from 'lodash';
import { AbstractControl, AbstractControlOptions, FormErrorMessages } from './form-interfaces';
import { FormPath, FormPathInfo } from './form-path-info';

const formErrorMessagesSymbol = Symbol('formErrorMessages');

const FORM_ERROR_MESSAGES: FormErrorMessages = {
  min: ({ min }: { min: number }) => `Deve ser superior ou igual a ${min}.`,
  max: ({ max }: { max: number }) => `Deve ser inferior ou igual a ${max}.`,
  required: 'Obrigatório.',
  email: 'E-mail inválido.',
  minlength: ({ requiredLength }: { requiredLength: number }) =>
    `Deve ser maior ou igual a ${requiredLength} caracteres.`,
  maxlength: ({ requiredLength }: { requiredLength: number }) =>
    `Deve ser menor ou igual a ${requiredLength} caracteres.`,
  pattern: 'Formato incorreto.',
  url: 'URL inválida.',
  mask: 'Valor inválido.',
  matDatepickerMin: 'Data inválida.',
  matDatepickerMax: 'Data inválida.',
};

interface FormErrorMessagesAccessor<T> extends AbstractControl<T> {
  [formErrorMessagesSymbol]?: FormErrorMessages;
}

export interface FormError {
  readonly code: string;
  readonly data: unknown;
}

export function setErrorMessages(
  control: AbstractControl<unknown>,
  validatorOrOptions?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
  errorMessages?: FormErrorMessages
): void {
  const accessor = control as FormErrorMessagesAccessor<unknown>;
  const options = validatorOrOptions as AbstractControlOptions;
  if (options && options.errorMessages) {
    accessor[formErrorMessagesSymbol] = options.errorMessages;
  } else if (errorMessages) {
    accessor[formErrorMessagesSymbol] = errorMessages;
  }
}

export function getErrorMessages(control: AbstractControl<unknown>): FormErrorMessages {
  const accessor = control as FormErrorMessagesAccessor<unknown>;
  if (!accessor[formErrorMessagesSymbol]) { return FORM_ERROR_MESSAGES; }
  return accessor[formErrorMessagesSymbol] as FormErrorMessages;
}

export function getErrorMessage(container: ControlContainer, path: FormPath, error: FormError): string {
  const control = findControl(container, path);
  if (!control) { throw new Error('Nenhum controle foi encontrado no caminho especificado.'); }
  const errorMessages = getErrorMessages(control);
  const errorMessage = errorMessages[error.code] || FORM_ERROR_MESSAGES[error.code];
  if (isString(errorMessage)) { return errorMessage; }
  if (isFunction(errorMessage)) { return errorMessage(error.data); }
  return isString(error.data) ? error.data : error.code;
}

function findControl(container: ControlContainer, path: FormPath): AbstractControl<unknown> | null {
  if (!container.control) { throw new Error('O controle do contêiner não foi encontrado.'); }
  if (!container.path) { throw new Error('O caminho do contêiner não foi encontrado.'); }
  const control = container.control;
  const pathInfo = new FormPathInfo(path);
  if (pathInfo.isPath(container.path)) {
    return control;
  }
  if (container instanceof FormGroupDirective) {
    return control.get(path);
  }
  return control.root.get(path);
}
