import { TestBed } from '@angular/core/testing';

import { CarrinhoCompraService } from './carrinho-compra.service';

describe('CarrinhoCompraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarrinhoCompraService = TestBed.get(CarrinhoCompraService);
    expect(service).toBeTruthy();
  });
});
