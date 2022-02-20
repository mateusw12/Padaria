import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Injectable } from '@angular/core';
import { Job } from '@models/src';
import { Observable } from 'rxjs';

const Job_Url = '/api/cargo';

@Injectable({
  providedIn: 'root',
})
export class JobService implements AfterViewInit {
  constructor(private httpCliente: HttpClient) {}
  ngAfterViewInit(): void {}

  add(Job: Job): Observable<void> {
    return this.httpCliente.post<void>(Job_Url, Job);
  }

  findById(codigo: number): Observable<Job> {
    return this.httpCliente
      .get<Job>(`${Job_Url}/${codigo}`)
      .pipe();
  }

  findAll(): Observable<Job[]> {
    return this.httpCliente.get<Job[]>(`${Job_Url}`).pipe();
  }

  updateById(Job: Job): Observable<void> {
    return this.httpCliente.put<void>(
      `${Job_Url}/${Job.id}`,
      Job
    );
  }

  deleteById(id: number) {
    return this.httpCliente.delete(`${Job_Url}/${id}`).pipe();
  }
}
