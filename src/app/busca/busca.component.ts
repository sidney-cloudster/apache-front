import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuscaService } from '../_services/busca.service';
import * as $ from 'jquery';
import { MarketingService } from '../_services/marketing.service';
import { DadosService } from '../_services/dados.service';
import { UserService } from '../_services/user.service';
@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.css']
})
export class BuscaComponent implements OnInit {
  
  
  public textoBusca:String; 
  public produtoLista:any = [];
  public nomeSellerUrl;
  public categoriaSeller;
  public descontoSeller;
  public preco;
  public paginaCarregada:boolean;
  public qtdProdutos = 0;
  public itemsPerPage:number = 16; // Produtos por página;
  public p:number = 1;
  public paginaNaoEncontrada:boolean = false;

  constructor(
    private router:ActivatedRoute,
    private sBusca:BuscaService,
    private sMarketingService:MarketingService,
    private sDados:DadosService,
    private sUser:UserService
  ) {
    this.sMarketingService.camposURL(location.search.slice(1));
  }

  ngOnInit() {
    
    this.router.params.subscribe(dados => {
      this.paginaCarregada = false;
      this.paginaNaoEncontrada = false;
      this.textoBusca = dados.texto;
      if(this.textoBusca){
        $(".loading").fadeIn(0);
        this.sBusca.resultadoBusca(this.textoBusca).subscribe((r) =>{
          this.qtdProdutos  = r.products.length;
          if(r.products.length > 0){
            this.produtoLista = r.products;
          }
        },
        (error) => {
          this.paginaNaoEncontrada = true;
          this.paginaCarregada = true;
          $(".loading").fadeOut(500);
        },
        () =>{
          $(".loading").fadeOut(500);
          this.paginaCarregada = true;
        });
      }
    });
  }
  getEstrelaByProduto(qtdEstrela) {
    return this.sDados.getEstrelaAvaliacao(qtdEstrela);
  }
  // RETORNA UM LINK PARA ADICIONAR NO ROUTERLINK DO HTML ['/compras','carrinho-compra]
  public getLinkArray(urlBase,link:String){
    let v = link.split("/");
    let r = [urlBase];
    for(let l of v){
      r.push(l);
    }
    return r;
  }
}
