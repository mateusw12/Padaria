import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  ExternalNavigationService,
  MessageService,
  ToastService
} from '@module/utils/services';
import {
  SidebarModule,
  TreeViewModule
} from '@syncfusion/ej2-angular-navigations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './module/pages/menu/menu.component';

@NgModule({
  declarations: [AppComponent, MenuComponent],
  imports: [
    BrowserModule,
    TreeViewModule,
    SidebarModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    ToastService,
    ExternalNavigationService,
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
