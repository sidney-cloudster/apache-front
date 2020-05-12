import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutPagamentoComponent } from './checkout-pagamento.component';

describe('CheckoutPagamentoComponent', () => {
  let component: CheckoutPagamentoComponent;
  let fixture: ComponentFixture<CheckoutPagamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutPagamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
