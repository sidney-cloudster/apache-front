import { TestBed } from '@angular/core/testing';

import { RequisicoesService } from '../_services/requisicoes.service';

describe('RequisicoesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequisicoesService = TestBed.get(RequisicoesService);
    expect(service).toBeTruthy();
  });
});
