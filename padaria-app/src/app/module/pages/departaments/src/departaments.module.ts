import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGridModule } from '@module/shared/src';
import { ButtonAppModule } from '@module/shared/src/button';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { DepartamentsRoutingModule } from './departaments-routing.module';
import { DepartamentsComponent } from './departaments.component';

@NgModule({
  declarations: [DepartamentsComponent],
  imports: [
  CommonModule,
    ReactiveFormsModule,
    TextBoxModule,
    DialogModule,
    FormGridModule,
    ButtonAppModule,
    ButtonModule,
    DepartamentsRoutingModule,
  ],
})
export class DepartamentsModule {}
