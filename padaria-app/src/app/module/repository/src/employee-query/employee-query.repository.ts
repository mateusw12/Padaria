import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee, EmployeeQueryFilter } from '@module/models';
import { Observable } from 'rxjs';

const API_URL = '/api/consulta/funcionario';

@Injectable({
  providedIn: 'root',
})
export class EmployeeQueryRepository {
  constructor(private httpCliente: HttpClient) {}

  find(filter?: EmployeeQueryFilter): Observable<Employee[]> {
    return this.httpCliente.post<Employee[]>(API_URL, filter);
  }
}
