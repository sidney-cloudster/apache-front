import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McCardFlipComponent } from './mc-card-flip.component';

describe('McCardFlipComponent', () => {
  let component: McCardFlipComponent;
  let fixture: ComponentFixture<McCardFlipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McCardFlipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McCardFlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
