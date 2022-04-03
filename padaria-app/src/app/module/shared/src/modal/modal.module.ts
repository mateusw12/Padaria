import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalComponent } from './modal.component';
import { ModalModule as NgxBootstrapModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [CommonModule, NgxBootstrapModalModule],
  declarations: [ModalComponent],
  exports: [ModalComponent],
})
export class ModalModule {}
