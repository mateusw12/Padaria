import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ButtonAppModule,
  FormGridModule,
  ModalModule,
  TextBoxModule,
} from '@module/shared';
import { ReactiveFormsModule } from '@module/utils/forms';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from './jobs.component';

@NgModule({
  declarations: [JobsComponent],
  imports: [
    CommonModule,
    FormGridModule,
    TextBoxModule,
    ModalModule,
    ButtonModule,
    ButtonAppModule,
    ReactiveFormsModule,
    JobsRoutingModule,
  ],
})
export class JobsModule {}
