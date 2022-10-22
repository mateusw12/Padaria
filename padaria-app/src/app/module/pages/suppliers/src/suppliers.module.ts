import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ButtonAppModule,
  FormGridModule,
  MaskedTextBoxModule,
  ModalModule,
  TextBoxModule
} from '@module/shared';
import { ReactiveFormsModule } from '@module/utils/forms';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SuppliersRoutingModule } from './suppliers-routing.module';
import { SuppliersComponent } from './suppliers.component';

@NgModule({
  declarations: [SuppliersComponent],
  imports: [
    CommonModule,
    TextBoxModule,
    FormGridModule,
    ReactiveFormsModule,
    MaskedTextBoxModule,
    ModalModule,
    ButtonModule,
    ButtonAppModule,
    SuppliersRoutingModule,
  ],
})
export class SuppliersModule {}
