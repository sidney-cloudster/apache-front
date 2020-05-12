import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacaoCompraComponent } from './confirmacao-compra.component';

describe('ConfirmacaoCompraComponent', () => {
  let component: ConfirmacaoCompraComponent;
  let fixture: ComponentFixture<ConfirmacaoCompraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmacaoCompraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacaoCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
