import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoBoxComponent } from './produto-box.component';

describe('ProdutoBoxComponent', () => {
  let component: ProdutoBoxComponent;
  let fixture: ComponentFixture<ProdutoBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutoBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
