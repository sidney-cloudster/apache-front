import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarListaEnderecoComponent } from './criar-lista-endereco.component';

describe('CriarListaEnderecoComponent', () => {
  let component: CriarListaEnderecoComponent;
  let fixture: ComponentFixture<CriarListaEnderecoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarListaEnderecoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarListaEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
