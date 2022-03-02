import { isFunction } from './is-function';
import { isObject } from './is-object';

export function isPromise<T>(value: unknown): value is PromiseLike<T> {
  return isObject(value) && isFunction((value as PromiseLike<T>).then);
}
