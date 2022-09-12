import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from '../services';

const httpLoadingSymbol = Symbol('httpLoading');

/**
 * Adiciona um manipulador que exibe o componente de carregamento padrão durante as solicitações.
 */
@Injectable({ providedIn: 'root' })
export class HttpLoadingInterceptor implements HttpInterceptor {

  constructor(private spinnerService: SpinnerService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinnerService.show(httpLoadingSymbol);
    return next.handle(request).pipe(finalize(() => this.spinnerService.hide(httpLoadingSymbol)));
  }

}
