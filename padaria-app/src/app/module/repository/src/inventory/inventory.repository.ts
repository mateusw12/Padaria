import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inventory } from '@module/models';
import { Observable } from 'rxjs';

const API_URL = '/api/estoque';

@Injectable({
  providedIn: 'root',
})
export class InventoryRepository {
  constructor(private httpCliente: HttpClient) {}

  add(inventory: Inventory): Observable<void> {
    return this.httpCliente.post<void>(API_URL, inventory);
  }

  findAll(): Observable<Inventory[]> {
    return this.httpCliente.get<Inventory[]>(`${API_URL}`);
  }

  deleteById(itemId: number): Observable<void> {
    return this.httpCliente.delete<void>(`${API_URL}/${itemId}`);
  }
}
