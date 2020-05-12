import { Component, OnInit } from '@angular/core';
import { configEnvi } from 'src/environments/environment';

@Component({
  selector: 'app-layout-casamento-no-menu',
  templateUrl: './layout-casamento-no-menu.component.html',
  styleUrls: ['../casamento.component.css']
})
export class LayoutCasamentoNoMenuComponent implements OnInit {

  constructor(
    public sConfig:configEnvi
  ) { }

  ngOnInit() {
  }

  public getLogo(){
    return this.sConfig.getLogo();
  }
}
