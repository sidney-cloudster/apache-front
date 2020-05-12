import { Component, OnInit } from '@angular/core';
import { configEnvi } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { InfoCasamentoService } from 'src/app/_services/_casamento/info-casamento.service';
import { CasamentoService } from 'src/app/_services/_casamento/casamento.service';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-layout-casamento',
  templateUrl: './layout-casamento.component.html',
  styleUrls: ['../casamento.component.css']
})
export class LayoutCasamentoComponent implements OnInit {

  public customer:any;
  
  constructor(
    public sConfig:configEnvi,
    public HttpClient: HttpClient,
    public datepipe: DatePipe,
    private sInfoCasamento:InfoCasamentoService,
    private sCasamento:CasamentoService,
    private sUser:UserService,
    private router:Router
  ) { }

  ngOnInit() {
    this.customer = this.sUser.getCustomer();
    if(!this.sInfoCasamento.getInfoNoivos()){
      this.router.navigate(["/casamento"]);
    }
    
  }

  public getLogo(){
    return this.sConfig.getLogo();
  }

}
