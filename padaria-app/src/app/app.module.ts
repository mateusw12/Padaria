import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import {
  SidebarModule,
  TabAllModule,
  TreeViewModule,
} from '@syncfusion/ej2-angular-navigations';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { FieldErrorDisplayComponent } from 'src/app/module/shared/field-erros/filed-errors.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartamentsComponent } from './module/pages/departaments/src/departaments.component';
import { JobsComponent } from './module/pages/jobs/src/jobs.component';
import { ManufacturersComponent } from './module/pages/manufacturers/src/manufacturers.component';
import { NoteTypesComponent } from './module/pages/note-types/src/note-types.component';
import { BrandComponent } from './module/pages/products/src/brand/brand.component';
import { ProductsComponent } from './module/pages/products/src/products.component';
import { SuppliersComponent } from './module/pages/suppliers/src/suppliers.component';

@NgModule({
  declarations: [
    AppComponent,
    DepartamentsComponent,
    ManufacturersComponent,
    JobsComponent,
    SuppliersComponent,
    NoteTypesComponent,
    FieldErrorDisplayComponent,
    ProductsComponent,
    BrandComponent,
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
    TabAllModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
