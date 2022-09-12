import { Injectable, InjectionToken, Injector, Type } from '@angular/core';

export class Lazy<T> {

  private _value: T | undefined;

  constructor(private creator: () => T) { }

  get value(): T {
    if (this._value === undefined) {
      this._value = this.creator();
    }
    return this._value;
  }

  get isValueCreated(): boolean {
    return this._value !== undefined;
  }

}

@Injectable({ providedIn: 'root' })
export class LazyInjector {

  constructor(private injector: Injector) { }

  get<T>(type: Type<T> | InjectionToken<T>): Lazy<T> {
    return new Lazy(() => this.injector.get(type));
  }

}
