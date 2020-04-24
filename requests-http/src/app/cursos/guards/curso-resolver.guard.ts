import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';

import { Curso } from '../curso';
// import { CursosService } from '../cursos.service';
import { Cursos2Service } from '../cursos2.service';

@Injectable({
  providedIn: 'root'
})
export class CursoResolverGuard implements Resolve<Curso> {

  constructor(private cursoService: Cursos2Service) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Curso | Observable<Curso> {
    // editar
    if (route.params && route.params['id']) {
      return this.cursoService.loadById(route.params['id']);
    }

    // criar
    return of({ id: null, nome: null });
  }


}
