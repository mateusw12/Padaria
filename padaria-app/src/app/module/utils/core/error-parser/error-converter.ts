import { ErrorData } from './error-data';

export interface ErrorConverter<T> {

  canConvert(value: unknown): value is T;

  convert(value: T): ErrorData;

}
