import { TestBed, async, inject } from '@angular/core/testing';

import { AuthVendedorGuard } from './auth-vendedor.guard';

describe('AuthVendedorGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthVendedorGuard]
    });
  });

  it('should ...', inject([AuthVendedorGuard], (guard: AuthVendedorGuard) => {
    expect(guard).toBeTruthy();
  }));
});
