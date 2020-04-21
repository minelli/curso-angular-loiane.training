import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { EstadoBr } from '../models/estado-br';
import { Cidade } from '../models/cidade';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private httpClient: HttpClient) { }

  getEstadosBR() {
    return this.httpClient.get<EstadoBr[]>('assets/dados/estadosBR.json');
  }

  getCidades(idEstado: number) {
    return this.httpClient.get<Cidade[]>('assets/dados/cidades.json')
      .pipe(
        // tslint:disable-next-line: triple-equals
        map((cidades: Cidade[]) => cidades.filter(c => c.estado == idEstado))
      );
  }

  getCargo() {
    return [
      { nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr' },
      { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' },
      { nome: 'Dev', nivel: 'Senior', desc: 'Dev Sr' }

    ];
  }

  getTecnologias() {
    return [
      { nome: 'java', desc: 'Java' },
      { nome: 'net', desc: 'Net' },
      { nome: 'angular', desc: 'Angular' },
      { nome: 'react', desc: 'React' },
      { nome: 'php', desc: 'PHP' },
    ];
  }

  getNewsLetter() {
    return [
      { valor: 's', desc: 'Sim' },
      { valor: 'n', desc: 'Não' }
    ];
  }
}
