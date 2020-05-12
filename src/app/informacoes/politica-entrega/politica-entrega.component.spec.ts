import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticaEntregaComponent } from './politica-entrega.component';

describe('PoliticaEntregaComponent', () => {
  let component: PoliticaEntregaComponent;
  let fixture: ComponentFixture<PoliticaEntregaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliticaEntregaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticaEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
