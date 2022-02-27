import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  DECORATOR_APPLIED,
  getSymbol,
  createSubjectOnTheInstance,
  completeSubjectOnTheInstance,
} from './internals';

declare const ngDevMode: boolean;

function overrideNonDirectiveInstanceMethod(
  instance: any,
  destroyMethodName: string,
  symbol: symbol
): void {
  const originalDestroy = instance[destroyMethodName];

  if (ngDevMode && typeof originalDestroy !== 'function') {
    throw new Error(
      `${instance.constructor.name} usando mas não implementando o untilDestroyed ${destroyMethodName}`
    );
  }

  createSubjectOnTheInstance(instance, symbol);
  instance[destroyMethodName] = function () {
    originalDestroy.apply(this, arguments);
    completeSubjectOnTheInstance(this, symbol);
    instance[destroyMethodName] = originalDestroy;
  };
}

export function untilDestroyed<T>(instance: T, destroyMethodName?: keyof T) {
  return <U>(source: Observable<U>) => {
    const symbol = getSymbol<T>(destroyMethodName);

    if (typeof destroyMethodName === 'string') {
      overrideNonDirectiveInstanceMethod(instance, destroyMethodName, symbol);
    } else {
      ngDevMode && ensureClassIsDecorated(instance);
      createSubjectOnTheInstance(instance, symbol);
    }

    return source.pipe(takeUntil<U>((instance as any)[symbol]));
  };
}

function ensureClassIsDecorated(instance: InstanceType<any>): never | void {
  const prototype = Object.getPrototypeOf(instance);
  const missingDecorator = !(DECORATOR_APPLIED in prototype);

  if (missingDecorator) {
    throw new Error(
      'untilDestroyed não pode ser usado em directives ou ' +
        'em componentes que nao utilizam o decorator com UntilDestroy'
    );
  }
}
