import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Injectable } from '@angular/core';
import { Departament } from '@module/models';
import { Observable } from 'rxjs';

const API_URL = '/api/cadastro/departamento';

@Injectable({
  providedIn: 'root',
})
export class DepartamentRepository {
  constructor(private httpCliente: HttpClient) {}

  add(departament: Departament): Observable<void> {
    return this.httpCliente.post<void>(API_URL, departament);
  }

  findById(codigo: number): Observable<Departament> {
    return this.httpCliente.get<Departament>(`${API_URL}/${codigo}`).pipe();
  }

  findAll(): Observable<Departament[]> {
    return this.httpCliente.get<Departament[]>(`${API_URL}`);
  }

  updateById(departament: Departament): Observable<void> {
    return this.httpCliente.put<void>(
      `${API_URL}/${departament.id}`,
      departament
    );
  }

  deleteById(id: number): Observable<void> {
    return this.httpCliente.delete<void>(`${API_URL}/${id}`);
  }
}
