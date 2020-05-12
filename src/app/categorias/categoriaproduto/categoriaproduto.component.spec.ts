import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaprodutoComponent } from './categoriaproduto.component';

describe('CategoriaprodutoComponent', () => {
  let component: CategoriaprodutoComponent;
  let fixture: ComponentFixture<CategoriaprodutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaprodutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaprodutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
