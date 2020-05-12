import { Component, OnInit } from '@angular/core';
import { CasamentoService } from 'src/app/_services/_casamento/casamento.service';
import { ActivatedRoute, Router } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { ProdutoService } from 'src/app/_services/produto.service';
import { FavoriteService } from 'src/app/_services/favorite.service';
import { RequisicoesService } from 'src/app/_services/requisicoes.service';
import { DadosService } from 'src/app/_services/dados.service';
import { CarrinhoCompraService } from 'src/app/_services/carrinho-compra.service';
import { FreteService } from 'src/app/_services/frete.service';
import { UserService } from 'src/app/_services/user.service';
import { ConfiguracaoService } from 'src/app/_services/configuracao.service';
import Swal from 'sweetalert2';
import { InfoCasamentoService } from 'src/app/_services/_casamento/info-casamento.service';

@Component({
  selector: 'app-lista-convidados',
  templateUrl: './lista-convidados.component.html',
  styleUrls: ['../casamento.component.css']
})
export class ListaConvidadosComponent implements OnInit {
  
  public id: string;
  public array: string;
  public images = [];
  public collection = { count: 0, data: [] }
  public searchText;
  public arrayCat: string;
  public arrayPrecos: string;
  public arrayFilter: [];
  public json;
  public array_range;
  public gradeX: any = [];
  public gradeY: any = [];
  public nome: String;
  public descricaominima: String;
  public productInfo: String;
  public marca: String;
  public largura: String;
  public altura: String;
  public profundidade: String;
  public cubage: String;
  public peso: string;
  public categoria: String;
  public subcategoria: String;
  public sellers: any = [];
  public preco: String;
  public preco_promocional: String;
  public estrelas: number;
  public messages: any;
  public freteCalculado: boolean = false;
  public messages_qtd: number;
  public imagesGradeX: any;
  public imagemPrincipal: any;
  public maxCompra: number;
  public produtoFavorito;
  public produtoSeller: any = '';
  public QtdMensagem;
  public cep;
  public infoCep: any = [];
  public alertaFrete: any;
  public atributos: any;
  public customer;
  public idgradeXcompra;
  public idgradeYcompra;
  public idsellerCompra;
  public sellerPreco = [];
  public gradeyDisponiveis = [];
  public menorPrecoBox;
  public dimensoes;
  public urlOfertas;
  public myThumbnail;
  public myFullresImage;
  public maxSize: number = 12;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
    previousLabel: '',
    nextLabel: '',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };

  public config = {
    itemsPerPage: 0,
    currentPage: 0,
    totalItems: 0
  };
  public idSeller;
  public notfound = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sProduto: ProdutoService,
    private sCarrinho: CarrinhoCompraService,
    private sUser: UserService,
    private sCookie: CookieService,
    private sCasamento: CasamentoService,
    private sConfiguracao: ConfiguracaoService,
    private sInfoCasamento:InfoCasamentoService) { 
      this.customer = this.sUser.currentUserValue; 
    }


  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get("id_casal");
    localStorage.setItem("id_menu",this.id);
    this.sCasamento.listWenddingPage(this.id).subscribe(dados => {
      this.sInfoCasamento.setInfoNoivosConvidado(dados);
    })
    
    this.sCasamento.listProdutosConvidado(this.id).subscribe(product => {
      this.notfound = '';
      this.array    = product["products"];
      this.idSeller = product['products'][0].sellers[0];
      this.produtoSeller = this.idSeller;
      for (let index = 0; index < this.array.length; index++) {
        this.images.push(this.array[index]);
        this.collection.data.push(this.array[index]);
        this.collection.count = this.array.length;
      }
      this.config = {
        itemsPerPage: 12,
        currentPage: 1,
        totalItems: this.collection.count
      };
    },
    e=>{
      this.notfound = 'Nenhum produto foi encontrado.';
    })

  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  private getSellerSelecionadoById(sellerId) {
    var sellerSelected;
    for (var i = 0; i < this.sellers.length; i++) {
      if (sellerId == this.sellers[i].idSeller) {
        sellerSelected = this.sellers[i];
      }
    }
    return sellerSelected;
  }

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
  
  btnComprar(produtoSeller: any, tipoCompra: string) {
    let jsonCompra, seller, gradex, gradey, produtosCarrinho, garantia, descx, descy, skuproduto, skuSeller, urlFrete, dimensoes,
      jsonCadastroSessao, carrinhoSessao, userLogin, email = '',categoriamkt;

    if ((this.gradeX.length > 0) && this.idgradeXcompra == undefined || this.idgradeXcompra == "") {
      alert("grade X em branco");
    } else if ((this.gradeY.length > 0) && this.idgradeYcompra == undefined || this.idgradeYcompra == "") {
      alert("grade Y em branco");
    } else if (this.idsellerCompra != undefined || this.idsellerCompra == "") {
      alert("seller não selecionado");
    } else {
      categoriamkt = this.categoria+'|'+this.subcategoria;
      seller = this.getSellerSelecionadoById(this.idsellerCompra);
      gradex = this.sProduto.getDadosGrade(this.gradeX, this.idgradeXcompra, 'x');
      gradey = this.sProduto.getDadosGrade(this.gradeY, this.idgradeYcompra, 'y');

      console.log("PRODUTO SELLER: ", this.produtoSeller);

      garantia = produtoSeller.garantia;
      skuproduto = produtoSeller.skuProduto;
      skuSeller = produtoSeller.skuSeller;
      urlFrete = produtoSeller.urlFrete;
      dimensoes = {
        altura: produtoSeller.altura,
        largura: produtoSeller.largura,
        comprimento: produtoSeller.comprimento,
        cubage: produtoSeller.cubage
      }
      produtosCarrinho = this.sCarrinho.getProdutosCarrinho();

      userLogin = this.sUser.getCustomer();

      if (garantia.length <= 0) {
        jsonCompra = this.sCarrinho.getJsonCompra(
          this.id,
          this.nome,
          categoriamkt,
          this.imagemPrincipal,
          this.idsellerCompra,
          this.produtoSeller.sellerName,
          gradey,
          gradex,
          skuproduto,
          skuSeller,
          urlFrete,
          dimensoes,
          produtoSeller.quantidade,
          produtoSeller.slug,
          this.maxCompra,
          'casamento',
          '',
          '',
          '',
          '');
        email = (userLogin) ? userLogin.cusEmail : '';

        jsonCadastroSessao = this.sCarrinho.getDadosCadastroSessao(skuproduto, null, produtoSeller.quantidade,0, email);

        if (this.gradeY.length > 0) {
          Swal.fire({
            title: 'Produto ' + gradey[0].descricao + ' ' + gradey[0].titulo,
            text: 'Deseja continuar?',
            icon: 'warning',
            showCancelButton: true,
            reverseButtons: true,
            cancelButtonText: 'Não, voltar',
            confirmButtonText: 'Sim'
          }).then(
            (result) => {
              if (result.value) {
                if (!this.sCarrinho.setProdutoCarrinho(jsonCompra, 1)) {
                  alert("ITEM NAO INSERIDO!");
                } else {
                  this.sProduto.getEstoqueProduto(skuproduto, produtoSeller.quantidade).subscribe(() => {
                    this.sCarrinho.cadastroSessaoCarrinho(jsonCadastroSessao).subscribe(v => {
                      if (v.Code == "success") {
                        if (produtosCarrinho.length <= 0) {
                          this.sCarrinho.setLocalStorageCadastroSessao(v.session, v.cookie);
                          console.log("CARRINHO SEM PRODUTOS --- SEM GARANTIA", v);
                        } else {
                          console.log("CARRINHO COM PRODUTOS --- SEM GARANTIA", v);
                        }
                      }
                    });
                    if (tipoCompra == 'comprar') {
                      this.router.navigate(['compras/carrinho-compra']);
                    }
                  },
                    e => {
                      Swal.fire(
                        'Ops!',
                        'Este produto não tem estoque.',
                        'error'
                      )
                    })
                }
              } else {

              }
            },
            e => {

            });
        } else if (this.gradeX.length > 0) {
          if (!this.sCarrinho.setProdutoCarrinho(jsonCompra, 1)) {
            alert("ITEM NAO INSERIDO!");
          }
          this.sCarrinho.cadastroSessaoCarrinho(jsonCadastroSessao).subscribe(v => {
            if (v.Code == "success") {
              if (produtosCarrinho.length <= 0) {
                this.sCarrinho.setLocalStorageCadastroSessao(v.session, v.cookie);
                console.log("CARRINHO SEM PRODUTOS --- SEM GARANTIA", v);
              } else {
                console.log("CARRINHO COM PRODUTOS --- SEM GARANTIA", v);
              }
            }
          });
        }
      } else {
        if (this.gradeY.length > 0) {
          Swal.fire({
            title: 'Produto ' + gradey[0].descricao + ' ' + gradey[0].titulo,
            text: 'Deseja continuar?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Não, voltar',
            confirmButtonText: 'Sim'
          }).then((result) => {
            if (result.value) {
              this.router.navigate(['garantia/', this.id, produtoSeller.slug, produtoSeller.idSeller, produtoSeller.skuProduto]);
            }
          });
        } else {
          this.router.navigate(['garantia/', this.id, produtoSeller.slug, produtoSeller.idSeller, produtoSeller.skuProduto]);
        }
      }
    }
  }

}
