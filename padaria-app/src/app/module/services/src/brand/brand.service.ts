import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/module/models';

const brand_Url = '/api/marca';

@Injectable({
  providedIn: 'root',
})
export class BrandService implements AfterViewInit {
  constructor(private httpCliente: HttpClient) {}
  ngAfterViewInit(): void {}

  add(brand: Brand): Observable<void> {
    return this.httpCliente.post<void>(brand_Url, brand);
  }

  findById(codigo: number): Observable<Brand> {
    return this.httpCliente.get<Brand>(`${brand_Url}/${codigo}`).pipe();
  }

  findAll(): Observable<Brand[]> {
    return this.httpCliente.get<Brand[]>(`${brand_Url}`).pipe();
  }

  updateById(brand: Brand): Observable<void> {
    return this.httpCliente.put<void>(`${brand_Url}/${brand.id}`, brand);
  }

  deleteById(id: number) {
    return this.httpCliente.delete(`${brand_Url}/${id}`).pipe();
  }
}
