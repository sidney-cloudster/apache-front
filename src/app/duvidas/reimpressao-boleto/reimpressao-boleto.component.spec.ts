import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimpressaoBoletoComponent } from './reimpressao-boleto.component';

describe('ReimpressaoBoletoComponent', () => {
  let component: ReimpressaoBoletoComponent;
  let fixture: ComponentFixture<ReimpressaoBoletoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReimpressaoBoletoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimpressaoBoletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
