import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Injectable } from '@angular/core';
import { Brand } from '@module/models';
import { Observable } from 'rxjs';

const API_URL = '/api/marca';

@Injectable({
  providedIn: 'root',
})
export class BrandService implements AfterViewInit {
  constructor(private httpCliente: HttpClient) {}
  ngAfterViewInit(): void {}

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

  deleteById(id: number) {
    return this.httpCliente.delete(`${API_URL}/${id}`);
  }
}
