import { Directive, Injector } from '@angular/core';
import { ButtonBase } from './button.directive';

@Directive({selector: '[buttonSave]'})
export class ButtonSaveDirective extends ButtonBase {

  constructor(injector: Injector) {
    super(injector);
    this.cssClass = 'e-success';
    this.iconCss = 'e-icons e-check';
    this.content = 'Salvar';
  }

}
