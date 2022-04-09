import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonAppModule, FormGridModule } from '@module/shared/src';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from './jobs.component';

@NgModule({
  declarations: [JobsComponent],
  imports: [
    CommonModule,
    FormGridModule,
    TextBoxModule,
    DialogModule,
    ButtonModule,
    ButtonAppModule,
    ReactiveFormsModule,
    JobsRoutingModule,
  ],
})
export class JobsModule {}
