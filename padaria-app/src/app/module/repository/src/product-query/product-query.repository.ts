import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, ProductQueryFilter } from '@module/models';
import { Observable } from 'rxjs';

const API_URL = '/api/consulta/produto';

@Injectable({
  providedIn: 'root',
})
export class ProductQueryRepository {
  constructor(private httpCliente: HttpClient) {}

  find(filter?: ProductQueryFilter): Observable<Product[]> {
    return this.httpCliente.post<Product[]>(API_URL, filter);
  }
}
