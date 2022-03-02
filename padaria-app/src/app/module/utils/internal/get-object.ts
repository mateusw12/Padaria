import { isObject } from './is-object';

export function getObject(value: unknown, defaultValue = {}): object {
  return isObject(value) ? value : defaultValue;
}
