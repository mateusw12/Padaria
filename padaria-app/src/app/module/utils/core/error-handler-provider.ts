import { ErrorData } from './error-parser/error-data';

export interface ErrorHandlerProvider {

  getLastError(): ErrorData | null;

  clearLastError(): void;

  handle(error: unknown): Promise<ErrorData>;

  present(error: unknown): Promise<void>;

}
