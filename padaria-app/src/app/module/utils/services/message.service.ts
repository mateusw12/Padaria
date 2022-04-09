import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { ConfirmModalComponent } from '@module/shared/src/confirm-modal/confirm-modal.component';
import { DialogUtility } from '@syncfusion/ej2-popups';
import { ERROR_TITLE, SUCCESS_CONTENT, SUCCESS_CSS_CLASS, SUCCESS_TITLE, WARNING_TITLE } from '../constant';

@Injectable({
  providedIn: 'root',
  useClass: ConfirmModalComponent,
})
export class MessageService implements OnInit, OnDestroy {
  ngOnDestroy(): void {}

  async onShowSucess(message?: string): Promise<void> {
    const content = message ? message : SUCCESS_CONTENT;
    await this.onShow(content, SUCCESS_TITLE, SUCCESS_CSS_CLASS);
  }

  async onShowAlert(message?: string): Promise<void> {
    const content = message ? message : WARNING_TITLE;
    await this.onShow(content, WARNING_TITLE, SUCCESS_CSS_CLASS);
  }

  async onShowError(message?: string): Promise<void> {
    const content = message ? message : ERROR_TITLE;
    await this.onShow(content, ERROR_TITLE, SUCCESS_CSS_CLASS);
  }

  ngOnInit(): void {}

  private async onShow(
    content: string,
    title: string,
    cssClass: string
  ): Promise<void> {
    const DIALOG = DialogUtility.alert({
      content: content,
      cssClass: 'warning',
      position: { X: 'Center', Y: 'Center' },
      title: title,
    });
  }
}
