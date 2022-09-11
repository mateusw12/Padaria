import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { ButtonAppModule } from '../button';
import { AlertDialogComponent } from './alert-dialog.component';

@NgModule({
  imports: [CommonModule, ButtonModule, ButtonAppModule],
  declarations: [AlertDialogComponent],
  exports: [AlertDialogComponent],
  entryComponents: [AlertDialogComponent],
})
export class AlertDialogModule {}
