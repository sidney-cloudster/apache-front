import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCasamentoComponent } from './layout-casamento.component';

describe('LayoutCasamentoComponent', () => {
  let component: LayoutCasamentoComponent;
  let fixture: ComponentFixture<LayoutCasamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutCasamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutCasamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
