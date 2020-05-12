import { TestBed } from '@angular/core/testing';

import { MaisVendidosService } from './mais-vendidos.service';

describe('MaisVendidosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaisVendidosService = TestBed.get(MaisVendidosService);
    expect(service).toBeTruthy();
  });
});
