import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerMaisVendidosComponent } from './banner-mais-vendidos.component';

describe('BannerMaisVendidosComponent', () => {
  let component: BannerMaisVendidosComponent;
  let fixture: ComponentFixture<BannerMaisVendidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerMaisVendidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerMaisVendidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
