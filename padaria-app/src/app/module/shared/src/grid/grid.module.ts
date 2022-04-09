import { NgModule } from '@angular/core';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { GridDirective } from './grid.directive';

@NgModule({
  imports: [
    GridAllModule
  ],
  declarations: [
    GridDirective
  ],
  exports: [
    GridAllModule,
    GridDirective
  ]
})
export class GridModule { }
