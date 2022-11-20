import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonAppModule, TextBoxModule } from '@module/shared';
import { ReactiveFormsModule } from '@module/utils/forms';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { LoginRoutingModule } from './license-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    TextBoxModule,
    ReactiveFormsModule,
    ButtonModule,
    CheckBoxModule,
    ButtonAppModule,
  ],
})
export class LoginModule {}
