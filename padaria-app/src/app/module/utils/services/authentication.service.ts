import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserToken } from '@module/models';
import { untilDestroyed } from '@module/utils/common';
import * as moment from 'moment';
import { Subscription, timer } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ErrorHandler } from './error-handler.service';
import { LocalStorageService } from './local-storage.service';

const REFRESH_INTERVAL_STATUS = 30000; // 30  segundos

@Injectable({ providedIn: 'root' })
export class AuthenticationService implements OnDestroy {
  private userToken: UserToken = new UserToken();
  private interval$: Subscription = new Subscription();

  constructor(
    private localStorageService: LocalStorageService,
    private errorHandler: ErrorHandler,
    private router: Router
  ) {}

  setUserToken(userToken: UserToken): void {
    this.userToken = userToken;
    this.localStorageService.setItem(userToken.userName, userToken.token);
  }

  getUserToken(): UserToken {
    return this.userToken;
  }

  removeUserToken(key: string): void {
    this.localStorageService.removeItem(key);
  }

  clearUserToken(): void {
    this.localStorageService.clear();
  }

  validateUserToken(): void {
    this.interval$ = timer(0, REFRESH_INTERVAL_STATUS)
      .pipe(
        tap(async () => {
          const today = new Date();
          const result = moment(today).diff(this.userToken.expirationDate);
          if (result <= 0) {
            this.interval$.unsubscribe();
            this.navigateToLogin();
            return;
          }
        }),
        untilDestroyed(this)
      )
      .subscribe(
        (timeout) => {
          if (timeout <= 0) {
            this.interval$.unsubscribe();
            this.navigateToLogin();
            return;
          }
        },
        (error) => this.handleError(error)
      );
  }

  ngOnDestroy(): void {}

  private navigateToLogin(): void {
    this.router.navigate([`/login`]);
  }

  private handleError(error: unknown): void {
    this.errorHandler.present(error);
  }
}
