import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import {
  ContextMenuModule,
  SidebarModule,
  TreeViewModule,
} from '@syncfusion/ej2-angular-navigations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartamentsComponent } from './module/pages/departaments/src/departaments.component';
import { EmployeesComponent } from './module/pages/employees/src/employees.component';
import { JobsComponent } from './module/pages/jobs/src/jobs.component';
import { ManufacturersComponent } from './module/pages/manufacturers/src/manufacturers.component';
import { ProductsComponent } from './module/pages/products/src/products.component';
import { SuppliersComponent } from './module/pages/suppliers/src/suppliers.component';

@NgModule({
  declarations: [
    AppComponent,
    DepartamentsComponent,
    SuppliersComponent,
    ProductsComponent,
    JobsComponent,
    ManufacturersComponent,
    EmployeesComponent,
  ],
  imports: [
    BrowserModule,
    ContextMenuModule,
    TreeViewModule,
    SidebarModule,
    GridModule,
    TextBoxModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
