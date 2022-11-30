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
import { TabAllModule } from '@syncfusion/ej2-angular-navigations';
import { HistoricSalesQueryComponent } from './historic-sales-control/historic-sales-query.component';
import { SearchModalComponent } from './historic-sales-control/search-modal/search-modal.component';
import { SalesControlRoutingModule } from './sales-control-routing.module';
import { SalesControlComponent } from './sales-control.component';
import { SalesControlService } from './sales-control.service';

@NgModule({
  declarations: [
    SalesControlComponent,
    HistoricSalesQueryComponent,
    SearchModalComponent,
  ],
  imports: [
    CommonModule,
    FormGridModule,
    TextBoxModule,
    NumericTextBoxModule,
    ReactiveFormsModule,
    ButtonModule,
    ButtonAppModule,
    DropDownListModule,
    MultiSelectModule,
    DatePickerModule,
    TabAllModule,
    ModalModule,
    SalesControlRoutingModule,
  ],
  providers: [SalesControlService],
})
export class SalesControlModule {}
