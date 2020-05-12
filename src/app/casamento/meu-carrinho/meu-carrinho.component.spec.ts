import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeuCarrinhoComponent } from './meu-carrinho.component';

describe('MeuCarrinhoComponent', () => {
  let component: MeuCarrinhoComponent;
  let fixture: ComponentFixture<MeuCarrinhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeuCarrinhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeuCarrinhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
