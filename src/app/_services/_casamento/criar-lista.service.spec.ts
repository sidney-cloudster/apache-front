import { TestBed } from '@angular/core/testing';

import { CriarListaService } from './criar-lista.service';

describe('CriarListaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CriarListaService = TestBed.get(CriarListaService);
    expect(service).toBeTruthy();
  });
});
