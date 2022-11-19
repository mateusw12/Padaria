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
import { BuyRequestComponent } from './buy-request/buy-request.component';
import { BuyRequestRegistrationModalComponent } from './inventory-control/buy-request-registration-modal/request-buy-registration-modal.component';
import { InventoryControlComponent } from './inventory-control/inventory-control.component';
import { SalesRequestRegistrationModalComponent } from './inventory-control/sales-request-registration-modal/sales-request-registration-modal.component';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';

@NgModule({
  declarations: [
    InventoryComponent,
    InventoryControlComponent,
    BuyRequestRegistrationModalComponent,
    SalesRequestRegistrationModalComponent,
    BuyRequestComponent
  ],
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
