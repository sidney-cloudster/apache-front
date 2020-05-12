import { TestBed } from '@angular/core/testing';

import { CasamentoService } from './casamento.service';

describe('CasamentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CasamentoService = TestBed.get(CasamentoService);
    expect(service).toBeTruthy();
  });
});
