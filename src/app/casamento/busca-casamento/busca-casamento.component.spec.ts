import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaCasamentoComponent } from './busca-casamento.component';

describe('BuscaCasamentoComponent', () => {
  let component: BuscaCasamentoComponent;
  let fixture: ComponentFixture<BuscaCasamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscaCasamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscaCasamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
