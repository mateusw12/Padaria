import { InjectionToken } from '@angular/core';
import { ErrorData } from './error-parser/error-data';

export interface ErrorHandlerProvider {

  getLastError(): ErrorData | null;

  clearLastError(): void;

  handle(error: unknown): Promise<ErrorData>;

  present(error: unknown): Promise<void>;

  notify(error: unknown): Promise<void>;

}

export const ERROR_HANDLER_PROVIDER = new InjectionToken<ErrorHandlerProvider>('ERROR_HANDLER_PROVIDER');
