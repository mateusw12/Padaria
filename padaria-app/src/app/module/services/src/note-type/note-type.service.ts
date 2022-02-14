import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NoteType } from 'src/app/module/models';

const noteType_Url = '/api/tipo-nota';

@Injectable({
  providedIn: 'root',
})
export class NoteTypeService {
  constructor(private httpCliente: HttpClient) {}

  add(noteType: NoteType): Observable<void> {
    return this.httpCliente.post<void>(noteType_Url, noteType);
  }

  findById(codigo: number): Observable<NoteType> {
    return this.httpCliente.get<NoteType>(`${noteType_Url}/${codigo}`).pipe();
  }

  findAll(): Observable<NoteType[]> {
    return this.httpCliente.get<NoteType[]>(`${noteType_Url}`).pipe();
  }

  updateById(noteType: NoteType): Observable<void> {
    return this.httpCliente.put<void>(
      `${noteType_Url}/${noteType.id}`,
      noteType
    );
  }

  deleteById(id: number) {
    return this.httpCliente.delete(`${noteType_Url}/${id}`).pipe();
  }
}
