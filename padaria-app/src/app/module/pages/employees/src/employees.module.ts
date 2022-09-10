import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ButtonAppModule,
  FormGridModule,
  ModalModule,
} from '@module/shared/src';
import { ReactiveFormsModule } from '@module/utils/forms';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import {
  DropDownListModule,
  MultiSelectModule,
} from '@syncfusion/ej2-angular-dropdowns';
import {
  NumericTextBoxModule,
  TextBoxModule,
} from '@syncfusion/ej2-angular-inputs';
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';

@NgModule({
  declarations: [EmployeesComponent],
  imports: [
    CommonModule,
    FormGridModule,
    TextBoxModule,
    ButtonModule,
    ReactiveFormsModule,
    DropDownListModule,
    MultiSelectModule,
    DatePickerModule,
    ModalModule,
    NumericTextBoxModule,
    ButtonAppModule,
    EmployeesRoutingModule,
  ],
})
export class EmployeesModule {}
