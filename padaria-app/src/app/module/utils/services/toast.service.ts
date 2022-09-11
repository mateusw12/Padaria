import { Injectable, OnDestroy } from '@angular/core';
import { ButtonModelPropsModel } from '@syncfusion/ej2-angular-notifications';
import { ToastUtility } from '@syncfusion/ej2-notifications';
import {
  ERROR_CONTENT,
  ERROR_CSS_CLASS,
  ERROR_TITLE,
  INFO_CSS_CLASS,
  INFO_TITLE,
  REMOVE_CONTENT,
  SUCCESS_CONTENT,
  SUCCESS_CSS_CLASS,
  SUCCESS_TITLE,
  UPDATE_CONTENT,
  WARNING_CSS_CLASS,
  WARNING_TITLE
} from '../constant/dialog';

@Injectable({
  providedIn: 'root',
})
export class ToastService implements OnDestroy {
  async showSuccess(message?: string): Promise<void> {
    const MESSAGE_CONTENT = message ? message : SUCCESS_CONTENT;
    await this.showToast(SUCCESS_TITLE, SUCCESS_CSS_CLASS, MESSAGE_CONTENT);
  }

  async showRemove(content?: string): Promise<void> {
    const MESSAGE_CONTENT = content ? content : REMOVE_CONTENT;
    await this.showToast(SUCCESS_TITLE, SUCCESS_CSS_CLASS, MESSAGE_CONTENT);
  }

  async showUpdate(content?: string): Promise<void> {
    const MESSAGE_CONTENT = content ? content : UPDATE_CONTENT;
    await this.showToast(SUCCESS_TITLE, SUCCESS_CSS_CLASS, MESSAGE_CONTENT);
  }

  async showWarning(content?: string, timeOut?: number): Promise<void> {
    const MESSAGE_CONTENT = content ? content : '';
    const TIME_OUT = timeOut ? timeOut : 1000;
    await this.showToast(
      WARNING_TITLE,
      WARNING_CSS_CLASS,
      MESSAGE_CONTENT,
      TIME_OUT
    );
  }

  async showError(content?: string, timeOut?: number): Promise<void> {
    const MESSAGE_CONTENT = ERROR_CONTENT + content;
    const TIME_OUT = timeOut ? timeOut : 1000;
    await this.showToast(
      ERROR_TITLE,
      ERROR_CSS_CLASS,
      MESSAGE_CONTENT,
      TIME_OUT
    );
  }

  async showInfo(
    title?: string,
    message?: string,
    timeOut?: number,
    width?: number,
    buttons?: ButtonModelPropsModel[]
  ): Promise<void> {
    const MESSAGE_CONTENT = message ? message : '';
    const TIME_OUT = timeOut ? timeOut : 1000;
    const TITLE = title ? title : INFO_TITLE;
    const BUTTONS = buttons ? buttons : undefined;
    const WIDTH = width ? width : undefined;

    await this.showToast(
      TITLE,
      INFO_CSS_CLASS,
      MESSAGE_CONTENT,
      TIME_OUT,
      WIDTH,
      BUTTONS
    );
  }

  ngOnDestroy(): void {}

  private async showToast(
    title: string,
    cssClass: string,
    content: string,
    timeOut?: number,
    width?: number,
    buttons?: ButtonModelPropsModel[]
  ): Promise<void> {
    const TOAST = ToastUtility.show({
      title: title,
      content: content,
      timeOut: timeOut ? timeOut : 1000,
      cssClass: cssClass,
      position: { X: 'Right', Y: 'Top' },
      showCloseButton: true,
      width: width ? width : 300,
      buttons: buttons ? buttons : undefined,
    });
  }
}
