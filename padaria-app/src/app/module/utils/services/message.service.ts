import { Injectable, OnDestroy } from '@angular/core';
import {
  AlertContent,
  AlertDialogComponent,
  ConfirmDialogComponent,
} from '@module/shared/src';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {
  ERROR_CSS_CLASS,
  ERROR_ICON,
  ERROR_TILE as ERROR_TITLE,
  INFO_CSS_CLASS,
  INFO_ICON,
  INFO_TILE,
  SUCCESS_CSS_CLASS,
  SUCCESS_ICON,
  SUCCESS_TILE,
  WARNING_CSS_CLASS,
  WARNING_ICON,
  WARNING_TILE,
} from '../constant/alert';

@Injectable({ providedIn: 'root' })
export class MessageService implements OnDestroy {
  constructor(
    private modalService: BsModalService,
    private nbgModal: NgbModal
  ) {}

  showConfirmDelete(): Promise<boolean> {
    const modalRef = this.nbgModal.open(ConfirmDialogComponent);
    modalRef.componentInstance.title = 'Você confirma a exclusão?';
    return modalRef.result;
  }

  showConfirmSave(): Promise<boolean> {
    const modalRef = this.nbgModal.open(ConfirmDialogComponent);
    modalRef.componentInstance.title = 'Você confirma a alteração?';
    return modalRef.result;
  }

  showConfirm(title?: string, message?: string): Promise<boolean> {
    const modalRef = this.nbgModal.open(ConfirmDialogComponent);
    modalRef.componentInstance.title =
      title || modalRef.componentInstance.title;
    modalRef.componentInstance.message =
      message || modalRef.componentInstance.message;
    return modalRef.result;
  }

  showWarningMessage(message?: string): void {
    const alertContent: AlertContent = {
      cssClass: WARNING_CSS_CLASS,
      iconCss: WARNING_ICON,
      message,
      title: WARNING_TILE,
    };
    this.showMessage(alertContent);
  }

  showInfoMessage(message?: string): void {
    const alertContent: AlertContent = {
      cssClass: INFO_CSS_CLASS,
      iconCss: INFO_ICON,
      message,
      title: INFO_TILE,
    };
    this.showMessage(alertContent);
  }

  showErrorMessage(message?: string): void {
    const alertContent: AlertContent = {
      cssClass: ERROR_CSS_CLASS,
      iconCss: ERROR_ICON,
      message,
      title: ERROR_TITLE,
    };
    this.showMessage(alertContent);
  }

  showSuccessMessage(message?: string): void {
    const alertContent: AlertContent = {
      cssClass: SUCCESS_CSS_CLASS,
      iconCss: SUCCESS_ICON,
      message,
      title: SUCCESS_TILE,
    };
    this.showMessage(alertContent);
  }

  ngOnDestroy(): void {}

  private showMessage(alertContent: AlertContent): void {
    const bsModalRef: BsModalRef = this.modalService.show(AlertDialogComponent);
    bsModalRef.content.alertContent = alertContent;
    bsModalRef.content.alertContent = alertContent;
  }
}
