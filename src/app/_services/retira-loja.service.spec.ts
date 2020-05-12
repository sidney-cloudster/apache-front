import { TestBed } from '@angular/core/testing';

import { RetiraLojaService } from './retira-loja.service';

describe('RetiraLojaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RetiraLojaService = TestBed.get(RetiraLojaService);
    expect(service).toBeTruthy();
  });
});
