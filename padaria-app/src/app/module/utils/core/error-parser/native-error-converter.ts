import { TimeoutError } from 'rxjs';
import { ErrorCodes, ErrorMessages } from './constants';
import { ErrorConverter } from './error-converter';
import { ErrorData } from './error-data';
import { ErrorDataBuilder } from './error-data-builder';

export class NativeErrorConverter implements ErrorConverter<Error> {

  canConvert(value: unknown): value is Error {
    return value instanceof Error;
  }

  convert(value: Error): ErrorData {
    const builder = new ErrorDataBuilder()
      .setData(value);

    if (value instanceof TimeoutError) {
      return builder
        .addError(ErrorCodes.TimeoutError, ErrorMessages.TimeoutError)
        .build();
    }

    return builder
      .addError(value.name, value.message)
      .build();
  }

}
