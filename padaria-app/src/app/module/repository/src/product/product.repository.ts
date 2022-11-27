import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '@module/models';
import { Observable } from 'rxjs';

const API_URL = '/api/cadastro/produto';

@Injectable({
  providedIn: 'root',
})
export class ProductRepository {
  constructor(private httpCliente: HttpClient) {}

  add(product: Product): Observable<void> {
    return this.httpCliente.post<void>(API_URL, product);
  }

  findById(id: number): Observable<Product> {
    return this.httpCliente.get<Product>(`${API_URL}/${id}`);
  }

  findByBarCode(barCode: string): Observable<Product[]> {
    return this.httpCliente.post<Product[]>(`${API_URL}/bar-code`, barCode);
  }

  findAll(): Observable<Product[]> {
    return this.httpCliente.get<Product[]>(`${API_URL}`);
  }

  updateById(product: Product): Observable<void> {
    return this.httpCliente.put<void>(`${API_URL}/${product.id}`, product);
  }

  deleteById(id: number): Observable<void> {
    return this.httpCliente.delete<void>(`${API_URL}/${id}`);
  }
}
