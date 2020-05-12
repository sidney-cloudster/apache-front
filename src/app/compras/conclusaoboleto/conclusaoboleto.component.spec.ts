import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConclusaoboletoComponent } from './conclusaoboleto.component';

describe('ConclusaoboletoComponent', () => {
  let component: ConclusaoboletoComponent;
  let fixture: ComponentFixture<ConclusaoboletoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConclusaoboletoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConclusaoboletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
