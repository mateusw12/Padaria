import { Injectable } from '@angular/core';
import { UserToken } from '@module/models';
import { LocalStorageService } from '@module/utils/services';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private userToken: UserToken = new UserToken();

  constructor(private localStorageService: LocalStorageService) {}

  setUserToken(userToken: UserToken): void {
    this.userToken = userToken;
    this.localStorageService.setItem(userToken.user, userToken.token);
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
}
