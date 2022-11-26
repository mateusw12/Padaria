import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '@module/models';
import { LoginRepository } from '@module/repository';
import { AppRoutes, LOGIN_PATH } from '@module/routes';
import { untilDestroyed } from '@module/utils/common';
import { ErrorData } from '@module/utils/core';
import { markAllAsTouched } from '@module/utils/forms';
import {
  AuthenticationService,
  ErrorHandler,
  MessageService,
  ToastService
} from '@module/utils/services';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';

interface FormModel {
  userName: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  form = this.createForm();
  readonly login_route: AppRoutes = LOGIN_PATH;

  constructor(
    private errorHandler: ErrorHandler,
    private toastService: ToastService,
    private loginRepository: LoginRepository,
    private router: Router,
    private authenticationService: AuthenticationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.reset();
  }

  onLoginClick(): void {
    if (!this.form.valid) {
      markAllAsTouched(this.form);
      return;
    }
    const model = this.getModel();
    this.loginRepository
      .login(model)
      .pipe(untilDestroyed(this))
      .subscribe(
        (userToken) => {
          if (userToken) {
            this.toastService.showSuccess('Login efetuado com sucesso!');
            this.authenticationService.setUserToken(userToken);
            this.router.navigate([`/menu/home`]);
          }
        },
        (error) => {
          const errorHandler = error as ErrorData;

          if (errorHandler.toString()) {
            this.messageService.showErrorMessage('Acesso Negado!');
            return;
          }
          this.handleError(error);
        }
      );
  }

  ngOnDestroy(): void {}

  private getModel(): Login {
    const model = new Login();
    const formValue = this.form.getRawValue();
    model.userName = formValue.userName as string;
    model.password = formValue.password as string;
    return model;
  }

  private reset(): void {
    this.form.reset();
  }

  private handleError(error: unknown): void {
    this.errorHandler.present(error);
  }

  private createForm(): FormGroup<FormModel> {
    return new FormGroup<FormModel>({
      userName: new FormControl<string | null>(null, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      password: new FormControl<string | null>(null, [
        FormValidators.required,
        Validators.maxLength(200),
      ]),
    });
  }
}
