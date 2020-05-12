import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaVendedorComponent } from './busca-vendedor.component';

describe('BuscaVendedorComponent', () => {
  let component: BuscaVendedorComponent;
  let fixture: ComponentFixture<BuscaVendedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscaVendedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscaVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
