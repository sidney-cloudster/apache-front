import { Component, OnInit } from '@angular/core';
import { configEnvi } from 'src/environments/environment';

@Component({
  selector: 'app-layout-casamento',
  templateUrl: './layout-casamento.component.html',
  styleUrls: ['../casamento.component.css']
})
export class LayoutCasamentoConvidadoComponent implements OnInit {

  constructor(
    private config:configEnvi
  ) { }

  ngOnInit() {
  }

  public getLogo(){
    return this.config.getLogo();
  }

}
