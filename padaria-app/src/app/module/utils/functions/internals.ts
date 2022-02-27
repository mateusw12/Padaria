import { InjectableType, ɵComponentType, ɵDirectiveType } from '@angular/core';
import { Subject } from 'rxjs';
import { PipeType } from './ivy';

const DESTROY: unique symbol = Symbol('__destroy');

export const DECORATOR_APPLIED: unique symbol = Symbol('__decoratorApplied');

export function getSymbol<T>(destroyMethodName?: keyof T): symbol {
  if (typeof destroyMethodName === 'string') {
    return Symbol(`__destroy__${destroyMethodName}`);
  } else {
    return DESTROY;
  }
}

export function markAsDecorated<T>(
  type: InjectableType<T> | PipeType<T> | ɵDirectiveType<T> | ɵComponentType<T>
): void {
  type.prototype[DECORATOR_APPLIED] = true;
}

export interface UntilDestroyOptions {
  blackList?: string[];
  arrayName?: string;
  checkProperties?: boolean;
}

export function createSubjectOnTheInstance(
  instance: any,
  symbol: symbol
): void {
  if (!instance[symbol]) {
    instance[symbol] = new Subject<void>();
  }
}

export function completeSubjectOnTheInstance(
  instance: any,
  symbol: symbol
): void {
  if (instance[symbol]) {
    instance[symbol].next();
    instance[symbol].complete();
    instance[symbol] = null;
  }
}
