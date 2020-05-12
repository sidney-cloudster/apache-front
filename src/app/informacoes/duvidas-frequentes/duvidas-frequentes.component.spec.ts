import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuvidasFrequentesComponent } from './duvidas-frequentes.component';

describe('DuvidasFrequentesComponent', () => {
  let component: DuvidasFrequentesComponent;
  let fixture: ComponentFixture<DuvidasFrequentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuvidasFrequentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuvidasFrequentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
