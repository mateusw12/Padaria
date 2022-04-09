import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { GridModule } from '../grid/grid.module';
import { FormGridComponent } from './formgrid.component';
import { ButtonAppModule } from '@module/shared/src';

@NgModule({
  imports: [
  CommonModule,
    FlexLayoutModule,
    ButtonModule,
    GridModule,
    ButtonAppModule,
    TextBoxModule
  ],
  declarations: [FormGridComponent],
  exports: [FormGridComponent]
})
export class FormGridModule { }
