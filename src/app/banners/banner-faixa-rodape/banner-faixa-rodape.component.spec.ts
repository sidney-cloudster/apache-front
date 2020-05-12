import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerFaixaRodapeComponent } from './banner-faixa-rodape.component';

describe('BannerFaixaRodapeComponent', () => {
  let component: BannerFaixaRodapeComponent;
  let fixture: ComponentFixture<BannerFaixaRodapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerFaixaRodapeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerFaixaRodapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
