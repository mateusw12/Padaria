import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnitMeasure } from '@module/models';
import { Observable } from 'rxjs';

const API_URL = '/api/cadastro/unidade-medida';

@Injectable({
  providedIn: 'root',
})
export class UnitMeasureRepository {
  constructor(private httpCliente: HttpClient) {}

  add(brand: UnitMeasure): Observable<void> {
    return this.httpCliente.post<void>(API_URL, brand);
  }

  findById(codigo: number): Observable<UnitMeasure> {
    return this.httpCliente.get<UnitMeasure>(`${API_URL}/${codigo}`);
  }

  findAll(): Observable<UnitMeasure[]> {
    return this.httpCliente.get<UnitMeasure[]>(`${API_URL}`);
  }

  updateById(unitMeasure: UnitMeasure): Observable<void> {
    return this.httpCliente.put<void>(
      `${API_URL}/${unitMeasure.id}`,
      unitMeasure
    );
  }

  deleteById(id: number): Observable<void> {
    return this.httpCliente.delete<void>(`${API_URL}/${id}`);
  }
}
