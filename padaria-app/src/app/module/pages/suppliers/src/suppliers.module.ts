import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonAppModule, FormGridModule, ModalModule } from '@module/shared/src';
import { ReactiveFormsModule } from '@module/utils/forms';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { MaskedTextBoxModule, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
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
    SuppliersRoutingModule
  ],
})
export class SuppliersModule {}
