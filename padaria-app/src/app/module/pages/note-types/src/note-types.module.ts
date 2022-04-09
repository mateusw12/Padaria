import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonAppModule, FormGridModule } from '@module/shared/src';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { NoteTypesRoutingModule } from './note-types-routing.module';
import { NoteTypesComponent } from './note-types.component';

@NgModule({
  declarations: [NoteTypesComponent],
  imports: [
    CommonModule,
    TextBoxModule,
    DialogModule,
    FormGridModule,
    ButtonModule,
    ReactiveFormsModule,
    ButtonAppModule,
    NoteTypesRoutingModule,
  ],
})
export class NoteTypesModule {}
