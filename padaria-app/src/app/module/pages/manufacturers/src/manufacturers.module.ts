import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonAppModule, FormGridModule } from '@module/shared/src';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ManufacturersRoutingModule } from './manufacturers-routing.module';
import { ManufacturersComponent } from './manufacturers.component';

@NgModule({
  declarations: [ManufacturersComponent],
  imports: [
    CommonModule,
    FormGridModule,
    TextBoxModule,
    DialogModule,
    ReactiveFormsModule,
    ButtonModule,
    ButtonAppModule,
    ManufacturersRoutingModule,
  ],
})
export class ManufacturersModule {}
