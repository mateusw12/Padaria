import { isBoolean } from './is-boolean';

export function getBoolean(value: unknown, defaultValue = false): boolean {
  return isBoolean(value) ? value : defaultValue;
}
