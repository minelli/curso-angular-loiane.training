import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { map, switchMap } from 'rxjs/operators';

// import { CursosService } from '../cursos.service';
import { Cursos2Service } from '../cursos2.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.css']
})
export class CursosFormComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private cursoService: Cursos2Service,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // ** VARIOS SUBSCRIBES **
    // this.route.params.subscribe(
    //   (params: any) => {
    //     const id = params['id'];
    //     console.log(id);
    //     const curso$ = this.cursoService.loadById(id);
    //     curso$.subscribe(curso => this.updateForm(curso));
    //   }

    // ** REFATORAÇÃO PARA USAR UM SUBSCRIBE E DAR SWITCH QUANDO PRECISRA DE OUTRA REQUEST **
    // this.route.params.pipe(
    //   map((params: any) => params['id']),
    //   // switchMap cancela as demais requisicoes e retorna s a ultima requisição
    //   switchMap(id => this.cursoService.loadById(id))
    //   // switchMap cancela a requisição do obterCurso e cria outra para obter aulas
    //   // switchMap(curso => obterAulas)
    // )
    //   .subscribe(curso => this.updateForm(curso));

    // concatMap => ordem da requisição importa
    // mergeMap => ordem nao importa
    // exhaustMap => uma requisição por vez (casos de login)

    const curso = this.route.snapshot.data['curso']; // vem do resolver

    this.form = this.fb.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      // console.log('submit');

      let msgSucesso = 'Curso criado com sucesso';
      let msgErro = 'Erro ao criar curso. Tente novamente';
      if (this.form.value.id) {
        msgSucesso = 'Curso atualizado com sucesso';
        msgErro = 'Erro ao atualizar curso. Tente novamente';
      }

      this.cursoService.save(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess(msgSucesso);
          this.location.back();
        },
        error => this.modal.showAlertDanger(msgErro)
      );
    }
    //   if (this.form.value.id) {
    //     this.cursoService.update(this.form.value).subscribe(
    //       success => {
    //         this.modal.showAlertSuccess('Curso atualizado com sucesso');
    //         this.location.back();
    //       },
    //       error => this.modal.showAlertDanger('Erro ao atualizar curso'),
    //       () => console.log('update complete')
    //     );
    //   } else {
    //     this.cursoService.create(this.form.value).subscribe(
    //       success => {
    //         this.modal.showAlertSuccess('Curso criado com sucesso');
    //         this.location.back();
    //       },
    //       error => this.modal.showAlertDanger('Erro ao criar curso'),
    //       () => console.log('create complete')
    //     );
    //   }
    // }

  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    // console.log('cancel');
  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  // ** Não precisa disso, pois o objeto curso já vem preenchido pelo resolver **
  // updateForm(curso) {
  //   this.form.patchValue({
  //     id: curso.id,
  //     nome: curso.nome
  //   });
  // }

}
