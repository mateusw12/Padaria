import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Injectable } from '@angular/core';
import { Employee } from '@module/models';
import { Observable } from 'rxjs';

const API_URL = '/api/funcionario';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService implements AfterViewInit {

  constructor(private httpCliente: HttpClient) {}
  ngAfterViewInit(): void {}

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

  deleteById(id: number) {
    return this.httpCliente.delete(`${API_URL}/${id}`);
  }
}
