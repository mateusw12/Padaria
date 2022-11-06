import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BuyRequest } from "@module/models";
import { Observable } from "rxjs";

const API_URL = '/api/estoque/compra';

@Injectable({ providedIn: 'root' })
export class BuyRequestRepository {
  constructor(private httpCliente: HttpClient) {}

  add(buyRequest: BuyRequest): Observable<void> {
    return this.httpCliente.post<void>(API_URL, buyRequest);
  }

  updateById(buyRequest: BuyRequest): Observable<void> {
    return this.httpCliente.put<void>(
      `${API_URL}/${buyRequest.itemId}`,
      buyRequest
    );
  }

  deleteById(itemId: number): Observable<void> {
    return this.httpCliente.delete<void>(`${API_URL}/${itemId}`);
  }

  findById(itemId: number): Observable<BuyRequest> {
    return this.httpCliente.get<BuyRequest>(`${API_URL}//${itemId}`);
  }

  findAll(): Observable<BuyRequest[]> {
    return this.httpCliente.get<BuyRequest[]>(API_URL);
  }

}
