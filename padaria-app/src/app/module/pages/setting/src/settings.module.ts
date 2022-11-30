import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonAppModule, TextBoxModule } from '@module/shared';
import { ReactiveFormsModule } from '@module/utils/forms';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { ColorPickerAllModule, UploaderAllModule } from '@syncfusion/ej2-angular-inputs';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    TextBoxModule,
    ReactiveFormsModule,
    ButtonModule,
    ButtonAppModule,
    ColorPickerAllModule,
    UploaderAllModule,
    SettingsRoutingModule,
  ],
})
export class SettingsModule {}
