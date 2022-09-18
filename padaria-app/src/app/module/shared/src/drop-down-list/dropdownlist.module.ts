import { NgModule } from '@angular/core';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { DropDownListDirective } from './dropdownlist.directive';
import { DropDownListSearchDirective } from './dropdownlistsearch.directive';

@NgModule({
  imports: [
    DropDownListAllModule
  ],
  declarations: [
    DropDownListDirective,
    DropDownListSearchDirective
  ],
  exports: [
    DropDownListAllModule,
    DropDownListDirective,
    DropDownListSearchDirective
  ]
})
export class DropDownListModule { }
