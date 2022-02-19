import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { DepartamentsRoutingModule } from './departaments-routing.module';
import { DepartamentsComponent } from './departaments.component';

@NgModule({
  declarations: [DepartamentsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TextBoxModule,
    DialogModule,
    GridModule,
    ButtonModule,
    DepartamentsRoutingModule,
  ],
})
export class DepartamentsModule {}
