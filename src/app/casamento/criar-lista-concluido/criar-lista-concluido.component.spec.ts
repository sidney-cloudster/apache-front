import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarListaConcluidoComponent } from './criar-lista-concluido.component';

describe('CriarListaConcluidoComponent', () => {
  let component: CriarListaConcluidoComponent;
  let fixture: ComponentFixture<CriarListaConcluidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarListaConcluidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarListaConcluidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
