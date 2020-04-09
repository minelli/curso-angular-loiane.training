import { Injectable } from '@angular/core';
import { Aluno } from './aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  private alunos: Aluno[] = [
    { id: 1, nome: 'Aluno 01', email: 'aluno1@email.com' },
    { id: 2, nome: 'Aluno 02', email: 'aluno2@email.com' },
    { id: 3, nome: 'Aluno 03', email: 'aluno3@email.com' },
  ];

  constructor() { }

  getAlunos() {
    return this.alunos;
  }

  getAluno(id: number) {
    return this.getAlunos().find(a => a.id == id);
  }
}
