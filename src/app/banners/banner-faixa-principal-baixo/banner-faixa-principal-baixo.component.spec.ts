import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerFaixaPrincipalBaixoComponent } from './banner-faixa-principal-baixo.component';

describe('BannerFaixaPrincipalBaixoComponent', () => {
  let component: BannerFaixaPrincipalBaixoComponent;
  let fixture: ComponentFixture<BannerFaixaPrincipalBaixoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerFaixaPrincipalBaixoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerFaixaPrincipalBaixoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
