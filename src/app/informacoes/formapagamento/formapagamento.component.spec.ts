import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormapagamentoComponent } from './formapagamento.component';

describe('FormapagamentoComponent', () => {
  let component: FormapagamentoComponent;
  let fixture: ComponentFixture<FormapagamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormapagamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormapagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
