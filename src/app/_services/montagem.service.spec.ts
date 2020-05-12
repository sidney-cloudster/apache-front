import { TestBed } from '@angular/core/testing';

import { MontagemService } from './montagem.service';

describe('MontagemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MontagemService = TestBed.get(MontagemService);
    expect(service).toBeTruthy();
  });
});
