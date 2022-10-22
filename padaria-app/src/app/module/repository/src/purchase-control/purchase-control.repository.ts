import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PurchaseControl } from '@module/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = '/api/controle-compras';

@Injectable({
  providedIn: 'root',
})
export class PurchaseControlRepository {
  constructor(private httpCliente: HttpClient) {}

  add(purchaseControl: PurchaseControl): Observable<void> {
    return this.httpCliente.post<void>(API_URL, purchaseControl);
  }

  findById(id: number): Observable<PurchaseControl> {
    return this.httpCliente.get<PurchaseControl>(`${API_URL}/${id}`);
  }

  findAll(): Observable<PurchaseControl[]> {
    return this.httpCliente.get<PurchaseControl[]>(`${API_URL}`);
  }

  updateById(purchaseControl: PurchaseControl): Observable<void> {
    return this.httpCliente.put<void>(
      `${API_URL}/${purchaseControl.id}`,
      purchaseControl
    );
  }

  deleteById(id: number): Observable<void> {
    return this.httpCliente.delete<void>(`${API_URL}/${id}`);
  }

  findFile(id: number): Observable<string> {
    return this.httpCliente
      .get(`${API_URL}/${id}/file`)
      .pipe(map(String));
  }

}
