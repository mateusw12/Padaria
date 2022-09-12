import { HttpErrorResponse } from '@angular/common/http';
import { ErrorConverter } from './error-converter';
import { HttpErrorConverter } from './http-error-converter';
import { NativeErrorConverter } from './native-error-converter';
import { ObjectErrorConverter } from './object-error-converter';
import { StringErrorConverter } from './string-error-converter';

export const ErrorConverters = {
  HTTP: new HttpErrorConverter() as ErrorConverter<HttpErrorResponse>,
  NATIVE: new NativeErrorConverter() as ErrorConverter<Error>,
  OBJECT: new ObjectErrorConverter() as ErrorConverter<object>,
  STRING: new StringErrorConverter() as ErrorConverter<string>,
};
