import { NgModule } from '@angular/core';
import { MaskedTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { MaskedTextBoxDirective } from './maskedtextbox.directive';

@NgModule({
  imports: [
    MaskedTextBoxAllModule
  ],
  declarations: [
    MaskedTextBoxDirective
  ],
  exports: [
    MaskedTextBoxAllModule,
    MaskedTextBoxDirective
  ]
})
export class MaskedTextBoxModule { }
