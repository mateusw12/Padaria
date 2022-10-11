import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from '@module/models';
import { Observable } from 'rxjs';

const API_URL = '/api/cadastro/cargo';

@Injectable({
  providedIn: 'root',
})
export class JobRepository  {
  constructor(private httpCliente: HttpClient) {}

  add(Job: Job): Observable<void> {
    return this.httpCliente.post<void>(API_URL, Job);
  }

  findById(codigo: number): Observable<Job> {
    return this.httpCliente.get<Job>(`${API_URL}/${codigo}`);
  }

  findAll(): Observable<Job[]> {
    return this.httpCliente.get<Job[]>(`${API_URL}`);
  }

  updateById(Job: Job): Observable<void> {
    return this.httpCliente.put<void>(`${API_URL}/${Job.id}`, Job);
  }

  deleteById(id: number): Observable<void> {
    return this.httpCliente.delete<void>(`${API_URL}/${id}`);
  }
}
