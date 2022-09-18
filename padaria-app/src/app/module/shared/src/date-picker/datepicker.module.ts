import { NgModule } from '@angular/core';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { DatePickerDirective } from './datepicker.directive';

@NgModule({
  imports: [
    DatePickerAllModule
  ],
  declarations: [
    DatePickerDirective
  ],
  exports: [
    DatePickerAllModule,
    DatePickerDirective
  ]
})
export class DatePickerModule { }
