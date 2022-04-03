import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonAppModule } from '@module/shared/src';
import { ReactiveFormsModule } from '@module/utils/forms';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import {
  DropDownListModule,
  MultiSelectModule
} from '@syncfusion/ej2-angular-dropdowns';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import {
  NumericTextBoxModule,
  TextBoxModule
} from '@syncfusion/ej2-angular-inputs';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';

@NgModule({
  declarations: [EmployeesComponent],
  imports: [
    CommonModule,
    GridModule,
    TextBoxModule,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    DropDownListModule,
    MultiSelectModule,
    DatePickerModule,
    NumericTextBoxModule,
    ButtonAppModule,
    EmployeesRoutingModule,
  ],
})
export class EmployeesModule {}
