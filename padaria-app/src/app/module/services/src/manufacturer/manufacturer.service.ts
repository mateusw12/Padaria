import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Injectable } from '@angular/core';
import { Manufacturer } from '@module/models';
import { Observable } from 'rxjs';

const API_URL = '/api/fabricante';

@Injectable({
  providedIn: 'root',
})
export class ManufacturerService implements AfterViewInit {
  constructor(private httpCliente: HttpClient) {}
  ngAfterViewInit(): void {}

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

  deleteById(id: number) {
    return this.httpCliente.delete(`${API_URL}/${id}`);
  }
}
