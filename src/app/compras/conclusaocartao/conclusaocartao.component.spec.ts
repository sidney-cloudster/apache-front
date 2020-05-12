import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConclusaocartaoComponent } from './conclusaocartao.component';

describe('ConclusaocartaoComponent', () => {
  let component: ConclusaocartaoComponent;
  let fixture: ComponentFixture<ConclusaocartaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConclusaocartaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConclusaocartaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
