import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { ButtonOptions } from './confirm-dialog-interface';

@Component({
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  selector: 'app-confirm-modal',
})
export class ConfirmDialogComponent implements OnInit {
  @Input()
  title: string = '';

  @Input()
  buttonOptions: ButtonOptions = {
    closeContent: 'Não',
    confirmContent: 'Sim',
    closeCssClass: 'danger',
    confirmCssClass: 'success',
  };

  confirmResult!: Subject<boolean>;
  confirmResult1!: Promise<boolean>;

  constructor(public bsModalRef: BsModalRef) {}

  onConfirmClick(): void {
    this.confirmAndClose(true);
  }

  onClose(): void {
    this.confirmAndClose(false);
  }

  ngOnInit() {}

  private confirmAndClose(confirm: boolean): void {
    console.log('confirmAndClose', confirm);
    this.confirmResult1 = Promise.resolve(confirm);
    this.bsModalRef.hide();
  }
}
