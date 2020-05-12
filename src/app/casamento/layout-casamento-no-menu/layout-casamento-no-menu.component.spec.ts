import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCasamentoNoMenuComponent } from './layout-casamento-no-menu.component';

describe('LayoutCasamentoNoMenuComponent', () => {
  let component: LayoutCasamentoNoMenuComponent;
  let fixture: ComponentFixture<LayoutCasamentoNoMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutCasamentoNoMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutCasamentoNoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
