import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departament } from 'src/app/module/models';

const departament_Url = '/api/departamento';

@Injectable({
  providedIn: 'root',
})
export class DepartamentService implements AfterViewInit {
  constructor(private httpCliente: HttpClient) {}
  ngAfterViewInit(): void {}

  add(departament: Departament): Observable<void> {
    return this.httpCliente.post<void>(departament_Url, departament);
  }

  findById(codigo: number): Observable<Departament> {
    return this.httpCliente
      .get<Departament>(`${departament_Url}/${codigo}`)
      .pipe();
  }

  findAll(): Observable<Departament[]> {
    return this.httpCliente.get<Departament[]>(`${departament_Url}`).pipe();
  }

  updateById(departament: Departament): Observable<void> {
    return this.httpCliente.put<void>(
      `${departament_Url}/${departament.id}`,
      departament
    );
  }

  deleteById(id: number) {
    return this.httpCliente.delete(`${departament_Url}/${id}`).pipe();
  }
}
