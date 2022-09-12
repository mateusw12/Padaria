import { isWhitespaces } from '@module/utils/functions/string/is-whitespaces';
import { isString } from '@module/utils/internal';
import { ErrorCodes } from './constants';
import { ErrorConverter } from './error-converter';
import { ErrorData } from './error-data';
import { ErrorDataBuilder } from './error-data-builder';

export class StringErrorConverter implements ErrorConverter<string> {

  canConvert(value: unknown): value is string {
    if (!isString(value)) return false;
    return !isWhitespaces(value);
  }

  convert(value: string): ErrorData {
    return new ErrorDataBuilder()
      .setData(value)
      .addError(ErrorCodes.GenericError, value)
      .build();
  }

}
