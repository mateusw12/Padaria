import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from '@module/pages/menu';
import { BreadCrumbComponent } from '@module/shared';
import { AuthGuardsService } from '@module/utils/http/auth-guards.service';
import { HttpErrorHandlerInterceptor } from '@module/utils/http/http-error-handler.interceptor';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmDialogModule } from './module/shared/src/confirm-dialog/confirm-dialog.module';

@NgModule({
  declarations: [AppComponent, MenuComponent, BreadCrumbComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ConfirmDialogModule,
  ],
  providers: [
    BsModalService,
    AuthGuardsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorHandlerInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
