import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertContent } from './alert-content-interface';

@Component({
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss'],
  selector: 'app-alert-modal',
})
export class AlertDialogComponent implements OnInit {
  @Input()
  alertContent: AlertContent = {
    title: '',
    iconCss: '',
    cssClass: '',
    message: '',
  };

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {}

  onCloseClick(): void {
    this.bsModalRef.hide();
  }
}
