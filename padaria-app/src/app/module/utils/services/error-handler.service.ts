import { Injectable } from '@angular/core';
import { ERROR_TITLE } from '../constant/dialog';
import { ErrorData, ErrorHandlerProvider, ErrorParser } from '../core';
import { MessageService } from './message.service';

interface ErrorMessage {
  type: 'Error' | 'Warning';
  title: string;
  content: string;
}

@Injectable({ providedIn: 'root' })
export class ErrorHandler implements ErrorHandlerProvider {
  private lastError: ErrorData | null = null;

  constructor(
    private errorParser: ErrorParser,
    private messageService: MessageService
  ) {}

  getLastError(): ErrorData | null {
    return this.lastError;
  }

  clearLastError(): void {
    this.lastError = null;
  }

  handle(error: unknown): Promise<ErrorData> {
    return new Promise<ErrorData>((resolve) => {
      const data = this.errorParser.parse(error);
      this.lastError = data;
      if (data.isUnauthorized()) {
        return;
      }
      resolve(data);
    });
  }

  async present(error: unknown): Promise<void> {
    const data = await this.handle(error);
    const message = this.getErrorMessage(data);
    const isWarning = message.type === 'Warning';
    isWarning
      ? this.messageService.showWarningMessage(message.content)
      : this.messageService.showErrorMessage(message.content);
  }

  private getErrorMessage(data: ErrorData): ErrorMessage {
    if (data.isBadRequest()) {
      return {
        type: 'Warning',
        title: 'OPERAÇÃO INVÁLIDA',
        content: data.toString(),
      };
    }
    if (data.isForbidden()) {
      return {
        type: 'Warning',
        title: 'PROIBIDO',
        content: data.toString(),
      };
    }
    if (data.isNotFound()) {
      return {
        type: 'Warning',
        title: 'NÃO ENCONTRADO',
        content: 'O recurso solicitado não foi encontrado.',
      };
    }
    return {
      type: 'Error',
      title: ERROR_TITLE,
      content: data.toString(),
    };
  }
}
