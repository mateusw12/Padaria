import { Directive, Injector } from '@angular/core';
import { ButtonBase } from './button.directive';

@Directive({ selector: '[buttonCancel]' })
export class ButtonCancelDirective extends ButtonBase {
  constructor(injector: Injector) {
    super(injector);
    this.cssClass = 'e-danger';
    this.iconCss = 'e-icons e-close-large-2';
    this.content = 'Cancelar';
  }
}
