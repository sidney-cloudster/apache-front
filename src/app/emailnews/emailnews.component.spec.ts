import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailnewsComponent } from './emailnews.component';

describe('EmailnewsComponent', () => {
  let component: EmailnewsComponent;
  let fixture: ComponentFixture<EmailnewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailnewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailnewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
