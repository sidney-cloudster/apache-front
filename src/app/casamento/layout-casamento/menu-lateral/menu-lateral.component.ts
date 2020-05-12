import { Component, OnInit } from '@angular/core';
import { InfoCasamentoService } from 'src/app/_services/_casamento/info-casamento.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['../../casamento.component.css']
})

export class MenuLateralComponent implements OnInit {
  public nomeNoivo:string;
  public nomeNoiva:string;
  public dia:string;
  public mes:string;
  public ano:string;
  public infoCasamento:any;
  public urlAtual:any = '';
  constructor(
    private sInfoCasamento:InfoCasamentoService,
    private router:Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    
    this.infoCasamento = this.sInfoCasamento.getInfoNoivos();
    if(this.infoCasamento){
      this.nomeNoivo = this.infoCasamento.nomeNoivo;
      this.nomeNoiva = this.infoCasamento.nomeNoiva;
      this.dia = this.infoCasamento.dia;
      this.mes = this.infoCasamento.mes;
      this.ano = this.infoCasamento.ano;
    }

  }
}
