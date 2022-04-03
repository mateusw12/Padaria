import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonAppModule } from '@module/shared/src';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ManufacturersRoutingModule } from './manufacturers-routing.module';
import { ManufacturersComponent } from './manufacturers.component';

@NgModule({
  declarations: [ManufacturersComponent],
  imports: [
    CommonModule,
    GridModule,
    TextBoxModule,
    DialogModule,
    ReactiveFormsModule,
    ButtonModule,
    ButtonAppModule,
    ManufacturersRoutingModule,
  ],
})
export class ManufacturersModule {}
