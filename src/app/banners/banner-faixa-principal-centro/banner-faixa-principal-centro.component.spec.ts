import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerFaixaPrincipalCentroComponent } from './banner-faixa-principal-centro.component';

describe('BannerFaixaPrincipalCentroComponent', () => {
  let component: BannerFaixaPrincipalCentroComponent;
  let fixture: ComponentFixture<BannerFaixaPrincipalCentroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerFaixaPrincipalCentroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerFaixaPrincipalCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
