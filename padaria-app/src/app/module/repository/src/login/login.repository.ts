import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, UserToken } from '@module/models';
import { Observable } from 'rxjs';

const API_URL = 'api/login';

@Injectable({ providedIn: 'root' })
export class LoginRepository {
  constructor(private httpCliente: HttpClient) {}

  login(login: Login): Observable<UserToken> {
    return this.httpCliente.post<UserToken>(API_URL, login);
  }

}
