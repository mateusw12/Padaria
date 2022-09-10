import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormGridModule, ModalModule } from '@module/shared/src';
import { ButtonAppModule } from '@module/shared/src/button';
import { ReactiveFormsModule } from '@module/utils/forms';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
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
