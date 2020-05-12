import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentNoHeaderComponent } from './content-no-header.component';

describe('ContentNoHeaderComponent', () => {
  let component: ContentNoHeaderComponent;
  let fixture: ComponentFixture<ContentNoHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentNoHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentNoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
