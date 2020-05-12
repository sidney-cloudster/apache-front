import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CasamentoService } from 'src/app/_services/_casamento/casamento.service';
import { ProdutoService } from 'src/app/_services/produto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-busca-casamento',
  templateUrl: './busca-casamento.component.html',
  styleUrls: ['../casamento.component.css'],
  providers: [DatePipe]
})
export class BuscaCasamentoComponent implements OnInit {
  
  public casamento: string;
  public myDate:Date = new Date();
  public date: string;
  public casal: string;
  public notFound: string = '';
  constructor(
    private sCasamento: CasamentoService, 
    private datePipe: DatePipe,
    private sProduto:ProdutoService,
    private router:Router) { }

  ngOnInit() {
    this.date = this.datePipe.transform(this.myDate, 'dd/MM/yyyy');
    this.sCasamento.listWendding().subscribe(data => {
      this.casamento = data;
      console.log(this.casamento);
      this.notFound  = '';
    },
    e=>{
      this.notFound = 'Nenhum casamento foi encontrado.';
    });
  }

  setValue(url){
    let u = [];
    let v = url.split("/");
    let id= v[2];
    for(let a of v){
      u.push(a);
    }
    localStorage.setItem("id_menu",id);
    this.router.navigate(u);
  }
  // TRANSFORMA O LINK STRING '/61/link-tv' EM ARRAY [61,'link-tv'] PARA UTILIZAR NO ROUTERLINK
  public getLinkArray(urlBase:any,link:String){
    let v = link.split("/");
    let b = urlBase.split("/");
    let r = [];
    for(let a of b){
      r.push(a);
    }
    for(let l of v){
      r.push(l);
    }
    return r;
  }
}
