import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValePresenteComponent } from './vale-presente.component';

describe('ValePresenteComponent', () => {
  let component: ValePresenteComponent;
  let fixture: ComponentFixture<ValePresenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValePresenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValePresenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
