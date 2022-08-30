import { NgModule } from '@angular/core';
import { ModalComponent } from './modal.component';
import { CommonModule } from '@angular/common';
import { ModalGuardService } from './modal.service';
import { ButtonAppModule } from '../button';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@NgModule({
  declarations: [ModalComponent],
  imports: [CommonModule, ButtonAppModule, ButtonModule],
  exports: [ModalComponent],
  providers: [ModalGuardService],
})
export class ModalModule {}
