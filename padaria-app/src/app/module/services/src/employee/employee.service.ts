import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Injectable } from '@angular/core';
import { Employee } from '@module/models';
import { Observable } from 'rxjs';

const employee_Url = '/api/funcionario';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService implements AfterViewInit {

  constructor(private httpCliente: HttpClient) {}
  ngAfterViewInit(): void {}

  add(employee: Employee): Observable<void> {
    return this.httpCliente.post<void>(employee_Url, employee);
  }

  findById(codigo: number): Observable<Employee> {
    return this.httpCliente.get<Employee>(`${employee_Url}/${codigo}`).pipe();
  }

  findAll(): Observable<Employee[]> {
    return this.httpCliente.get<Employee[]>(`${employee_Url}`).pipe();
  }

  updateById(employee: Employee): Observable<void> {
    return this.httpCliente.put<void>(`${employee_Url}/${employee.id}`, employee);
  }

  deleteById(id: number) {
    return this.httpCliente.delete(`${employee_Url}/${id}`).pipe();
  }
}
