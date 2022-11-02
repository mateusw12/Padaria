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
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { InventoryControlComponent } from './inventory-control/inventory-control.component';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';

@NgModule({
  declarations: [InventoryComponent, InventoryControlComponent],
  imports: [
    CommonModule,
    ModalModule,
    TextBoxModule,
    DropDownListModule,
    NumericTextBoxModule,
    FormGridModule,
    ButtonAppModule,
    ButtonModule,
    DatePickerModule,
    ReactiveFormsModule,
    TabModule,
    InventoryRoutingModule,
  ],
})
export class InventoryModule {}
