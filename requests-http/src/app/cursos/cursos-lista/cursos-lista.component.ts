import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, empty, Subject, EMPTY } from 'rxjs';
import { catchError, take, switchMap } from 'rxjs/operators';

// import { CursosService } from '../cursos.service';
import { Curso } from '../curso';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.css'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {
  // cursos: Curso[];
  cursos$: Observable<Curso[]>; // usa-se o $ para notar que é um observable
  error$ = new Subject<boolean>();

  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal', { static: true }) deleteModal;

  cursoSelecionado: Curso;


  constructor(private service: Cursos2Service,
    private bsModalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // this.service.list().subscribe(data => this.cursos = data);
    this.onRefresh();
  }


  onRefresh() {
    this.cursos$ = this.service.list().pipe(catchError(error => {
      console.log(error);
      // this.error$.next(true); // next emite um valor
      this.handleError();
      return empty();
    }));
  }

  onEdit(id: number) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  onDelete(curso) {
    console.log(curso);
    this.cursoSelecionado = curso;
    // this.deleteModalRef = this.bsModalService.show(this.deleteModal, { class: 'modal-sm' });
    const result$ = this.alertService.showConfirmModal('Confirmação', 'Deseja realmente excluir o curso?');
    result$.asObservable().pipe(
      take(1),
      switchMap(result => result ? this.service.remove(curso.id) : EMPTY)
    ).subscribe(
      success => {
        this.onRefresh();
      },
      error => {
        this.alertService.showAlertDanger('Erro ao excluir curso. Tente novamente mais tarde');
      }
    );
  }

  onConfirmDelete() {
    this.service.remove(this.cursoSelecionado.id).subscribe(
      success => {
        this.onRefresh();
        this.deleteModalRef.hide();
      },
      error => {
        this.alertService.showAlertDanger('Erro ao excluir curso. Tente novamente mais tarde');
        this.deleteModalRef.hide();
      }
    );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde');
  }

}
