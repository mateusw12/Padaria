import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ManufacturersRoutingModule } from './manufacturers-routing.module';
import { ManufacturersComponent } from './manufacturers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@NgModule({
  declarations: [ManufacturersComponent],
  imports: [
    CommonModule,
    GridModule,
    TextBoxModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ManufacturersRoutingModule,
  ],
})
export class ManufacturersModule {}
