import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCEPService {

  constructor(private httpClient: HttpClient) { }

  consultaCEP(cep: string) {
    cep = cep.replace(/\D/g, '');
    if (cep != '') {
      // valida cep com 8 digitos
      const validacep = /^[0-9]{8}$/;
      if (validacep.test(cep)) {
        let url = `http://viacep.com.br/ws/${cep}/json`;
        return this.httpClient.get<any>(url);
      }

      return of({}); // forma de retornar um observable vazio
    }
  }
}
