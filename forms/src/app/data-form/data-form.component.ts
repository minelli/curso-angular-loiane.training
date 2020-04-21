import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { map, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { Observable, empty } from 'rxjs';

import { DropdownService } from '../shared/services/dropdown.service';
import { EstadoBr } from '../shared/models/estado-br';
import { ConsultaCEPService } from '../shared/services/consulta-cep.service';
import { FormValidations } from '../shared/forms-validations';
import { VerificaEmailService } from './services/verifica-email.service';
import { BaseFormComponent } from '../shared/base-form/base-form.component';
import { Cidade } from '../shared/models/cidade';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent extends BaseFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private dropdownService: DropdownService,
    private consultaCEPService: ConsultaCEPService,
    private verificarEmailService: VerificaEmailService) {
    super(); //chama o construtor da classe mãe
  }

  // formulario: FormGroup;
  // estados: Observable<EstadoBr[]>;
  estados: EstadoBr[];
  cidades: Cidade[];
  cargos: any[];
  tecnologias: any[];
  newsletterOp: any[];
  frameworks = ['Angular', 'React', 'Vue', 'Sencha'];

  ngOnInit() {

    // this.dropdownService.getEstadosBR().
    //   subscribe((dados: EstadoBr[]) => this.estados = dados);

    // o pipe async faz automaticamente o subscribe
    // this.estados = this.dropdownService.getEstadosBR();
    this.dropdownService.getEstadosBR().subscribe(dados => this.estados = dados);
    this.cargos = this.dropdownService.getCargo();
    this.tecnologias = this.dropdownService.getTecnologias();
    this.newsletterOp = this.dropdownService.getNewsLetter();

    // this.verificarEmailService.verificarEmail('email@email.com').subscribe(
    //   (dados) => (dados)
    // );

    // this.formulario = new FormGroup({
    //   nome: new FormControl(null),
    //   email: new FormControl(null)
    // });
    this.formulario = this.formBuilder.group(
      {
        // nome: [valor inicial, [ array de Validators(validacoes)],  [ array de Validators(validacoesAssincrnas)] ],
        nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        email: [null, [Validators.required, Validators.email], [this.validarEmail.bind(this)]],
        confirmarEmail: [null, [FormValidations.equalsTo('email')]],
        endereco: this.formBuilder.group({
          cep: [null, [Validators.required, FormValidations.cepValidator]],
          numero: [null, [Validators.required]],
          complemento: [],
          rua: [null, [Validators.required]],
          bairro: [null, [Validators.required]],
          cidade: [null, [Validators.required]],
          estado: [null, [Validators.required]]
        }),
        cargo: [null],
        tecnologias: [null],
        newsletter: ['s'],
        termos: [null, Validators.pattern('true')],
        frameworks: this.buildFrameworks()
      });

    // buscar cep de forma reativa
    this.formulario.get('endereco.cep').statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(value => console.log('status CEP', value)),
        switchMap(
          status => status === 'VALID' ?
            this.consultaCEPService.consultaCEP(this.formulario.get('endereco.cep').value)
            : empty()
        )
      ).subscribe(dados => dados ? this.populaDados(dados) : {});

    this.formulario.get('endereco.estado').valueChanges
      .pipe(
        tap(estado => console.log('Novo estado', estado)),
        map(estadoSelecionado => this.estados.filter(e => e.sigla === estadoSelecionado)),
        map(estados => estados && estados.length > 0 ? estados[0].id : empty()),
        // troca a execução de observables
        switchMap((estadoId: number) => this.dropdownService.getCidades(estadoId)),
        tap(console.log)
      ).subscribe(cidades => this.cidades = cidades);

    // this.dropdownService.getCidades(8).subscribe(dados => console.log(dados));
  }

  buildFrameworks() {
    // cria um array com um formcontrol para cada checkbox. 
    const values = this.frameworks.map(v => new FormControl(false));
    return this.formBuilder.array(values, FormValidations.requiredMinCheckbox(1));

    // this.formBuilder.array([
    //   new FormControl(false),
    //   new FormControl(false),
    //   new FormControl(false),
    //   new FormControl(false)
    // ]);
  }

  submit() {
    console.log(this.formulario);

    let valueSubmit = Object.assign({}, this.formulario.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks.map(
        (value, index) => value ? this.frameworks[index] : null).filter(v => v !== null)
    });

    console.log(valueSubmit);

    this.httpClient.post('https://httpbin.org/post', JSON.stringify(valueSubmit)).subscribe(
      (response) => {
        console.log(response);
        this.resetar();
      },
      (error: any) => alert('erro')
    );
  }

  consultaCEP() {
    let cep = this.formulario.get('endereco.cep').value;

    if (cep != null && cep !== '') {
      this.consultaCEPService.consultaCEP(cep).subscribe(
        (data) => {
          if (data.erro) {
            alert('Cep não encontrado');
          } else {
            this.populaDados(data);
          }
        }
      );
    }
  }

  populaDados(dados) {
    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });

    this.formulario.get('nome').setValue('Marcelo');
  }

  setarCargo() {
    const cargo = { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' };
    this.formulario.get('cargo').setValue(cargo);
  }

  compararCargos(obj1, obj2) {
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
  }

  setarTecnologias() {
    this.formulario.get('tecnologias').setValue(['java', 'react']);
  }

  validarEmail(formControl: FormControl) {
    return this.verificarEmailService.verificarEmail(formControl.value).pipe(
      map(emailExiste => emailExiste ? { emailJaCadastrado: true } : null)
    );

  }

}
