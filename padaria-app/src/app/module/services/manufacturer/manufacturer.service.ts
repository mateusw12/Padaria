import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Manufacturer } from 'src/app/module/models';

const manufacturer_Url = '/api/manufacturer';

@Injectable({
  providedIn: 'root',
})
export class ManufacturerService implements AfterViewInit {
  constructor(private httpCliente: HttpClient) {}
  ngAfterViewInit(): void {}

  add(manufacturer: Manufacturer): Observable<void> {
    return this.httpCliente.post<void>(manufacturer_Url, manufacturer);
  }

  findById(codigo: number): Observable<Manufacturer> {
    return this.httpCliente
      .get<Manufacturer>(`${manufacturer_Url}/${codigo}`)
      .pipe();
  }

  findAll(): Observable<Manufacturer[]> {
    return this.httpCliente.get<Manufacturer[]>(`${manufacturer_Url}`).pipe();
  }

  updateById(manufacturer: Manufacturer): Observable<void> {
    return this.httpCliente.put<void>(
      `${manufacturer_Url}/${manufacturer.id}`,
      manufacturer
    );
  }

  deleteById(id: number) {
    return this.httpCliente.delete(`${manufacturer_Url}/${id}`).pipe();
  }
}
