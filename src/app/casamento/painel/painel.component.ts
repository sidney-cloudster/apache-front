import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { InfoCasamentoService } from 'src/app/_services/_casamento/info-casamento.service';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['../casamento.component.css']
})
export class PainelComponent implements OnInit {

  private customer;
  public id:number;
  public mensagem:string;
  public extrato:string;
  public quantidade_presentes:string;
  public quantidade_emails:string;
  
  public infoCasamento:any;

  constructor(
    private sInfoCasamento: InfoCasamentoService,
    public HttpClient: HttpClient,
    public datepipe: DatePipe) {
  }

  ngOnInit() {
    this.infoCasamento = this.sInfoCasamento.getInfoNoivos();
    if(this.infoCasamento){
      this.mensagem   = this.infoCasamento.mensagem;
      this.extrato    = this.infoCasamento.extrato;
      this.quantidade_presentes = this.infoCasamento.quantidade_presentes;
      this.quantidade_emails    = this.infoCasamento.quantidade_emails;
    }
  }

}
