import { Directive, Injector } from '@angular/core';
import { ButtonBase } from './button.directive';

@Directive({ selector: '[buttonSearch]' })
export class ButtonSearchDirective extends ButtonBase {
  constructor(injector: Injector) {
    super(injector);
    this.cssClass = 'e-info';
    this.iconCss = 'e-icons e-search';
    this.content = 'Consultar';
  }
}
