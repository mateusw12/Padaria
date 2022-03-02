import { Nilable } from './interfaces';
import { isNil } from './is-nil';

export function hasValue<T>(value: Nilable<T>): value is T {
  return !isNil(value);
}
