import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoCasamentoComponent } from './produto-casamento.component';

describe('ProdutoCasamentoComponent', () => {
  let component: ProdutoCasamentoComponent;
  let fixture: ComponentFixture<ProdutoCasamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutoCasamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoCasamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
