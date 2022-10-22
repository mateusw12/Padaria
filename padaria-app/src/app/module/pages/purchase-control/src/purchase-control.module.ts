import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ButtonAppModule,
  DatePickerModule,
  DropDownListModule,
  FormGridModule,
  ModalModule,
  NumericTextBoxModule,
  TextBoxModule,
} from '@module/shared';
import { ReactiveFormsModule } from '@module/utils/forms';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { PurchaseControlRoutingModule } from './purchase-control-routing.module';
import { PurchaseControlComponent } from './purchase-control.component';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';

@NgModule({
  declarations: [PurchaseControlComponent],
  imports: [
    CommonModule,
    FormGridModule,
    TextBoxModule,
    NumericTextBoxModule,
    ReactiveFormsModule,
    ModalModule,
    ButtonModule,
    ButtonAppModule,
    DropDownListModule,
    DatePickerModule,
    UploaderModule,
    PurchaseControlRoutingModule,
  ],
})
export class PurchaseControlModule {}
