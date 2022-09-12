import { Injectable } from '@angular/core';
import { createUnknownError } from './create-unknown-error';
import { ErrorConverters } from './error-converters';
import { ErrorData } from './error-data';

@Injectable({ providedIn: 'root' })
export class ErrorParser {

  parse(error: unknown): ErrorData {
    if (error instanceof ErrorData) {
      return error;
    }
    if (ErrorConverters.HTTP.canConvert(error)) {
      return ErrorConverters.HTTP.convert(error);
    }
    if (ErrorConverters.NATIVE.canConvert(error)) {
      return ErrorConverters.NATIVE.convert(error);
    }
    if (ErrorConverters.OBJECT.canConvert(error)) {
      return ErrorConverters.OBJECT.convert(error);
    }
    if (ErrorConverters.STRING.canConvert(error)) {
      return ErrorConverters.STRING.convert(error);
    }
    return createUnknownError(error);
  }

}
