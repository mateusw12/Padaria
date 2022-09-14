import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductQuery, ProductQueryFilter } from '@module/models';
import { Observable } from 'rxjs';

const API_URL = '/api/product-query';

@Injectable({
  providedIn: 'root',
})
export class ProductQueryService {
  constructor(private httpCliente: HttpClient) {}

  find(filter?: ProductQueryFilter): Observable<ProductQuery[]> {
    return this.httpCliente.get<ProductQuery[]>(`${API_URL}`);
  }
}
