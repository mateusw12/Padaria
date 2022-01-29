export declare type Key<T> = keyof T;
export declare type Class<T> = new (...args: any[]) => T;
export declare type Delegate = (...args: any[]) => unknown;
export declare type ObjectMap<K extends PropertyKey, V> = {
  [key in K]: V;
};
export declare type ObjectValue<V> = {
  [key in PropertyKey]: V;
};
export declare type Enum<T> = {
  [key in Key<T>]: string | number;
};
export declare type EnumMap = {
  [key in string]: string | number;
};
export declare type Undefinable<T> = T | undefined;
export declare type Nullable<T> = T | null;
export declare type Nilable<T> = T | null | undefined;
export declare type NonNullableProps<T, K extends Key<T>> = {
  [P in Key<T>]: P extends K ? NonNullable<T[P]> : T[P];
};
