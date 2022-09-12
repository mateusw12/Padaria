import { ErrorStatus } from './constants';
import { ErrorData } from './error-data';
import { ErrorMessage } from './error-message';

export class ErrorDataBuilder {

  private data: unknown;
  private status: number = ErrorStatus.Unknown;
  private readonly errors: ErrorMessage[] = [];

  setData(value: unknown): ErrorDataBuilder {
    this.data = value;
    return this;
  }

  setStatus(value: number): ErrorDataBuilder {
    this.status = value;
    return this;
  }

  addError(code: string, message: string): ErrorDataBuilder {
    this.errors.push({ code, message });
    return this;
  }

  addErrors(errors: ErrorMessage[]): ErrorDataBuilder {
    this.errors.push(...errors);
    return this;
  }

  build(): ErrorData {
    return new ErrorData(this.data, this.status, this.errors);
  }

}
