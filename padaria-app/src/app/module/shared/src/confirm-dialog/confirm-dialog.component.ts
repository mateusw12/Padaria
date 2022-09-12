import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  selector: 'app-confirm-modal',
})
export class ConfirmDialogComponent implements OnInit {
  @Input()
  title: string = '';

  confirmResult!: Subject<boolean>;

  constructor(public bsModalRef: BsModalRef) {}

  onConfirmClick(): void {
    this.confirmAndClose(true);
  }

  onClose(): void {
    this.confirmAndClose(false);
  }

  ngOnInit() {
    this.confirmResult = new Subject();
  }

  private confirmAndClose(confirm: boolean): void {
    this.confirmResult.next(confirm);
    this.bsModalRef.hide();
  }
}
