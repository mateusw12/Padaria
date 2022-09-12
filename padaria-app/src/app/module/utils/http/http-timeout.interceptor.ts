import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

/**
 * Define os tempos limite padrão.
 */
export const HttpTimeouts = {

  /** Padrão: 30 segundos. */
  DEFAULT: 30 * 1000,

  /** Baixo: 5 minutos. */
  LOW: 5 * 60 * 1000,

  /** Médio: 10 minutos. */
  MEDIUM: 10 * 60 * 1000,

  /** Alto: 30 minutos. */
  HIGH: 30 * 60 * 1000

};

export type HttpTimeout = keyof typeof HttpTimeouts;

/**
 * Tempo limite de solicitações HTTP.
 *
 * Use a API fluente do HttpService para configurar o tempo limite para cada solicitação.
 */
@Injectable({ providedIn: 'root' })
export class HttpTimeoutInterceptor implements HttpInterceptor {

  private due: number = HttpTimeouts.DEFAULT;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(timeout(this.due));
  }

}
