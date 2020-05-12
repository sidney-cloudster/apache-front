import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrazoEntregaComponent } from './prazo-entrega.component';

describe('PrazoEntregaComponent', () => {
  let component: PrazoEntregaComponent;
  let fixture: ComponentFixture<PrazoEntregaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrazoEntregaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrazoEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
