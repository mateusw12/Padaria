import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonAppModule, FormGridModule } from '@module/shared/src';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { SuppliersRoutingModule } from './suppliers-routing.module';
import { SuppliersComponent } from './suppliers.component';

@NgModule({
  declarations: [SuppliersComponent],
  imports: [
    CommonModule,
    TextBoxModule,
    FormGridModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    ButtonAppModule,
    SuppliersRoutingModule,
  ],
})
export class SuppliersModule {}
