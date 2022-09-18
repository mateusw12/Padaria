import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ButtonAppModule,
  FormGridModule,
  ModalModule,
} from '@module/shared/src';
import { ReactiveFormsModule } from '@module/utils/forms';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { EmployeeQueryRoutingModule } from './employee-query-routing.module';
import { EmployeeQueryComponent } from './employee-query.component';
import { SearchEmployeeModalComponent } from './search-modal/search-modal.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

@NgModule({
  declarations: [EmployeeQueryComponent, SearchEmployeeModalComponent],
  imports: [
    CommonModule,
    ModalModule,
    MultiSelectModule,
    TextBoxModule,
    ButtonModule,
    ButtonAppModule,
    ReactiveFormsModule,
    DatePickerModule,
    FormGridModule,
    EmployeeQueryRoutingModule,
  ],
})
export class EmployeeQueryModule {}
