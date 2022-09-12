import { ErrorCodes, ErrorMessages } from './constants';
import { ErrorData } from './error-data';
import { ErrorDataBuilder } from './error-data-builder';

export function createUnknownError(error: unknown): ErrorData {
  return new ErrorDataBuilder()
    .setData(error)
    .addError(ErrorCodes.UnknownError, ErrorMessages.UnknownError)
    .build();
}
