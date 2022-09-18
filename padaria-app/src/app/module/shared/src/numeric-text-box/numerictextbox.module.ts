import { NgModule } from '@angular/core';
import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { NumericTextBoxDirective } from './numerictextbox.directive';

@NgModule({
  imports: [
    NumericTextBoxAllModule
  ],
  declarations: [
    NumericTextBoxDirective
  ],
  exports: [
    NumericTextBoxAllModule,
    NumericTextBoxDirective
  ]
})
export class NumericTextBoxModule { }
