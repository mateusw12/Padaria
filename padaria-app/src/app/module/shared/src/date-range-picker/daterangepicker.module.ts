import { NgModule } from '@angular/core';
import { DateRangePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { DateRangePickerDirective } from './daterangepicker.directive';

@NgModule({
  imports: [
    DateRangePickerAllModule
  ],
  declarations: [
    DateRangePickerDirective
  ],
  exports: [
    DateRangePickerAllModule,
    DateRangePickerDirective
  ]
})
export class DateRangePickerModule { }
