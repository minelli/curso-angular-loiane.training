import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunosService } from '../alunos.service';
import { Subscription } from 'rxjs';
import { Aluno } from '../aluno';

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.css']
})
export class AlunoDetalheComponent implements OnInit, OnDestroy {
  inscricao: Subscription;
  aluno: Aluno;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private alunoService: AlunosService) { }

  ngOnInit() {
    // this.inscricao = this.route.params.subscribe(
    //   (params) => {
    //     let id = params['id'];
    //     this.aluno = this.alunoService.getAluno(id);
    //   });
    console.log('ngOnInit: AlunoDetalheComponent');

    this.inscricao = this.route.data.subscribe(
      (info: { aluno: Aluno }) => {
        this.aluno = info.aluno;
        // console.log(info);
        console.log('Recebendo o obj Aluno do resolver');
      });
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

  editarAluno() {
    this.router.navigate(['/alunos', this.aluno.id, 'editar']);
  }

}
