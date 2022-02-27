import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Injectable } from '@angular/core';
import { Classification } from '@module/models';
import { Observable } from 'rxjs';

const API_URL = '/api/classificacao';

@Injectable({
  providedIn: 'root',
})
export class ClassificationService implements AfterViewInit {

  constructor(private httpCliente: HttpClient) {}
  ngAfterViewInit(): void {}

  add(classification: Classification): Observable<void> {
    return this.httpCliente.post<void>(API_URL, classification);
  }

  findById(codigo: number): Observable<Classification> {
    return this.httpCliente.get<Classification>(`${API_URL}/${codigo}`);
  }

  findAll(): Observable<Classification[]> {
    return this.httpCliente.get<Classification[]>(`${API_URL}`);
  }

  updateById(classification: Classification): Observable<void> {
    return this.httpCliente.put<void>(`${API_URL}/${classification.id}`, classification);
  }

  deleteById(id: number) {
    return this.httpCliente.delete(`${API_URL}/${id}`).pipe();
  }
}
