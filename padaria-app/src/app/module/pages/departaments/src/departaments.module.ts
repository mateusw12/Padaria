import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from '@module/shared/src';
import { ButtonAppModule } from '@module/shared/src/button';
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
    ModalModule,
    ReactiveFormsModule,
    TextBoxModule,
    DialogModule,
    GridModule,
    ButtonAppModule,
    ButtonModule,
    DepartamentsRoutingModule,
  ],
})
export class DepartamentsModule {}
