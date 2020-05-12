import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoNaoEncontradoComponent } from './produto-nao-encontrado.component';

describe('ProdutoNaoEncontradoComponent', () => {
  let component: ProdutoNaoEncontradoComponent;
  let fixture: ComponentFixture<ProdutoNaoEncontradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutoNaoEncontradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoNaoEncontradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
