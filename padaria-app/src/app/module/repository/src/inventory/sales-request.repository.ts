import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SalesRequest } from '@module/models';
import { Observable } from 'rxjs';

const API_URL = '/api/estoque/compra';

@Injectable({ providedIn: 'root' })
export class SalesRequestRepository {
  constructor(private httpCliente: HttpClient) {}

  add(salesRequest: SalesRequest): Observable<void> {
    return this.httpCliente.post<void>(API_URL, salesRequest);
  }

  findById(itemId: number): Observable<SalesRequest> {
    return this.httpCliente.get<SalesRequest>(`${API_URL}/${itemId}`);
  }

  update(salesRequest: SalesRequest): Observable<void> {
    return this.httpCliente.put<void>(
      `${API_URL}/${salesRequest.itemId}`,
      salesRequest
    );
  }

  deleteById(itemId: number): Observable<void> {
    return this.httpCliente.delete<void>(`${API_URL}${itemId}`);
  }

  findAll(): Observable<SalesRequest[]> {
    return this.httpCliente.get<SalesRequest[]>(API_URL);
  }
}
