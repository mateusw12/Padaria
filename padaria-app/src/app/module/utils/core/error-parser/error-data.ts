import { ErrorStatus } from './constants';
import { ErrorMessage } from './error-message';

export class ErrorData {

  constructor(
    readonly data: unknown,
    readonly status: number,
    readonly errors: ErrorMessage[]
  ) { }

  isStatus(status: number): boolean {
    return this.status === status;
  }

  hasError(code: string): boolean {
    return this.errors.some(error => error.code === code);
  }

  isBadRequest(): boolean {
    return this.isStatus(ErrorStatus.BadRequest);
  }

  isUnauthorized(): boolean {
    return this.isStatus(ErrorStatus.Unauthorized);
  }

  isForbidden(): boolean {
    return this.isStatus(ErrorStatus.Forbidden);
  }

  isNotFound(): boolean {
    return this.isStatus(ErrorStatus.NotFound);
  }

  toString(): string {
    return this.errors
      .map(error => error.message)
      .join('\n')
      .trim();
  }

}
