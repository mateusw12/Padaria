import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Supplier } from '@module/models';
import { Observable } from 'rxjs';

const API_URL = '/api/cadastro/fornecedor';

@Injectable({
  providedIn: 'root',
})
export class SupplierRepository {
  constructor(private httpCliente: HttpClient) {}

  add(supplier: Supplier): Observable<void> {
    return this.httpCliente.post<void>(API_URL, supplier);
  }

  findById(codigo: number): Observable<Supplier> {
    return this.httpCliente.get<Supplier>(`${API_URL}/${codigo}`);
  }

  findAll(): Observable<Supplier[]> {
    return this.httpCliente.get<Supplier[]>(`${API_URL}`);
  }

  updateById(supplier: Supplier): Observable<void> {
    return this.httpCliente.put<void>(`${API_URL}/${supplier.id}`, supplier);
  }

  deleteById(id: number): Observable<void> {
    return this.httpCliente.delete<void>(`${API_URL}/${id}`);
  }
}
