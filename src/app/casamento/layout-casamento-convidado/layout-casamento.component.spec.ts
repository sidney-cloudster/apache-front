import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCasamentoConvidadoComponent } from './layout-casamento.component';

describe('LayoutCasamentoComponent', () => {
  let component: LayoutCasamentoConvidadoComponent;
  let fixture: ComponentFixture<LayoutCasamentoConvidadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutCasamentoConvidadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutCasamentoConvidadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
