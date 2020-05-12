import { TestBed } from '@angular/core/testing';

import { McCardFlipService } from './mc-card-flip.service';

describe('McCardFlipService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: McCardFlipService = TestBed.get(McCardFlipService);
    expect(service).toBeTruthy();
  });
});
