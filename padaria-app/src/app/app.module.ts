import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DateTimePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import {
  MaskedTextBoxModule,
  TextBoxModule,
} from '@syncfusion/ej2-angular-inputs';
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
import { SuppliersComponent } from './module/pages/suppliers/src/suppliers.component';

@NgModule({
  declarations: [
    AppComponent,
    DepartamentsComponent,
    ManufacturersComponent,
    JobsComponent,
    SuppliersComponent,
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
    MaskedTextBoxModule,
    FormsModule,
    ReactiveFormsModule,
    DateTimePickerAllModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
