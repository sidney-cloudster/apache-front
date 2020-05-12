import { TestBed } from '@angular/core/testing';

import { InfoCasamentoService } from './info-casamento.service';

describe('InfoCasamentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InfoCasamentoService = TestBed.get(InfoCasamentoService);
    expect(service).toBeTruthy();
  });
});
