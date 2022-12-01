import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SalesControl, SalesControlFiter } from '@module/models';
import { Observable } from 'rxjs';

const API_URL = '/api/controle-venda';

@Injectable({ providedIn: 'root' })
export class SalesControlRepository {
  constructor(private httpCliente: HttpClient) {}

  add(salesControls: SalesControl[]): Observable<void> {
    return this.httpCliente.post<void>(API_URL, salesControls);
  }

  findById(id: number): Observable<SalesControl> {
    return this.httpCliente.get<SalesControl>(`${API_URL}/${id}`);
  }

  find(salesControlFilter?: SalesControlFiter): Observable<SalesControl[]> {
    return this.httpCliente.post<SalesControl[]>(
      `${API_URL}/filter`,
      salesControlFilter
    );
  }

  deleteById(id: number): Observable<void> {
    return this.httpCliente.delete<void>(`${API_URL}/${id}`);
  }
}
