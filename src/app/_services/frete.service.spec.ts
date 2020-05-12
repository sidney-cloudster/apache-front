import { TestBed } from '@angular/core/testing';

import { FreteService } from './frete.service';

describe('FreteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FreteService = TestBed.get(FreteService);
    expect(service).toBeTruthy();
  });
});
