import { Component, ErrorHandler, OnDestroy, OnInit } from '@angular/core';
import { content } from '@syncfusion/ej2-angular-grids';
import { ToastUtility } from '@syncfusion/ej2-angular-notifications';

@Component({
  selector: 'app-toast-service',
  templateUrl: './toast-service.component.html',
})
export class ToastServiceComponent implements OnInit, OnDestroy {
  constructor() {}

  private toastObj: any;

  ngOnInit(): void {}

  async showSucess(message?: string): Promise<void> {
    this.toastObj = ToastUtility.show(
      message ? message : 'Salvo com sucesso!',
      'Success',
      1000
    );
  }

  async showUpdate(message?: string): Promise<void> {
    this.toastObj = ToastUtility.show(
      message ? message : 'Alterado com sucesso!',
      'Success',
      1000
    );
  }

  async showAlert(message?: string): Promise<void> {
    this.toastObj = ToastUtility.show(
      message ? message : 'Erro ao realizar a tarefa!',
      'Warning',
      1000
    );
  }

  async showRemove(message?: string): Promise<void> {
    this.toastObj = ToastUtility.show(
      message ? message : 'Excluído com sucesso!',
      'Success',
      1000
    );
  }

  async showError(message?: string): Promise<void> {
    this.toastObj = ToastUtility.show(
      message ? message : 'Opss, ocorreu um problema',

      'Error',
      1000
    );
  }

  ngOnDestroy(): void {}
}
