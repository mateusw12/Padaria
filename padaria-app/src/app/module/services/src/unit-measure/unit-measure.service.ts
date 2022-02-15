import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnitMeasure } from 'src/app/module/models';

const unit_measure_url = '/api/unit-measure';

@Injectable({
  providedIn: 'root',
})
export class UnitMeasureService implements AfterViewInit {
  constructor(private httpCliente: HttpClient) {}
  ngAfterViewInit(): void {}

  add(brand: UnitMeasure): Observable<void> {
    return this.httpCliente.post<void>(unit_measure_url, brand);
  }

  findById(codigo: number): Observable<UnitMeasure> {
    return this.httpCliente.get<UnitMeasure>(`${unit_measure_url}/${codigo}`).pipe();
  }

  findAll(): Observable<UnitMeasure[]> {
    return this.httpCliente.get<UnitMeasure[]>(`${unit_measure_url}`).pipe();
  }

  updateById(brand: UnitMeasure): Observable<void> {
    return this.httpCliente.put<void>(`${unit_measure_url}/${brand.id}`, brand);
  }

  deleteById(id: number) {
    return this.httpCliente.delete(`${unit_measure_url}/${id}`).pipe();
  }
}
