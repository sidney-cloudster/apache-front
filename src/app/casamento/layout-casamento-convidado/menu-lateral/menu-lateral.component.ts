import { Component, OnInit, Inject } from '@angular/core';
import { CarrinhoCompraService } from 'src/app/_services/carrinho-compra.service';
import { ProdutoService } from 'src/app/_services/produto.service';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { InfoCasamentoService } from 'src/app/_services/_casamento/info-casamento.service';
import { CookieService } from 'ngx-cookie-service';
import { CasamentoService } from 'src/app/_services/_casamento/casamento.service';
@Component({
  selector: 'app-menu-lateral-convidado',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['../../casamento.component.css']
})
export class MenuLateralConvidadoComponent implements OnInit {
  
  public id: string;
  public array: string;
  public customer;
  public qtdFavorito:number = 0;
  public produtos:any = [];
  public totalCompra:number = 0;
  

  constructor(
    private sCarrinho:CarrinhoCompraService,
    private sProduto:ProdutoService,
    private sInfoCasamento:InfoCasamentoService,
    private cookieService:CookieService,
    private sCasamento:CasamentoService,
    // @Inject(LOCAL_STORAGE)
  ) {}


  private setProdutos(produtos:any){
    this.produtos = produtos;
  }
  
  getProdutos(){
    return this.produtos;
  }

  private resetTotalCompra(){
    this.totalCompra = 0;
  }

  private setTotalCompra(totalCompra:any){
    this.totalCompra += totalCompra;
  }

  private setPrecoProduto(produto,arrayPreco:any,p:number){
    produto.total = parseFloat(arrayPreco[0].total);
    produto.preco = parseFloat(arrayPreco[0].preco);
    
    this.setTotalCompra(produto.total);
  }

  public carrinhoCompra(){
    let box = document.querySelector(".box-carrinho");
    box.classList.add("ready");
    this.getProdutosCarrinho();
  }
  public closeCarrinho(){
    let box = document.querySelector(".box-carrinho");
    box.classList.remove("ready");
  }

  ngOnInit() {
    this.id  = localStorage.getItem("id_menu");
    let info = this.sInfoCasamento.getInfoNoivosConvidado();
  
    this.sCasamento.listWenddingPage(this.id).subscribe(item => {
        this.sInfoCasamento.setInfoNoivosConvidado(item);
        this.setInfoMenu(item);
    })
  }

  setInfoMenu(dados:any){
    this.array = dados;
  }

  getInfoMenu(){
    return this.array;
  }


  getProdutosCarrinho(){
    let produto = this.sCarrinho.getProdutosCarrinho();    
    this.setProdutos(produto);
    let produtos = this.getProdutos();
    this.resetTotalCompra();
    
    if(produtos.length > 0){
        produtos.forEach((v,k) => {
          this.sProduto.getPrecoProduto(v.id,v.skuProduto,v.quantidade).subscribe(
            r =>{
              this.setPrecoProduto(v,r,k);
            },
            e =>{
              $(".crt-it").find("#listaCarrinho-"+k).fadeIn(700);
            },
            () =>{
              $(".crt-it").find("#carrinhoLoading-"+k).fadeOut(0,() =>{
                $(".crt-it").find("#listaCarrinho-"+k).fadeIn(700);
              }); 
            });
      });
    }
  }

}
