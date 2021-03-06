import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConsultaCEPService } from '../shared/services/consulta-cep.service';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null,
  };

  constructor(private httpClient: HttpClient,
    private consultaCEPService: ConsultaCEPService) { }

  ngOnInit() {
  }

  onSubmit(form) {
    // console.log(form);
    console.log(JSON.stringify(form.value));
    // console.log(this.usuario);

    this.httpClient.post('https://httpbin.org/post', JSON.stringify(form.value)).subscribe(
      (response) => {
        console.log(response);
      }
    );
  }

  verificaValidTouched(campo) {
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo) {
    let validTouched = this.verificaValidTouched(campo);
    return {
      'has-error': validTouched,
      'has-feedback': validTouched,
      'is-invalid': validTouched
    };
  }

  consultaCEP(cep, form) {
    // console.log(cep);
    if (cep != null && cep !== '') {
      this.consultaCEPService.consultaCEP(cep).subscribe(
        (data) => {
          if (data.erro) {
            alert('Cep não encontrado');
          } else {
            this.populaDados(data, form)
          }
        }
      );
    }
  }

  populaDados(dados, formulario) {
    /* o setValue deve preencher todos os campos do formulario, 
     * o que torna inconveniente para forms grandes
     */
    // formulario.setValue({
    //   nome: formulario.value.nome,
    //   email: formulario.value.email,
    //   endereco: {
    //     rua: dados.logradouro,
    //     cep: dados.cep,
    //     numero: '',
    //     complemento: dados.complemento,
    //     bairro: dados.bairro,
    //     cidade: dados.localidade,
    //     estado: dados.uf
    //   }
    // });

    /* Então usamos o patchValue, que adiciona somente as propriedades necessárias
     * para não ficar reescrevendo dados que não serão alterados
     */
    formulario.form.patchValue({
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });

    // console.log(formulario);
  }

  resetaFormulario(formulario) {
    formulario.form.patchValue({
      endereco: {
        rua: '',
        cep: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: ''
      }
    });
  }
}
