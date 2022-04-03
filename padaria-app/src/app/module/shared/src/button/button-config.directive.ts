import { Directive, Injector } from '@angular/core';
import { ButtonBase } from './button.directive';

@Directive({ selector: '[buttonConfig]' })
export class ButtonConfigDirective extends ButtonBase {
  constructor(injector: Injector) {
    super(injector);
    this.cssClass = 'e-search';
    this.iconCss = 'e-icons e-settings';
    this.content = 'Configurar';
  }
}


