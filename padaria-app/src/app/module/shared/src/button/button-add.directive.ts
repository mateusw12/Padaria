import { Directive, Injector } from '@angular/core';
import { ButtonBase } from './button.directive';

@Directive({ selector: '[buttonAdd]' })
export class ButtonAddDirective extends ButtonBase {
  constructor(injector: Injector) {
    super(injector);
    this.cssClass = 'e-success';
    this.iconCss = 'e-icons e-plus-small';
    this.content = 'Adicionar';
  }
}
