import { Directive } from '@angular/core';
import { MaskedTextBoxComponent } from '@syncfusion/ej2-angular-inputs';

@Directive({
  selector: 'ejs-maskedtextbox'
})
export class MaskedTextBoxDirective {

  constructor(component: MaskedTextBoxComponent) {
    component.floatLabelType = 'Auto';
  }

}
