import { isNumber } from './is-number';

export function getNumber(value: unknown, defaultValue = 0): number {
  return isNumber(value) ? value : defaultValue;
}
