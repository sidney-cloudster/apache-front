import { Component, OnInit} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { GarantiaService } from '../../_services/garantia.service';
import { CarrinhoCompraService } from '../../_services/carrinho-compra.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-garantia',
  templateUrl: './garantia.component.html',
  styleUrls: ['./garantia.component.css']
})

export class GarantiaComponent implements OnInit {
  
  public nome:string;
  public imagem:string;
  public idProduto:number;
  public skuProduto:string;
  public idSeller:number;
  public garantia:any = [];
  private slug:any;
  public produto:any;
  public _idServico:number;
  public _nomeGarantia:any;
  public _valorGarantia:any;
  public _idServiceRules:any;

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private sCarrinho:CarrinhoCompraService,
    private sGarantia:GarantiaService){}

  ngOnInit() {
    this.route.params.subscribe(params => {
      $(".loading").fadeIn(0);
      let garantiaSelecionada;
      this.idProduto  = parseInt(params.id);
      this.idSeller   = parseInt(params.idseller);
      this.skuProduto = params.skuproduto;
      this.slug       = params.slug;

      if(Number.isInteger(this.idProduto) && Number.isInteger(this.idSeller) && this.skuProduto){
        this.sGarantia.getGarantiaEstendida(this.idProduto,this.skuProduto,this.idSeller).subscribe(r => {      
          console.log(r);
          this.produto = this.sCarrinho.getProdutosCarrinhoById(r[0].id,r[0].sellers[0].idSeller,r[0].sellers[0].gradeSeller[0].sku);
          console.log(this.produto);
          if(this.produto == '' || this.produto.length <= 0){
            this.router.navigate(['/produto',this.idProduto,this.slug]);
          }else{
            r.forEach(e => {      
              this.nome            = e.nome,
              this.imagem          = e.images[0].images,
              this.garantia        = e.sellers[0].garantia,
              garantiaSelecionada = e.sellers[0].garantia[0];
            });
            this.escolhaGarantia(garantiaSelecionada);
          }
        },
        error => {
          this.router.navigate(['/produto',this.idProduto,this.slug]);
        },
        () => {
          $(".loading").fadeOut(0);
        });
      }else{
        this.router.navigate(['/produto',this.idProduto,this.slug]);
      }
    })
  }

  escolhaGarantia(g:any){
    this._idServico     = g.idServices;
    this._nomeGarantia  = g.nome;
    this._valorGarantia = g.valor;
    this._idServiceRules= g.idServiceRules;
  }
  // **************************** FRONT ******************************

  btnContinuarCompra(idservico:any,idrules:any){
    $(".btn-g-comprar").attr('disabled', 'disabled');
    this.produto.garantias = this.sGarantia.getGarantiaById(this.garantia,idservico);
      if(this.sCarrinho.setProdutoCarrinho(this.produto,1)){
        this.router.navigate(['compras/carrinho-compra']);
      }else{
        alert("FALHA AO INSERIR GARANTIA!");
      }
      $(".loading").fadeIn(0);
  }
}
