import { TestBed } from '@angular/core/testing';

import { EmailnewsService } from './emailnews.service';

describe('EmailnewsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmailnewsService = TestBed.get(EmailnewsService);
    expect(service).toBeTruthy();
  });
});
