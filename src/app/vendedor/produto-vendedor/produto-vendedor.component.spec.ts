import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoVendedorComponent } from './produto-vendedor.component';

describe('ProdutoVendedorComponent', () => {
  let component: ProdutoVendedorComponent;
  let fixture: ComponentFixture<ProdutoVendedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutoVendedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
