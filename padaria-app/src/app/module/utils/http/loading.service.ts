import { HttpHandler, HttpInterceptor } from '@angular/common/http';
import {
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  Optional,
  Type
} from '@angular/core';
import { HttpErrorHandlerInterceptor } from './http-error-handler.interceptor';
import { HttpLoadingInterceptor } from './http-loading.interceptor';
import { HttpTimeoutInterceptor } from './http-timeout.interceptor';

export const HTTP_DYNAMIC_INTERCEPTORS = new InjectionToken<HttpInterceptor>(
  'HTTP_DYNAMIC_INTERCEPTORS'
);

@Injectable({ providedIn: 'root' })
export class LoadingService {
  constructor(
    private httpHandler: HttpHandler,
    private injector: Injector,
    @Optional()
    @Inject(HTTP_DYNAMIC_INTERCEPTORS)
    private interceptors: HttpInterceptor[] = []
  ) {
    if (!this.interceptors) {
      this.interceptors = [
        this.injector.get<HttpErrorHandlerInterceptor>(
          HttpErrorHandlerInterceptor
        ),
        this.injector.get<HttpLoadingInterceptor>(HttpLoadingInterceptor),
        this.injector.get<HttpTimeoutInterceptor>(HttpTimeoutInterceptor),
      ];
    }
  }

  disableLoading(): LoadingService {
    return this.removeInterceptor(HttpLoadingInterceptor);
  }

  private removeInterceptor(
    interceptorType: Type<HttpInterceptor>
  ): LoadingService {
    return new LoadingService(
      this.httpHandler,
      this.injector,
      this.interceptors.filter((i) => !(i instanceof interceptorType))
    );
  }
}
