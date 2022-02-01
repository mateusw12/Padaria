import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import {
  SidebarModule,
  TreeViewModule,
} from '@syncfusion/ej2-angular-navigations';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartamentsComponent } from './module/pages/departaments/src/departaments.component';
import { JobsComponent } from './module/pages/jobs/src/jobs.component';
import { ManufacturersComponent } from './module/pages/manufacturers/src/manufacturers.component';

@NgModule({
  declarations: [
    AppComponent,
    DepartamentsComponent,
    ManufacturersComponent,
    JobsComponent,
  ],
  imports: [
    BrowserModule,
    TreeViewModule,
    ButtonModule,
    TextBoxModule,
    DialogModule,
    SidebarModule,
    ButtonModule,
    GridModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
