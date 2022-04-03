import { NgModule } from '@angular/core';
import { ButtonAllModule } from '@syncfusion/ej2-angular-buttons';
import { ButtonAddDirective } from './button-add.directive';
import { ButtonCancelDirective } from './button-cancel.directive';
import { ButtonConfigDirective } from './button-config.directive';
import { ButtonDeleteDirective } from './button-delete.directive';
import { ButtonResetDirective } from './button-reset.directive';
import { ButtonSaveDirective } from './button-save.directive';
import { ButtonSearchDirective } from './button-search.directive';
import { ButtonDirective } from './button.directive';


@NgModule({
  imports: [
    ButtonAllModule
  ],
  declarations: [
    ButtonAddDirective,
    ButtonCancelDirective,
    ButtonConfigDirective,
    ButtonDeleteDirective,
    ButtonResetDirective,
    ButtonSaveDirective,
    ButtonSearchDirective,
    ButtonDirective
  ],
  exports: [
    ButtonAddDirective,
    ButtonCancelDirective,
    ButtonConfigDirective,
    ButtonDeleteDirective,
    ButtonResetDirective,
    ButtonSaveDirective,
    ButtonSearchDirective,
    ButtonDirective
  ]
})
export class ButtonAppModule { }
