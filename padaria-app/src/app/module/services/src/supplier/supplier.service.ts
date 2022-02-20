import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Injectable } from '@angular/core';
import { Supplier } from '@models/src';
import { Observable } from 'rxjs';

const supplier_Url = '/api/fornecedor';

@Injectable({
  providedIn: 'root',
})
export class SupplierService implements AfterViewInit {
  constructor(private httpCliente: HttpClient) {}
  ngAfterViewInit(): void {}

  add(supplier: Supplier): Observable<void> {
    return this.httpCliente.post<void>(supplier_Url, supplier);
  }

  findById(codigo: number): Observable<Supplier> {
    return this.httpCliente
      .get<Supplier>(`${supplier_Url}/${codigo}`)
      .pipe();
  }

  findAll(): Observable<Supplier[]> {
    return this.httpCliente.get<Supplier[]>(`${supplier_Url}`).pipe();
  }

  updateById(supplier: Supplier): Observable<void> {
    return this.httpCliente.put<void>(
      `${supplier_Url}/${supplier.id}`,
      supplier
    );
  }

  deleteById(id: number) {
    return this.httpCliente.delete(`${supplier_Url}/${id}`).pipe();
  }
}
