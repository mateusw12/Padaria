import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Manufacturer } from '@module/models';
import { Observable } from 'rxjs';

const API_URL = '/api/cadastro/fabricante';

@Injectable({
  providedIn: 'root',
})
export class ManufacturerRepository {
  constructor(private httpCliente: HttpClient) {}

  add(manufacturer: Manufacturer): Observable<void> {
    return this.httpCliente.post<void>(API_URL, manufacturer);
  }

  findById(codigo: number): Observable<Manufacturer> {
    return this.httpCliente.get<Manufacturer>(`${API_URL}/${codigo}`);
  }

  findAll(): Observable<Manufacturer[]> {
    return this.httpCliente.get<Manufacturer[]>(`${API_URL}`);
  }

  updateById(manufacturer: Manufacturer): Observable<void> {
    return this.httpCliente.put<void>(
      `${API_URL}/${manufacturer.id}`,
      manufacturer
    );
  }

  deleteById(id: number): Observable<void> {
    return this.httpCliente.delete<void>(`${API_URL}/${id}`);
  }
}
