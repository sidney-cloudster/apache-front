import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrocaDevolucaoComponent } from './troca-devolucao.component';

describe('TrocaDevolucaoComponent', () => {
  let component: TrocaDevolucaoComponent;
  let fixture: ComponentFixture<TrocaDevolucaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrocaDevolucaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrocaDevolucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
