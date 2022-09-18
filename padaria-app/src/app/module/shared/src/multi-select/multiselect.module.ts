import { NgModule } from '@angular/core';
import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { MultiSelectDirective } from './multiselect.directive';
import { MultiSelectSearchDirective } from './multiselectsearch.directive';

@NgModule({
  imports: [
    MultiSelectAllModule
  ],
  declarations: [
    MultiSelectDirective,
    MultiSelectSearchDirective
  ],
  exports: [
    MultiSelectAllModule,
    MultiSelectDirective,
    MultiSelectSearchDirective
  ]
})
export class MultiSelectModule { }
