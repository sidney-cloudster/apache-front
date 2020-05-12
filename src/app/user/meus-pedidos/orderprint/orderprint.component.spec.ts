import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPrintPedidoComponent } from './orderprint.component';

// s
describe('OrderPrintPedidoComponent', () => {
  let component: OrderPrintPedidoComponent;
  let fixture: ComponentFixture<OrderPrintPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPrintPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPrintPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
