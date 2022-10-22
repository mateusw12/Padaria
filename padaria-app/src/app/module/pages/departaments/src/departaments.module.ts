import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ButtonAppModule,
  FormGridModule,
  ModalModule,
  TextBoxModule,
} from '@module/shared';
import { ReactiveFormsModule } from '@module/utils/forms';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DepartamentsRoutingModule } from './departaments-routing.module';
import { DepartamentsComponent } from './departaments.component';

@NgModule({
  declarations: [DepartamentsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextBoxModule,
    FormGridModule,
    ButtonAppModule,
    ButtonModule,
    ModalModule,
    DepartamentsRoutingModule,
  ],
})
export class DepartamentsModule {}
