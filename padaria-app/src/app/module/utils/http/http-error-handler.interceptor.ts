import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ErrorHandlerProvider, ERROR_HANDLER_PROVIDER, Lazy, LazyInjector } from '../core';
import { Context } from '../core/context';
import { Logger } from '../logging';

const logger = new Logger('HttpErrorHandlerInterceptor');

/**
 * Adiciona um manipulador de erros padrão a todas as solicitações.
 */
@Injectable({ providedIn: 'root' })
export class HttpErrorHandlerInterceptor implements HttpInterceptor {

  private errorHandlerProvider: Lazy<ErrorHandlerProvider>;

  constructor(lazyInjector: LazyInjector, private context: Context) {
    this.errorHandlerProvider = lazyInjector.get(ERROR_HANDLER_PROVIDER);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(this.handleError.bind(this)));
  }

  private handleError(event: HttpEvent<unknown>): Observable<HttpEvent<unknown>> {
    if (!this.context.production) {
      logger.error('Erro na solicitação.', event);
    }
    return from(this.errorHandlerProvider.value.handle(event))
      .pipe(switchMap(error => throwError(error)));
  }

}
