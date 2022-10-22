import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ButtonAppModule,
  FormGridModule,
  ModalModule,
  TextBoxModule
} from '@module/shared';
import { ReactiveFormsModule } from '@module/utils/forms';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { NoteTypesRoutingModule } from './note-types-routing.module';
import { NoteTypesComponent } from './note-types.component';

@NgModule({
  declarations: [NoteTypesComponent],
  imports: [
    CommonModule,
    TextBoxModule,
    ModalModule,
    ReactiveFormsModule,
    FormGridModule,
    ButtonModule,
    ButtonAppModule,
    NoteTypesRoutingModule,
  ],
})
export class NoteTypesModule {}
