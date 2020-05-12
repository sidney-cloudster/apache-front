import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuLateralConvidadoComponent } from './menu-lateral.component';

describe('MenuLateralComponent', () => {
  let component: MenuLateralConvidadoComponent;
  let fixture: ComponentFixture<MenuLateralConvidadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuLateralConvidadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuLateralConvidadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
