import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BuyRequest, Inventory, SalesRequest } from '@module/models';
import { Observable } from 'rxjs';

const API_URL = '/api/estoque';

@Injectable({
  providedIn: 'root',
})
export class InventoryRepository {
  constructor(private httpCliente: HttpClient) {}

  addSalesRequest(salesRequest: SalesRequest): Observable<void> {
    return this.httpCliente.post<void>(`${API_URL}/sales`, salesRequest);
  }

  addRequestBuy(buyRequest: BuyRequest): Observable<void> {
    return this.httpCliente.post<void>(`${API_URL}/buy`, buyRequest);
  }

  findSalesRequestById(itemId: number): Observable<SalesRequest> {
    return this.httpCliente.get<SalesRequest>(`${API_URL}/sales/${itemId}`);
  }

  findBuyRequestById(itemId: number): Observable<BuyRequest> {
    return this.httpCliente.get<BuyRequest>(`${API_URL}/buy/${itemId}`);
  }

  updateSalesRequestById(salesRequest: SalesRequest): Observable<void> {
    return this.httpCliente.put<void>(
      `${API_URL}/sales/${salesRequest.itemId}`,
      salesRequest
    );
  }

  updateBuyRequestById(buyRequest: BuyRequest): Observable<void> {
    return this.httpCliente.put<void>(
      `${API_URL}/buy/${buyRequest.itemId}`,
      buyRequest
    );
  }

  deleteSalesRequestById(itemId: number): Observable<void> {
    return this.httpCliente.delete<void>(`${API_URL}/sales${itemId}`);
  }

  deleteBuyRequestById(itemId: number): Observable<void> {
    return this.httpCliente.delete<void>(`${API_URL}/buy${itemId}`);
  }

  findSalesRequest(): Observable<SalesRequest[]> {
    return this.httpCliente.get<SalesRequest[]>(`${API_URL}/sales`);
  }

  findBuyRequest(): Observable<BuyRequest[]> {
    return this.httpCliente.get<BuyRequest[]>(`${API_URL}/buy`);
  }

  findAll(): Observable<Inventory[]> {
    return this.httpCliente.get<Inventory[]>(`${API_URL}`);
  }

  deleteById(itemId: number): Observable<void> {
    return this.httpCliente.delete<void>(`${API_URL}/${itemId}`);
  }

}
