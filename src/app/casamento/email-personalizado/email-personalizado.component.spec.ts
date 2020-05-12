import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailPersonalizadoComponent } from './email-personalizado.component';

describe('EmailPersonalizadoComponent', () => {
  let component: EmailPersonalizadoComponent;
  let fixture: ComponentFixture<EmailPersonalizadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailPersonalizadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailPersonalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
