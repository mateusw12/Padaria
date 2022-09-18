import { NgModule } from '@angular/core';
import { TextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { TextBoxDirective } from './textbox.directive';

@NgModule({
  imports: [
    TextBoxAllModule
  ],
  declarations: [
    TextBoxDirective
  ],
  exports: [
    TextBoxAllModule,
    TextBoxDirective
  ]
})
export class TextBoxModule { }
