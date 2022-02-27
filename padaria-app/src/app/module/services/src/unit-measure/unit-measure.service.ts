import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Injectable } from '@angular/core';
import { UnitMeasure } from '@module/models';
import { Observable } from 'rxjs';

const API_URL = '/api/unit-measure';

@Injectable({
  providedIn: 'root',
})
export class UnitMeasureService implements AfterViewInit {
  constructor(private httpCliente: HttpClient) {}
  ngAfterViewInit(): void {}

  add(brand: UnitMeasure): Observable<void> {
    return this.httpCliente.post<void>(API_URL, brand);
  }

  findById(codigo: number): Observable<UnitMeasure> {
    return this.httpCliente.get<UnitMeasure>(`${API_URL}/${codigo}`);
  }

  findAll(): Observable<UnitMeasure[]> {
    return this.httpCliente.get<UnitMeasure[]>(`${API_URL}`);
  }

  updateById(brand: UnitMeasure): Observable<void> {
    return this.httpCliente.put<void>(`${API_URL}/${brand.id}`, brand);
  }

  deleteById(id: number) {
    return this.httpCliente.delete(`${API_URL}/${id}`);
  }
}
