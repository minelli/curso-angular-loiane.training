import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap, delay, take } from 'rxjs/operators';

import { environment } from '../../environments/environment';


import { Curso } from './curso';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private readonly API = `${environment.API}cursos`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Curso[]>(this.API).pipe(
      delay(2000),
      // tap(console.log)
    );
  }

  loadById(id: number) {
    return this.http.get<Curso>(`${this.API}/${id}`).pipe(
      take(1), // tenta uma vez e finaliza o observable
    );
  }

  private create(curso) {
    return this.http.post(this.API, curso).pipe(
      take(1), // tenta uma vez e finaliza o observable
    );
  }

  private update(curso) {
    return this.http.put(`${this.API}/${curso.id}`, curso).pipe(
      take(1), // tenta uma vez e finaliza o observable
    );
  }

  save(curso) {
    if (curso.id) {
      return this.update(curso);
    } else {
      return this.create(curso);
    }
  }

  remove(id) {
    return this.http.delete(`${this.API}/${id}`).pipe(
      take(1), // tenta uma vez e finaliza o observable
    );
  }

}
