import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ButtonAppModule,
  FormGridModule,
  ModalModule,
} from '@module/shared/src';
import { ReactiveFormsModule } from '@module/utils/forms';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ManufacturersRoutingModule } from './manufacturers-routing.module';
import { ManufacturersComponent } from './manufacturers.component';

@NgModule({
  declarations: [ManufacturersComponent],
  imports: [
    CommonModule,
    FormGridModule,
    TextBoxModule,
    ModalModule,
    ReactiveFormsModule,
    ButtonModule,
    ButtonAppModule,
    ManufacturersRoutingModule
  ],
})
export class ManufacturersModule {}
