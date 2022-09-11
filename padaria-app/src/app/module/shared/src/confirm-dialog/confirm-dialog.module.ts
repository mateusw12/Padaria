import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { ButtonAppModule } from '../button';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@NgModule({
  imports: [CommonModule, ButtonModule, ButtonAppModule],
  declarations: [ConfirmDialogComponent],
  exports: [ConfirmDialogComponent],
  entryComponents: [ConfirmDialogComponent],
})
export class ConfirmDialogModule {}
