import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeQuery, EmployeeQueryFilter } from '@module/models';
import { Observable } from 'rxjs';

const API_URL = '/api/consulta/funcinario';

@Injectable({
  providedIn: 'root',
})
export class EmployeeQueryRepository {
  constructor(private httpCliente: HttpClient) {}

  find(filter?: EmployeeQueryFilter): Observable<EmployeeQuery[]> {
    return this.httpCliente.post<EmployeeQuery[]>(API_URL, filter);
  }
}
