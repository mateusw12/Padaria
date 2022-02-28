import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Injectable } from '@angular/core';
import { Product } from '@module/models';
import { Observable } from 'rxjs';

const API_URL = '/api/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService implements AfterViewInit {

  constructor(private httpCliente: HttpClient) {}
  ngAfterViewInit(): void {}

  add(product: Product): Observable<void> {
    return this.httpCliente.post<void>(API_URL, product);
  }

  findById(codigo: number): Observable<Product> {
    return this.httpCliente.get<Product>(`${API_URL}/${codigo}`);
  }

  findAll(): Observable<Product[]> {
    return this.httpCliente.get<Product[]>(`${API_URL}`);
  }

  updateById(product: Product): Observable<void> {
    return this.httpCliente.put<void>(`${API_URL}/${product.id}`, product);
  }

  deleteById(id: number) {
    return this.httpCliente.delete(`${API_URL}/${id}`);
  }
}
