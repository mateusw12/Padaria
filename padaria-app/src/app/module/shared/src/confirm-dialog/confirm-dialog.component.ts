import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  selector: 'app-confirm-modal',
})
export class ConfirmDialogComponent {
  @Input() title: string = 'Confirmação';
  @Input() message: string = '';

  constructor(public modal: NgbActiveModal) {}
}
