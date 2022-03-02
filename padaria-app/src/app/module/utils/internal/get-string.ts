import { isString } from './is-string';

export function getString(value: unknown, defaultValue = ''): string {
  return isString(value) ? value : defaultValue;
}
