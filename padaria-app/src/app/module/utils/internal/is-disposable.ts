import { Disposable } from './disposable';
import { isFunction } from './is-function';
import { isObject } from './is-object';

export function isDisposable(value: unknown): value is Disposable {
  return isObject(value) && isFunction((value as Disposable).dispose);
}
