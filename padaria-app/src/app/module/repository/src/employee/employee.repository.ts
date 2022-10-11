import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '@module/models';
import { Observable } from 'rxjs';

const API_URL = '/api/cadastro/funcionario';

@Injectable({
  providedIn: 'root',
})
export class EmployeeRepository {
  constructor(private httpCliente: HttpClient) {}

  add(employee: Employee): Observable<void> {
    return this.httpCliente.post<void>(API_URL, employee);
  }

  findById(codigo: number): Observable<Employee> {
    return this.httpCliente.get<Employee>(`${API_URL}/${codigo}`);
  }

  findAll(): Observable<Employee[]> {
    return this.httpCliente.get<Employee[]>(`${API_URL}`);
  }

  updateById(employee: Employee): Observable<void> {
    return this.httpCliente.put<void>(`${API_URL}/${employee.id}`, employee);
  }

  deleteById(id: number): Observable<void> {
    return this.httpCliente.delete<void>(`${API_URL}/${id}`);
  }
}
