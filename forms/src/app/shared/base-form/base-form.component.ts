import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  template: '<div></div>'
})
export abstract class BaseFormComponent implements OnInit {
  formulario: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  abstract submit();

  onSubmit() {
    if (this.formulario.valid) {
      this.submit();
    } else {
      console.log('formuario invalido');
      this.verificaValidacoesForm(this.formulario);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(
      (campo) => {
        console.log(campo);
        const controle = formGroup.get(campo);
        controle.markAsDirty();
        controle.markAsTouched();
        // verifica se é um grupo, e se sim, chama na recursividade
        if (controle instanceof FormGroup || controle instanceof FormArray) {
          this.verificaValidacoesForm(controle);
        }
      }
    );
  }

  resetar() {
    this.formulario.reset();
  }

  verificaValidTouched(campo) {
    // this.formulario.controls[campo];
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  verificaRequired(campo) {
    return this.formulario.get(campo).hasError('required') && this.formulario.get(campo).touched;
  }

  aplicaCssErro(campo) {
    let validTouched = this.verificaValidTouched(campo);
    return {
      'has-error': validTouched,
      'has-feedback': validTouched,
      'is-invalid': validTouched
    };
  }

  verificaEmailInvalido() {
    let control = this.formulario.get('email');

    if (control.errors) {
      return control.errors.email && control.touched;
    }
  }



}
