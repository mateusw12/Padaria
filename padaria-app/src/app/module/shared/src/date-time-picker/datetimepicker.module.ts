import { NgModule } from '@angular/core';
import { DateTimePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { DateTimePickerDirective } from './datetimepicker.directive';

@NgModule({
  imports: [
    DateTimePickerAllModule
  ],
  declarations: [
    DateTimePickerDirective
  ],
  exports: [
    DateTimePickerAllModule,
    DateTimePickerDirective
  ]
})
export class DateTimePickerModule { }
