import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Setting } from '@module/models';
import { Observable } from 'rxjs';

const API_URL = '/api/configuracao';

@Injectable({ providedIn: 'root' })
export class SettingRepository {
  constructor(private httpCliente: HttpClient) {}

  add(setting: Setting): Observable<void> {
    return this.httpCliente.post<void>(API_URL, setting);
  }

  find(): Observable<Setting> {
    return this.httpCliente.get<Setting>(API_URL);
  }

  deleteById(id: number): Observable<void> {
    return this.httpCliente.delete<void>(`${API_URL}/${id}`);
  }
}
