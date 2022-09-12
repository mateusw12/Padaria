import { convert } from '@module/utils/functions/string/convert';
import { isWhitespaces } from '@module/utils/functions/string/is-whitespaces';
import { isObject } from '@module/utils/internal/is-object';
import { ErrorCodes } from './constants';
import { ErrorConverter } from './error-converter';
import { ErrorData } from './error-data';
import { ErrorDataBuilder } from './error-data-builder';

export class ObjectErrorConverter implements ErrorConverter<object> {

  canConvert(value: unknown): value is object {
    if (!isObject(value)) return false;
    const error = value as { message?: string };
    return !isWhitespaces(error.message);
  }

  convert(value: object): ErrorData {
    const error = value as { code?: string, message: string };
    const code = convert(error.code) || ErrorCodes.GenericError;

    return new ErrorDataBuilder()
      .setData(value)
      .addError(code, error.message)
      .build();
  }

}
