import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { NumericTextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { TextBoxBase } from '../text-box/textboxbase';

@Directive({
  selector: 'ejs-numerictextbox'
})
export class NumericTextBoxDirective extends TextBoxBase {

  constructor(
    component: NumericTextBoxComponent,
    elementRef: ElementRef<HTMLElement>,
    renderer: Renderer2) {
    super(elementRef, renderer);
    component.floatLabelType = 'Auto';
    component.showSpinButton = false;
  }

}
