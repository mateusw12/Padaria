import { Injectable } from '@angular/core';
import {
  AlterDialogComponent,
  ConfirmDialogComponent,
} from '@module/shared/src';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageService {
  constructor(private modalService: BsModalService) {}

  showConfirmDelete(): Subject<boolean> {
    const bsModalRef: BsModalRef = this.modalService.show(
      ConfirmDialogComponent,
    );
    bsModalRef.content.title = 'Você confirma a exclusão?';
    return (<ConfirmDialogComponent>bsModalRef.content).confirmResult;
  }

  showConfirmSave(): Subject<boolean> {
    const bsModalRef: BsModalRef = this.modalService.show(
      ConfirmDialogComponent,
    );
    bsModalRef.content.title = 'Você confirma a alteração?';
    return (<ConfirmDialogComponent>bsModalRef.content).confirmResult;
  }

  showAlertMessage(): void {
    const bsModalRef: BsModalRef = this.modalService.show(AlterDialogComponent);
    bsModalRef.content.title = 'Você confirma a alteração?';
  }
}
