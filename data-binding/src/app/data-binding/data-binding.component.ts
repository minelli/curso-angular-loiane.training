import { Component, OnInit, } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  // styleUrls: ['./data-binding.component.css']
  styles: [
    `
      .highligth {
        background-color: yellow;
        font-weight: bold;
      }
    `
  ]
})
export class DataBindingComponent implements OnInit {
  constructor() { }
  url = 'http://loiane.com';
  cursoAngular = true;
  valorAtual = '';
  valorSalvo = '';
  isMouseOver = false;

  nomeDoCurso = 'Angular';

  valorInicial = 15;

  urlImagem = 'http://lorempixel.com/400/200/nature';

  getValor() {
    return 1;
  }

  getCurtirCurso() {
    return true;
  }

  botaoClicado() {
    alert('botão clicado!');
  }

  onKeyUp(evento: KeyboardEvent) {
    // console.log((<HTMLInputElement>evento.target).value);
    this.valorAtual = (evento.target as HTMLInputElement).value;
  }

  salvarValor(valor) {
    this.valorSalvo = valor;
  }

  onMouseOverOut() {
    this.isMouseOver = !this.isMouseOver;
  }

  onMudouValor(evento)
  {
    console.log(evento.novoValor);
  }

  ngOnInit() { }
}
