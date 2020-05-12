import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarListaComponent } from './criar-lista.component';

describe('CriarListaComponent', () => {
  let component: CriarListaComponent;
  let fixture: ComponentFixture<CriarListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
