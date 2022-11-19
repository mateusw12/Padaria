import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ButtonAppModule,
  DropDownListModule,
  FormGridModule,
  MaskedTextBoxModule,
  ModalModule,
  PasswordStrengthBarModule,
  TextBoxModule,
} from '@module/shared';
import { ReactiveFormsModule } from '@module/utils/forms';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    TextBoxModule,
    FormGridModule,
    ReactiveFormsModule,
    MaskedTextBoxModule,
    ModalModule,
    ButtonModule,
    ButtonAppModule,
    DropDownListModule,
    CheckBoxModule,
    UserRoutingModule,
    PasswordStrengthBarModule,
  ],
})
export class UserModule {}
