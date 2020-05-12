import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XmlAnuncianteComponent } from './xml-anunciante.component';

describe('XmlAnuncianteComponent', () => {
  let component: XmlAnuncianteComponent;
  let fixture: ComponentFixture<XmlAnuncianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XmlAnuncianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XmlAnuncianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
