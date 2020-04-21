import { TestBed } from '@angular/core/testing';

import { ConsultaCEPService } from './consulta-cep.service';

describe('ConsultaCEPService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultaCEPService = TestBed.get(ConsultaCEPService);
    expect(service).toBeTruthy();
  });
});
