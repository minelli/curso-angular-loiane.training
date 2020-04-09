import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AlunosService } from '../alunos.service';
import { IFormCanDeactivate } from 'src/app/guards/iform-candeactivate';
import { Aluno } from '../aluno';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.css']
})
export class AlunoFormComponent implements OnInit, OnDestroy, IFormCanDeactivate {
  inscricao: Subscription;
  aluno: Aluno;
  private formMudou: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private alunoService: AlunosService) { }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe(
      (params) => {
        let id = params['id'];
        this.aluno = this.alunoService.getAluno(id);

        // if (this.aluno === null) {
        //   this.aluno = new Aluno{};
        // }
      });
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

  onInput() {
    this.formMudou = true;
    // console.log('mudou');
  }

  podeMudarRota() {
    if (this.formMudou) {
      return confirm('Tem certeza que deseja sair dessa página');
    }
    return true;
  }

  podeDesativar() {
    return this.podeMudarRota();
  }


}
