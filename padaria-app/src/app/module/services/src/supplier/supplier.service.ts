import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Injectable } from '@angular/core';
import { Supplier } from '@module/models';
import { Observable } from 'rxjs';

const API_URL = '/api/fornecedor';

@Injectable({
  providedIn: 'root',
})
export class SupplierService implements AfterViewInit {
  constructor(private httpCliente: HttpClient) {}
  ngAfterViewInit(): void {}

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
    return this.httpCliente.put<void>(
      `${API_URL}/${supplier.id}`,
      supplier
    );
  }

  deleteById(id: number) {
    return this.httpCliente.delete(`${API_URL}/${id}`);
  }
}
