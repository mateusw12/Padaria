import { isArray } from "../internal";

const changesSymbol = Symbol('changes');

export interface PropertyChange {
  firstChange: boolean;
  previousValue: unknown;
  currentValue: unknown;
}

export interface PropertyChanges {
  [propertyName: string]: PropertyChange | undefined;
}

interface TargetChanges {
  [changesSymbol]?: PropertyChanges;
}

type TargetMethod = (changes: PropertyChanges) => void;

type TargetClass = { [key in PropertyKey]: TargetMethod };

export function OnPropertyChange(properties: string | string[]): MethodDecorator {
  const propertyNames = isArray(properties) ? properties : [properties];

  return <T>(target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>): void | TypedPropertyDescriptor<T> => {
    const targetClass = target as TargetClass;
    const methodName = propertyKey as string;

    propertyNames.forEach(propertyName => {
      const originalDescriptor = Object.getOwnPropertyDescriptor(targetClass, propertyName);

      Object.defineProperty(targetClass, propertyName, {
        set(value) {
          const instance = this as TargetChanges;

          let changes = instance[changesSymbol];
          if (!changes) {
            changes = {};
            instance[changesSymbol] = changes;
          }

          let change = changes[propertyName];
          if (!change) {
            change = {
              firstChange: true,
              previousValue: undefined,
              currentValue: value
            };
            changes[propertyName] = change;
          } else {
            change.firstChange = false;
            change.previousValue = change.currentValue;
            change.currentValue = value;
          }

          if (change.currentValue === change.previousValue) {
            return;
          }
          if (originalDescriptor && originalDescriptor.set) {
            originalDescriptor.set.call(instance, value);
          }

          const argument: PropertyChanges = {};
          argument[propertyName] = { ...change };
          targetClass[methodName].call(instance, argument);
        },
        get() {
          const instance = this as TargetChanges;
          if (originalDescriptor && originalDescriptor.get) {
            return originalDescriptor.get.call(instance);
          } else {
            const changes = instance[changesSymbol];
            const change = changes ? changes[propertyName] : undefined;
            return change ? change.currentValue : undefined;
          }
        },
      });
    });
  };
}
