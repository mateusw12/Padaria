export type Key<T> = keyof T;

export type Class<T> = new (...args: any[]) => T;

export type Delegate = (...args: any[]) => unknown;

export type ObjectMap<K extends PropertyKey, V> = { [key in K]: V };

export type ObjectValue<V> = { [key in PropertyKey]: V };

export type Enum<T> = { [key in Key<T>]: string | number };

export type EnumMap = { [key in string]: string | number };

export type Undefinable<T> = T | undefined;

export type Nullable<T> = T | null;

export type Nilable<T> = T | null | undefined;

export type NonNullableProps<T, K extends Key<T>> = {
  [P in Key<T>]: P extends K ? NonNullable<T[P]> : T[P];
};
