import { hasValue } from './has-value';
import { Nilable } from './interfaces';

export function getValue<T>(value: Nilable<T>, defaultValue: T): T {
  return hasValue(value) ? value : defaultValue;
}
