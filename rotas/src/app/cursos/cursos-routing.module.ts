import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursosComponent } from './cursos.component';
import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { CursoNaoEncontradoComponent } from './curso-nao-encontrado/curso-nao-encontrado.component';

const routes: Routes = [
  // { path: 'cursos', component: CursosComponent },
  { path: '', component: CursosComponent }, //fica sem path para o lazyLoading funcionar
  { path: 'naoEncontrado', component: CursoNaoEncontradoComponent },
  { path: ':id', component: CursoDetalheComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
