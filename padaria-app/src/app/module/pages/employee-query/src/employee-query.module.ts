import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ButtonAppModule,
  DatePickerModule,
  FormGridModule,
  ModalModule,
  MultiSelectModule,
  TextBoxModule,
} from '@module/shared/src';
import { ReactiveFormsModule } from '@module/utils/forms';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { EmployeeQueryRoutingModule } from './employee-query-routing.module';
import { EmployeeQueryComponent } from './employee-query.component';
import { SearchEmployeeModalComponent } from './search-modal/search-modal.component';

@NgModule({
  declarations: [EmployeeQueryComponent, SearchEmployeeModalComponent],
  imports: [
    CommonModule,
    ModalModule,
    ButtonModule,
    DatePickerModule,
    TextBoxModule,
    MultiSelectModule,
    ButtonAppModule,
    ReactiveFormsModule,
    FormGridModule,
    EmployeeQueryRoutingModule,
  ],
})
export class EmployeeQueryModule {}
