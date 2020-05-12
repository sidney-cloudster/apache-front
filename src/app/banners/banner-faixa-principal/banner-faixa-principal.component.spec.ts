import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerFaixaPrincipalComponent } from './banner-faixa-principal.component';

describe('BannerFaixaPrincipalComponent', () => {
  let component: BannerFaixaPrincipalComponent;
  let fixture: ComponentFixture<BannerFaixaPrincipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerFaixaPrincipalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerFaixaPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
