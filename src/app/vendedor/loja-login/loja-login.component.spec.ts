import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LojaLoginComponent } from './loja-login.component';

describe('LojaLoginComponent', () => {
  let component: LojaLoginComponent;
  let fixture: ComponentFixture<LojaLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LojaLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LojaLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
