import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerTopoComponent } from './banner-topo.component';

describe('BannerTopoComponent', () => {
  let component: BannerTopoComponent;
  let fixture: ComponentFixture<BannerTopoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerTopoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerTopoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
