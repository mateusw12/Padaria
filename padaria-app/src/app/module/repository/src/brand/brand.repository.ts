import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from '@module/models';
import { Observable } from 'rxjs';

const API_URL = '/api/cadastro/marca';

@Injectable({
  providedIn: 'root',
})
export class BrandRepository {
  constructor(private httpCliente: HttpClient) {}

  add(brand: Brand): Observable<void> {
    return this.httpCliente.post<void>(API_URL, brand);
  }

  findById(codigo: number): Observable<Brand> {
    return this.httpCliente.get<Brand>(`${API_URL}/${codigo}`);
  }

  findAll(): Observable<Brand[]> {
    return this.httpCliente.get<Brand[]>(`${API_URL}`);
  }

  updateById(brand: Brand): Observable<void> {
    return this.httpCliente.put<void>(`${API_URL}/${brand.id}`, brand);
  }

  deleteById(id: number): Observable<void> {
    return this.httpCliente.delete<void>(`${API_URL}/${id}`);
  }
}
