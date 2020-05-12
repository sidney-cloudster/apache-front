import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderVendedorComponent } from './header-vendedor.component';

describe('HeaderVendedorComponent', () => {
  let component: HeaderVendedorComponent;
  let fixture: ComponentFixture<HeaderVendedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderVendedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
