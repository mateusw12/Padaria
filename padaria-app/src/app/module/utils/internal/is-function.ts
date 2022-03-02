import { Delegate } from './interfaces';

export function isFunction<T extends Delegate>(value: unknown): value is T {
  return typeof value === 'function';
}
