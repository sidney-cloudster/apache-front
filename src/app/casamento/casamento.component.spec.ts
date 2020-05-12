import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasamentoComponent } from './casamento.component';

describe('CasamentoComponent', () => {
  let component: CasamentoComponent;
  let fixture: ComponentFixture<CasamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
