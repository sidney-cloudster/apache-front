import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerHeaderComponent } from './banner-header.component';

describe('BannerHeaderComponent', () => {
  let component: BannerHeaderComponent;
  let fixture: ComponentFixture<BannerHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
