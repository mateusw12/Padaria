import { HttpErrorResponse } from '@angular/common/http';
import { isArray } from '@module/utils/internal';
import { ErrorCodes, ErrorMessages, ErrorStatus } from './constants';
import { ErrorConverter } from './error-converter';
import { ErrorData } from './error-data';
import { ErrorDataBuilder } from './error-data-builder';

export class HttpErrorConverter implements ErrorConverter<HttpErrorResponse> {

  canConvert(value: unknown): value is HttpErrorResponse {
    return value instanceof HttpErrorResponse;
  }

  convert(value: HttpErrorResponse): ErrorData {
    const builder = new ErrorDataBuilder()
      .setData(value)
      .setStatus(value.status);

    if (value.status === 0) {
      return builder
        .addError(ErrorCodes.NetworkError, ErrorMessages.NetworkError)
        .build();
    }

    const data = value.error as {
      errors?: { code: string, message: string }[],
      error?: string,
      error_description?: string;
      message?: string
    };

    if (!data) {
      return builder
        .addError(value.statusText, this.getStatusCodeMessage(value))
        .build();
    }

    const errors = isArray(data.errors) ? data.errors : [];

    if (errors.length === 0) {
      const errorCode = data.error || value.statusText;
      const errorMessage = data.error_description || data.message || data.error || value.message;
      if (errorCode === 'invalid_grant') {
        return builder
          .setStatus(ErrorStatus.Unauthorized)
          .addError(ErrorCodes.InvalidGrantError, ErrorMessages.InvalidGrantError)
          .build();
      }
      return builder
        .addError(errorCode, errorMessage)
        .build();
    }

    return builder
      .addErrors(errors)
      .build();
  }

  private getStatusCodeMessage(value: HttpErrorResponse): string {
    if (value.status === ErrorStatus.Unauthorized) {
      return ErrorMessages.UnauthorizedError;
    }
    if (value.status === ErrorStatus.Forbidden) {
      return ErrorMessages.ForbiddenError;
    }
    if (value.status === ErrorStatus.NotFound) {
      return ErrorMessages.NotFoundError;
    }
    return value.message;
  }

}
