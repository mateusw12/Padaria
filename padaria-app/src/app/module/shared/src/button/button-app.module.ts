import { NgModule } from '@angular/core';
import { ButtonAllModule } from '@syncfusion/ej2-angular-buttons';
import { ButtonAddDirective } from './button-add.directive';
import { ButtonCancelDirective } from './button-cancel.directive';
import { ButtonConfigDirective } from './button-config.directive';
import { ButtonDeleteDirective } from './button-delete.directive';
import { ButtonOkDirective } from './button-ok.directive';
import { ButtonResetDirective } from './button-reset.directive';
import { ButtonSaveDirective } from './button-save.directive';
import { ButtonSearchDirective } from './button-search.directive';
import { ButtonDirective } from './button.directive';
import { ThrottleClickDirective } from './throttle-click.directive';

@NgModule({
  imports: [ButtonAllModule],
  declarations: [
    ButtonAddDirective,
    ButtonCancelDirective,
    ButtonConfigDirective,
    ButtonDeleteDirective,
    ButtonResetDirective,
    ButtonSaveDirective,
    ButtonSearchDirective,
    ButtonDirective,
    ButtonOkDirective,
    ThrottleClickDirective,
  ],
  exports: [
    ButtonAddDirective,
    ButtonCancelDirective,
    ButtonConfigDirective,
    ButtonDeleteDirective,
    ButtonResetDirective,
    ButtonSaveDirective,
    ButtonSearchDirective,
    ButtonDirective,
    ButtonOkDirective,
    ThrottleClickDirective,
  ],
})
export class ButtonAppModule {}
