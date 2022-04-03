import { Directive, Injector } from '@angular/core';
import { ButtonBase } from './button.directive';

@Directive({selector: '[buttonDelete]'})
export class ButtonDeleteDirective extends ButtonBase {

  constructor(injector: Injector) {
    super(injector);
    this.cssClass = 'e-danger';
    this.iconCss = 'e-icons e-close-large-2';
    this.content = 'Excluir';
  }

}
