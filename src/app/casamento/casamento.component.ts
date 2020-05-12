import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { CasamentoService } from '../_services/_casamento/casamento.service';
import { InfoCasamentoService } from '../_services/_casamento/info-casamento.service';
import { Router } from '@angular/router';
import { DadosService } from '../_services/dados.service';
import { VendedorService } from '../_services/vendedor.service';
@Component({
  selector: 'app-casamento',
  templateUrl: './casamento.component.html',
  styleUrls: ['./casamento.component.css']
})
export class CasamentoComponent implements OnInit {

  public customer;
  public redireciona:any = ['/'];
  public layouts:any = [
    {
      texto:'Você já está logado.',
      texto1:'Acesse o seu painel e gerencie o seu casamento.',
      link:{
        botao:'Acessar painel.',
        href:['/casamento','painel']
      }
    },
    {
      texto:'Criar conta.',
      texto1:'Uma solução completa e totalmente grátis para a sua lista de presentes.',
      link:{
        botao:'Criar lista.',
        href:['/casamento','criar-lista']
      }
    }
  ];
  public layoutAplicado:any = {};

  constructor(
    private sUser: UserService,
    private sCasamento: CasamentoService,
    private sInfoCasamento:InfoCasamentoService,
    private router:Router,
    private sDados:DadosService,
    private sVendedor:VendedorService) {
      if(this.sVendedor.getVendedor()){
        this.sVendedor.logout();
      }
    this.customer = this.sUser.getCustomer();
  }

  ngOnInit() {

    var div       = document.getElementById("title-home");
    var p         = document.getElementById('desc-home');
    var href_link = document.getElementById('link-home');

    if(this.customer){
      this.sCasamento.getWenddingConfig(this.customer.cpfCnpj).subscribe(r => {
        if(r != null || r != undefined || r != ''){
          let dados:any = r;
          dados.cpfCnpj = this.customer.cpfCnpj;
          this.sInfoCasamento.setInfoNoivos(dados);
          this.layoutAplicado = this.layouts[0];
        }else{
          // REDIRECIONA
          this.router.navigate(['/']);
        }
        
      }, error => {
        this.layoutAplicado = this.layouts[1];
      })
    }else{
      this.layoutAplicado = this.layouts[1];
    }
  }

  objetoIsEmpty(obj:any){
    return this.sDados.objetoIsEmpty(obj);
  }

}
