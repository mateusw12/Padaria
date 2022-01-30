import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastUtility } from '@syncfusion/ej2-angular-notifications';

@Component({
  selector: 'app-toast-service',
  templateUrl: './toast-service.component.html',
})
export class ToastServiceComponent implements OnInit, OnDestroy {
  constructor() {}

  private toastObj: any;

  ngOnInit(): void {}

  async saveToast(message?: string): Promise<void> {
    this.toastObj = ToastUtility.show(
      message ? message : 'Salvo com sucesso!',
      'Success',
      1000
    );
  }

  async updateToast(message?: string): Promise<void> {
    this.toastObj = ToastUtility.show(
      message ? message : 'Alterado com sucesso!',
      'Success',
      1000
    );
  }

  async alertToast(message?: string): Promise<void> {
    this.toastObj = ToastUtility.show(
      message ? message : 'Erro ao realizar a tarefa!',
      'Warning',
      1000
    );
  }

  async removeToast(message?: string): Promise<void> {
    this.toastObj = ToastUtility.show(
      message ? message : 'Excluído com sucesso!',
      'Error',
      1000
    );
  }

  async errorToast(message?: string): Promise<void> {
    this.toastObj = ToastUtility.show(
      `Erro, ocorreu um problema ${message}`,
      'Error',
      1000
    );
  }

  ngOnDestroy(): void {}
}
