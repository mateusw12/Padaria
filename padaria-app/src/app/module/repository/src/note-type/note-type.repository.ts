import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NoteType } from '@module/models';
import { Observable } from 'rxjs';

const API_URL = '/api/cadastro/tipo-nota';

@Injectable({
  providedIn: 'root',
})
export class NoteTypeRepository {
  constructor(private httpCliente: HttpClient) {}

  add(noteType: NoteType): Observable<void> {
    return this.httpCliente.post<void>(API_URL, noteType);
  }

  findById(codigo: number): Observable<NoteType> {
    return this.httpCliente.get<NoteType>(`${API_URL}/${codigo}`);
  }

  findAll(): Observable<NoteType[]> {
    return this.httpCliente.get<NoteType[]>(`${API_URL}`);
  }

  updateById(noteType: NoteType): Observable<void> {
    return this.httpCliente.put<void>(`${API_URL}/${noteType.id}`, noteType);
  }

  deleteById(id: number): Observable<void> {
    return this.httpCliente.delete<void>(`${API_URL}/${id}`);
  }
}
