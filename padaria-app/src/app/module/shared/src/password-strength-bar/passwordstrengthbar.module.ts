import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PasswordStrengthBarComponent } from './passwordstrengthbar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PasswordStrengthBarComponent],
  exports: [PasswordStrengthBarComponent]
})
export class PasswordStrengthBarModule { }
