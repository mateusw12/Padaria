import { Directive, Injector } from '@angular/core';
import { ButtonBase } from './button.directive';

@Directive({ selector: '[buttonConfirm]' })
export class ButtonConfirmDirective extends ButtonBase {
  constructor(injector: Injector) {
    super(injector);
    this.cssClass = 'e-info';
    this.iconCss = 'e-icons e-check';
    this.content = 'Confirmar';
  }
}
