import { TestBed } from '@angular/core/testing';

import { DadosOcorrenciaService } from './dados-ocorrencia.service';

describe('DadosOcorrenciaService', () => {
  let service: DadosOcorrenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadosOcorrenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
