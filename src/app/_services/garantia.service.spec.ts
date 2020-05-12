import { TestBed } from '@angular/core/testing';

import { GarantiaService } from './garantia.service';

describe('GarantiaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GarantiaService = TestBed.get(GarantiaService);
    expect(service).toBeTruthy();
  });
});
