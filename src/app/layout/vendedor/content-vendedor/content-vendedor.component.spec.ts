import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentVendedorComponent } from './content-vendedor.component';

describe('ContentVendedorComponent', () => {
  let component: ContentVendedorComponent;
  let fixture: ComponentFixture<ContentVendedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentVendedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
