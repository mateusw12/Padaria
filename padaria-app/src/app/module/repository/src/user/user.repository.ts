import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@module/models';
import { AuthenticationService } from '@module/utils/services';
import { Observable } from 'rxjs';

const API_URL = '/api/cadastro/usuario';

@Injectable({
  providedIn: 'root',
})
export class UserRepository {
  constructor(
    private httpCliente: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  add(user: User): Observable<void> {
    return this.httpCliente.post<void>(API_URL, user);
  }

  findById(id: number): Observable<User> {
    return this.httpCliente.get<User>(`${API_URL}/${id}`);
  }

  findMe(): Observable<User> {
    const user = this.authenticationService.getUser() as string;
    return this.httpCliente.get<User>(`${API_URL}/me/${user}`);
  }

  findAll(): Observable<User[]> {
    return this.httpCliente.get<User[]>(`${API_URL}`);
  }

  updateById(user: User): Observable<void> {
    return this.httpCliente.put<void>(`${API_URL}/${user.id}`, user);
  }

  deleteById(id: number): Observable<void> {
    return this.httpCliente.delete<void>(`${API_URL}/${id}`);
  }
}
