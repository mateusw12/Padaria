import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ButtonAppModule,
  DatePickerModule,
  DropDownListModule,
  FormGridModule,
  ModalModule,
  MultiSelectModule,
  NumericTextBoxModule,
  TextBoxModule
} from '@module/shared';
import { ReactiveFormsModule } from '@module/utils/forms';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
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
