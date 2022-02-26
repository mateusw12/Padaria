import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Injectable } from '@angular/core';
import { Classification } from '@module/models';
import { Observable } from 'rxjs';

const classification_Url = '/api/classificacao';

@Injectable({
  providedIn: 'root',
})
export class ClassificationService implements AfterViewInit {

  constructor(private httpCliente: HttpClient) {}
  ngAfterViewInit(): void {}

  add(classification: Classification): Observable<void> {
    return this.httpCliente.post<void>(classification_Url, classification);
  }

  findById(codigo: number): Observable<Classification> {
    return this.httpCliente.get<Classification>(`${classification_Url}/${codigo}`).pipe();
  }

  findAll(): Observable<Classification[]> {
    return this.httpCliente.get<Classification[]>(`${classification_Url}`).pipe();
  }

  updateById(classification: Classification): Observable<void> {
    return this.httpCliente.put<void>(`${classification_Url}/${classification.id}`, classification);
  }

  deleteById(id: number) {
    return this.httpCliente.delete(`${classification_Url}/${id}`).pipe();
  }
}
