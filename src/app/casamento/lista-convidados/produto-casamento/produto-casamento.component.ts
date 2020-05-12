import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoriteService } from '../../../_services/favorite.service';
import { RequisicoesService } from '../../../_services/requisicoes.service';
import { ProdutoService } from '../../../_services/produto.service';
import { DadosService } from '../../../_services/dados.service';
import { CarrinhoCompraService } from '../../../_services/carrinho-compra.service';
import { FreteService } from '../../../_services/frete.service';
import Swal from 'sweetalert2'
import * as $ from 'jquery';
import { UserService } from '../../../_services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { ConfiguracaoService } from '../../../_services/configuracao.service';
import { CasamentoService } from 'src/app/_services/_casamento/casamento.service';
import { NgProgressRef } from 'ngx-progressbar';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Form } from '@angular/forms';
import { AvaliacaoService } from 'src/app/_services/avaliacao.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-produto-casamento',
  templateUrl: './produto-casamento.component.html',
  styleUrls: ['./produto-casamento.component.css']
})
export class ProdutoCasamentoComponent implements OnInit {

  private progressBar:NgProgressRef;
  public carouselProduto: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<span class="material-icons">chevron_left</span>', '<span class="material-icons">chevron_right</span>'],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }
  public thumbOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    nav: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 4
      }
    }
  }
  public compraDisabled:boolean = false;
  public freteDisabled:boolean = false;
  public btnsDisabled:any  = [];
  public id: number;
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
  public gradeX: any = [];
  public gradeY: any = [];
  public images: any = [];
  public estrelas: number;
  public messages: any;
  public freteCalculado: boolean = false;
  public messages_qtd: number;
  public imagesGradeX: any;
  public imagemPrincipal: any;
  public link: string;
  public maxCompra: number;
  public components: any;
  public garantia: any;
  public produto;
  public QuantidadeSellers;
  public produtoFavorito;
  public produtoSeller: any = '';
  public stars;
  public starsMedia;
  public avaliacao;
  public mediaAvaliacao;
  public QtdMensagem;
  public cep;
  public infoCep: any = [];
  public breadcrumb = {};
  public alertaFrete: any;
  public atributos: any;
  public customer;
  public imagemAvaliacao:any;
  public link_categoria:any;
  public link_subcategoria:any;
  public manualImagem:any;
  public manualDocumento:any;
  dadosFrete = [];
  isBoxSeller:boolean = false;
  sellerData = [];
  idgradeXcompra;
  idgradeYcompra;
  idsellerCompra;
  sellerPreco = [];
  gradeyDisponiveis = [];
  menorPrecoBox;
  dimensoes;
  urlOfertas;
  myThumbnail;
  myFullresImage;
  array = [];
  // CONFIG
  public paginaCarregada: boolean = false;
  /*CARROSSEL*/
  outPutTitulo: any;
  outPutProdutosCarrossel: any;
  outPutArrayQtdItens: any = [1, 3, 4, 5];
  id_casal: string;
  casal: string;
  // CONFIG
  cores;
  public cepClient:any;
  public cepCalculado:any;
  private scrollShow;
   // FORMULARIO AVALIAÇÃO
   public listForm = new FormGroup
   ({
     id: new FormControl(''),
     nome: new FormControl(this.sUser.getCustomer().cusCompanyName),
     email: new FormControl(this.sUser.getCustomer().cusEmail),
     estrelas: new FormControl(''),
     recomendar: new FormControl(''),
     titulo_avaliacao: new FormControl(''),
     avaliacao: new FormControl(''),
     termos: new FormControl(''),
   })
   
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private favorito: FavoriteService,
    private sRequisicao: RequisicoesService,
    private sProduto: ProdutoService,
    private sDados: DadosService,
    private sCarrinho: CarrinhoCompraService,
    private sFrete: FreteService,
    private sUser: UserService,
    private cookieService: CookieService,
    private sCasamento: CasamentoService,
    private sConfiguracao:ConfiguracaoService,
    private _snackBar: MatSnackBar,
    private sAvaliacaoService:AvaliacaoService) { 
      this.customer = this.sUser.currentUserValue; 
      this.cepClient = localStorage.getItem('product_frete')?JSON.parse(localStorage.getItem('product_frete')):'';
      this.cepCalculado = (this.cepClient != '')?this.cepClient.frete:'';
  }

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      if (params) {
        $(".loading").fadeIn(0);
        this.id = parseInt(params.id);
        if (Number.isInteger(this.id)) {
          this.sProduto.getProduto(this.id).subscribe(r => {
            this.paginaCarregada = false;       
            r.forEach(produto => {
              this.id   = produto.id;
              this.nome = produto.nome;
              this.descricaominima = produto.descricaominima;
              this.productInfo = produto.productInfo;
              this.marca = produto.marca;
              this.largura  = produto.largura;
              this.altura   = produto.altura;
              this.profundidade = produto.profundidade;
              this.peso     = produto.peso;
              this.cubage   = produto.cubage;
              this.categoria= produto.categoria;
              this.subcategoria = produto.subcategoria;
              this.sellers  = produto.sellers;
              this.preco    = produto.preco;
              this.preco_promocional = produto.preco_promocional;
              this.gradeX   = produto.gradeX;
              this.gradeY   = produto.gradeY;
              this.images   = produto.images;
              this.imagemAvaliacao = produto.images[0].images;
              this.estrelas = produto.estrelas;
              this.messages = produto.messages;
              this.messages_qtd    = this.messages.length;
              this.imagesGradeX    = this.images;
              this.imagemPrincipal = this.images[0].images;
              this.link       = produto.link;
              this.maxCompra  = produto.limiteCompra;
              this.components = produto.componentes;
              this.atributos  = produto.atributos;
              this.link_categoria    = produto.link_categoria;
              this.link_subcategoria = produto.link_subcategoria;
              this.manualImagem = produto.manual[0].images;
              this.manualDocumento = produto.manual[0].documentos;
              this.dimensoes  = {
                altura: this.altura,
                largura: this.largura,
                profundidade: this.profundidade,
                cubage: this.cubage,
                peso: this.peso
              }
              let linkSplit = this.link.split("/");
            });

            this.isBoxSeller = (this.sellers.length > 1)?true:false;
            this.paginaCarregada = true;
            this.setCarrossel();
            this.stars = this.sDados.getEstrelaAvaliacao(this.estrelas);
            this.setAvaliacao(this.messages);
            this.mediaAvaliacao = this.getMediaAvaliacao(this.avaliacao);
            this.starsMedia = this.sDados.getEstrelaAvaliacao(this.mediaAvaliacao);
            
            if (this.gradeX.length > 0 && this.gradeY.length > 0) {
              this.selecionaGradexAleatorio();
              this.selecionaPrimeiraGradeY();
            } else if (this.gradeX.length > 0 && this.gradeY.length <= 0) {
              this.selecionaGradexAleatorio();
            } else if (this.gradeX.length <= 0 && this.gradeY.length > 0) {
              this.gradeyDisponiveis = this.gradeY;
              this.selecionaPrimeiraGradeY();
            }else{
              this.verificaGradeN(0);
            }
            $(".loading").fadeOut(500);
          },
            e => {
              $(".loading").fadeOut(500, () => {
                this.router.navigate(['/']);
              });
              console.log("ERRO AO BUSCAR PRODUTO", e);
            });
        } else {
          //redireciona
        }
      } else {
        //redireciona
      }
    });
  }


  private setCarrossel() {
    let pre1 = this.components.item_pre1;
    this.outPutTitulo = pre1.titulo;
    for (let prodpre1 of pre1.products) {
      prodpre1.estrelasIcon = this.sDados.getEstrelaAvaliacao(prodpre1.estrelas);
    }
    this.outPutProdutosCarrossel = pre1.products;
  }


  private setAvaliacao(arrayAvaliacao: any) {
    let i;
    this.avaliacao = arrayAvaliacao;
    for (i = 0; i < this.avaliacao.length; i++) {
      this.avaliacao[i].estrelasIcon = this.sDados.getEstrelaAvaliacao(this.avaliacao[i].estrelas);
    }
  }

  // private buscaMelhorPrecoSeller(){
  //   let menorvalor;
  //   const sellersOrder = this.sellerPreco.sort((a,b) => a.preco - b.preco).map((resultado, index, array) => resultado);

  //   menorvalor = sellersOrder[0].preco;
  //   return menorvalor;
  // }

  private ordenarGradeY(grade) {
    this.gradeyDisponiveis = grade.sort((a, b) => a.idGradeY - b.idGradeY).map((resultado, index, array) => resultado);
  }

  private selecionaGradexAleatorio() { // AO CARREGAR A PAGINA, SELECIONA ALEATORIAMENTE A GRADEX
    let gradexRandom;
    let idgradex;
    gradexRandom = Math.floor(Math.random() * this.gradeX.length);
    idgradex = this.gradeX[gradexRandom].idGradeX;
    this.verificaGradeX(idgradex);
  }

  private selecionaPrimeiraGradeY() { // SELECIONA A PRIMEIRA GRADEY DISPONIVEL
    let idgradey;
    if (this.gradeyDisponiveis.length > 0) {
      idgradey = this.gradeyDisponiveis[0].idGradeY;
      this.verificaGradeY(idgradey);
    }
  }

  selecionaSeller(sellerId: number) { // MOSTRA DADOS DO VENDEDOR (PREÇO, PARCELA, VENDIDO E ENTREGUE)
    var i, y;
    this.idsellerCompra = sellerId;
    if (this.sellerPreco.length > 0) {
      for (i = 0; i < this.sellerPreco.length; i++) {
        if (sellerId == this.sellerPreco[i].idSeller) {
          this.produtoSeller = this.sellerPreco[i];       
          
          this.selecionaPrimeiroSeller(sellerId); // FRONT

          break;
        }
      }
    }    
  }


  private listaSellers(idgrade:number, gradeType: any = '',isClick:boolean = false) {
    let i, y, slug;
    this.sellerPreco = []; // LIMPA
    this.freteCalculado = false;
    
    if (idgrade != undefined || idgrade != null) {
      for (i = 0; i < this.sellerData.length; i++) {
        for (y = 0; y < this.sellerData[i].gradeSeller.length; y++) {
          if (
            (
              this.idgradeXcompra == this.sellerData[i].gradeSeller[y].idGradeX &&
              idgrade == this.sellerData[i].gradeSeller[y].idGradeY &&
              gradeType == 'y'
            )
            ||
            (
              this.idgradeXcompra == this.sellerData[i].gradeSeller[y].idGradeX &&
              gradeType == 'x'
            )
            ||
            (
              idgrade == this.sellerData[i].gradeSeller[y].idGradeY &&
              gradeType == 'y'
            )
            ||
            (
              idgrade == 0 && gradeType == 'n'
            )
          ) {
            slug = this.link.split("/");

            this.sellerPreco.push({
              idSeller: this.sellerData[i].idSeller,
              sellerName: this.sellerData[i].sellerName,
              preco: this.sellerData[i].gradeSeller[y].preco,
              skuSeller: this.sellerData[i].gradeSeller[y].skuSeller,
              skuProduto: this.sellerData[i].gradeSeller[y].sku,
              quantidade: 1,
              urlFrete: this.sellerData[i].urlFrete,
              cubage: this.sellerData[i].gradeSeller[y].cubage,
              largura: this.sellerData[i].gradeSeller[y].largura,
              altura: this.sellerData[i].gradeSeller[y].altura,
              comprimento: this.sellerData[i].gradeSeller[y].comprimento,
              garantia: this.getGarantiaSeller(this.sellerData[i].idSeller),
              montagem: this.getMontagemSeller(this.sellerData[i].idSeller),
              urlGarantia: '?sellerId=' + this.sellerData[i].idSeller + '&skuProduto=' + this.sellerData[i].gradeSeller[y].sku,
              slug: slug[1],
              parcelamento:this.sellerData[i].gradeSeller[y].parcelamento,
              maxParcSJuros:this.getQtdParcelasSemJuros(this.sellerData[i].gradeSeller[y].parcelamento),
              frete: {
                shippingCost: 0,
                deliveryTime: 0,
                shippingEstimateId: "",
                shippingMethodId: "",
                shippingMethodName: "",
                shippingMethodDisplayName: ""
              }
            });            
          }
        }
      }
      let id = (this.sellerPreco.length > 0)?this.sellerPreco[0].idSeller:0;
      // if(
      //   (isClick && idgrade == this.getGradeYBySeller(this.getIdSellerbyName(this.nameSeller))) || 
      //   isClick == false && this.getIdSellerbyName(this.nameSeller) > 0){
      //   id = this.getIdSellerbyName(this.nameSeller);
      // }else{
      //   id = (this.sellerPreco.length > 0)?this.sellerPreco[0].idSeller:0;
      // }

      if(id > 0){
        let array = [];
        for(let sp of this.sellerPreco){
          if(sp.idSeller == id){
            array.push(sp);
            this.selecionaSeller(sp.idSeller);
          }
        }
        for(let sp of this.sellerPreco){
          if(sp.idSeller != id){
            array.push(sp);
          }
        }
        if(array.length > 0){
          this.sellerPreco = array;
        }
      }else{
        this.sellerPreco    = [];
        this.idgradeXcompra = '';
        this.idgradeYcompra = '';
        this.idsellerCompra = '';
      }
    }    
    this.QuantidadeSellers = this.sellerPreco.length;    
  }

  
  // *********** FUNÇÕES QUANDO EXISTER SELLER NA URL ***********
  // RETORNA O ID DO SELLER DE ACORDO COM NOME
  private getIdSellerbyName(nameSeller:String){
    let nome;
    if(nameSeller != ''){
      for(let seller of this.sellers){
        nome = seller.sellerName;
        if(nameSeller == nome.toLowerCase()){
          return seller.idSeller;
        }
      }
    }
    return false;
  }

  private getGradeYBySeller(id:number){
    if(id){
      for(let seller of this.sellers){
        if(id == seller.idSeller){
          for(let grade of seller.gradeSeller){
            return grade.idGradeY;
          }
        }
      }
    }
    return 0;
  }

  private getQtdParcelasSemJuros(parcelas:any){
    let maxParcela;
    if(parcelas.length > 0){
      for(let p of parcelas){
        if(p.taxa == ""){
          maxParcela = p;
        }
      }
    }
    return maxParcela;
  }

  private getGarantiaSeller(idSeller: number) {
    let i, garantia: any = [];
    for (i = 0; i < this.sellers.length; i++) {
      if (idSeller == this.sellers[i].idSeller) {
        garantia = this.sellers[i].garantia;        
        break;
      }
    }
    return garantia;

  }
  private getMontagemSeller(idSeller: number) {
    let i, montagem: any = [];
    for (i = 0; i < this.sellers.length; i++) {
      if (idSeller == this.sellers[i].idSeller) {
        montagem = this.sellers[i].montagem;        
        break;
      }
    }
    return montagem;
  }

  /*SELLER*/
  private compararSellerId(idseller: number) {
    let j, i;
    let v;
    for (j = 0; j < this.sellerData.length; j++) {
      if (this.sellerData[j].idSeller == idseller) {
        v = true;
      }
    }
    return v;
  }

  private getSellersByGradeXY(idgrade: number = 0, tipoGrade: any = '') {
    let i, y, j;
    j = 0;
    this.sellerData = [];
    this.idgradeXcompra = (tipoGrade == 'x') ? idgrade : this.idgradeXcompra;

    for (i = 0; i < this.sellers.length; i++) {
      for (y = 0; y < this.sellers[i].gradeSeller.length; y++) {
        if (tipoGrade == 'x') {
          if (idgrade == this.sellers[i].gradeSeller[y].idGradeX) {
            if (this.sellerData.length > 0 && !this.compararSellerId(this.sellers[i].idSeller)) {
              this.sellerData[j] = {
                idSeller: this.sellers[i].idSeller,
                sellerName: this.sellers[i].sellerName,
                urlFrete: this.sellers[i].urlFrete,
                gradeSeller: [
                  this.sellers[i].gradeSeller[y]
                ]
              }
              j++;
            // } else if (this.sellerData.length > 0 && this.compararSellerId(this.sellers[i].idSeller)) {
            //  this.sellerData[j - 1].gradeSeller.push(this.sellers[i].gradeSeller[y]);
            } else if (this.sellerData.length <= 0 && !this.compararSellerId(this.sellers[i].idSeller)) {
              this.sellerData[j] = {
                idSeller: this.sellers[i].idSeller,
                sellerName: this.sellers[i].sellerName,
                urlFrete: this.sellers[i].urlFrete,
                gradeSeller: [
                  this.sellers[i].gradeSeller[y]
                ]
              }
              j++;
            }
          }
        } else {
          if (this.sellerData.length > 0 && !this.compararSellerId(this.sellers[i].idSeller)) {
            this.sellerData[j] = {
              idSeller: this.sellers[i].idSeller,
              sellerName: this.sellers[i].sellerName,
              urlFrete: this.sellers[i].urlFrete,
              gradeSeller: [
                this.sellers[i].gradeSeller[y]
              ]
            }
            j++;
          //} else if (this.sellerData.length > 0 && this.compararSellerId(this.sellers[i].idSeller)) {
          //  this.sellerData[j - 1].gradeSeller.push(this.sellers[i].gradeSeller[y]);
          } else if (this.sellerData.length <= 0 && !this.compararSellerId(this.sellers[i].idSeller)){
            this.sellerData[j] = {
              idSeller: this.sellers[i].idSeller,
              sellerName: this.sellers[i].sellerName,
              urlFrete: this.sellers[i].urlFrete,
              gradeSeller: [
                this.sellers[i].gradeSeller[y]
              ]
            }
            j++;
          }
        }
      }
    }
    this.busca_gradeyDisponiveis();
  }

  private busca_gradeyDisponiveis() {
    let i, y, p, c;
    let gradeyjson = this.gradeY;
    let gradey = [];    
    c = 0;
    this.gradeyDisponiveis = []; // LIMPA GRADES Y 

    for (i = 0; i < this.sellerData.length; i++) {
      for (y = 0; y < this.sellerData[i].gradeSeller.length; y++) {
        for (p = 0; p < gradeyjson.length; p++) {
          if (gradeyjson[p].idGradeY == this.sellerData[i].gradeSeller[y].idGradeY) {
            gradey.push(gradeyjson[p]);
          }
        }
      }
    }
    this.ordenarGradeY(this.sDados.removerValoresDuplicados(gradey, "idGradeY"));
  }

  //SELLERS - SELECIONA A PRIMEIRA OPÇÃO, E CASO DE TROCA DE GRADEY, SELECIONA PRIMEIRA OPÇÃO NOVAMENTE

  private getMediaAvaliacao(avaliacao) {
    var qtdMsg = avaliacao.length;
    var notas = 0;
    var media;
    if (avaliacao) {
      for (var i = 0; i < avaliacao.length; i++) {
        notas += avaliacao[i].estrelas;
      }
      media = (notas / qtdMsg);
      if (isNaN(media)) {
        return 0;
      } else {
        return media;
      }
    } else {
      return 0;
    }
  }
  // private getEstrelaAvaliacao(quantidade:any){
  //   var estrela    = "";
  //   var maxEstrela = 5;
  //   for(var i = 1; i <= maxEstrela;i++){
  //     if(i <= quantidade){
  //       estrela += '<i class="uip-estrela-1"></i>';
  //     }else{
  //       estrela += '<i class="uip-estrela-3"></i>';
  //     }
  //   }
  //   return estrela;
  // }

  private getSellerSelecionadoById(sellerId) {
    var sellerSelected;
    for (var i = 0; i < this.sellers.length; i++) {
      if (sellerId == this.sellers[i].idSeller) {
        sellerSelected = this.sellers[i];
      }
    }
    return sellerSelected;
  }

  private mudaImagemGradeX(idGradeX) { // MUDAR AS IMAGENS DE ACORDO COM A GRADE X ESCOLHIDA
    var qtdImagens = this.images.length;
    var imagensDaGradeX = [];
    for (var i = 0; i < qtdImagens; i++) {
      if (idGradeX == this.images[i].idGradeX) {
        imagensDaGradeX[i] = this.images[i];
      }
    }

    // this.setGradexSelected(idGradeX);
    this.imagesGradeX = imagensDaGradeX.sort().filter(function () { return true });

  }

  private getUrlOfertas() {
    let urlbase = "/produto/";
    let url;
    let nomeGradex = '', nomeGradey = '';

    this.gradeX.forEach(gx => {
      if (this.idgradeXcompra == gx.idGradeX) {
        nomeGradex = gx.descricao;
      }
    });
    this.gradeY.forEach(gy => {
      if (this.idgradeYcompra == gy.idGradeY) {
        nomeGradey = gy.descricao;
      }
    });

    if (nomeGradex != '' && nomeGradey != '') {
      url = urlbase + this.link + "/ofertas/" + nomeGradex + "/" + this.idgradeXcompra + "/" + nomeGradey + "/" + this.idgradeYcompra;
    } else if (nomeGradex != '') {
      url = urlbase + this.link + "/ofertas/" + nomeGradex + "/" + this.idgradeXcompra + "/X";
    } else {
      url = urlbase + this.link + "/ofertas/" + nomeGradey + "/" + this.idgradeYcompra + "/Y";
    }

    return url;
  }

 // ******************************** FRONT **********************************

 verificaGradeX(idgrade: number) {

  this.getSellersByGradeXY(idgrade, 'x');
  this.selecionaPrimeiraGradeX_front(idgrade);
  //se exitir gradey para a gradex selecionada
  if (this.gradeyDisponiveis.length > 0) {
    this.selecionaPrimeiraGradeY();
  }
  //se não existir grade y, lista os sellers referente a grade x
  if (this.gradeY.length <= 0) {
    this.listaSellers(idgrade, 'x');
  }
  this.mudaImagemGradeX(idgrade);
  this.urlOfertas = this.getUrlOfertas();
}

verificaGradeY(idgrade,isClick:boolean = false) {
  if (this.gradeX.length <= 0) {
    this.getSellersByGradeXY(idgrade, 'y');
  }
  this.listaSellers(idgrade, 'y',isClick);
  this.selecionaPrimeiraGradeY_front(idgrade);
  this.idgradeYcompra = idgrade;
  this.urlOfertas = this.getUrlOfertas();
}

verificaGradeN(idgrade) {
  this.getSellersByGradeXY(idgrade, 'n');
  this.listaSellers(idgrade, 'n');
  this.urlOfertas = this.getUrlOfertas();
}

  dropdownGradeX() {
    $('.drop-down').attr('tabindex', 1).focus();
    $('.drop-down').toggleClass('active');
    $('.drop-down').find('.drop-down-menu').slideToggle(300);
  }
  focusoutGradeX() {
    $('.drop-down').removeClass('active');
    $('.drop-down').find('.drop-down-menu').slideUp(300);
  }


  selecionaPrimeiraGradeY_front(idGradeY) {
    $(document).ready(function () {
      $("#y" + idGradeY).prop("checked", true);
    });
  }
  selecionaPrimeiraGradeX_front(idGradeX) {
    $(document).ready(function () {
      $("#grade-" + idGradeX).prop("checked", true);
    });
  }

  selecionaPrimeiroSeller(idSeller) {
    $(document).ready(function () {
      $("#seller-box-" + idSeller).prop("checked", true);
    });
  }
  selecionaMontagem(montagem,event){
    let m = montagem;
    for(let i = 0; i < this.produtoSeller.montagem.length; i++){
      if(montagem.idServices == this.produtoSeller.montagem[i].idServices){
        if(!event.srcElement.checked){
          delete this.produtoSeller.montagem[i].checked;
        }else{
          this.produtoSeller.montagem[i].checked = 'T';
        }
      }
    }
  }
  btnComprar(produtoSeller: any, tipoCompra: string) {

    let jsonCompra, seller, gradex, gradey, produtosCarrinho, garantia, descx, descy, skuproduto, skuSeller, urlFrete, dimensoes,
      jsonCadastroSessao, carrinhoSessao, userLogin, email = '',categoriamkt,montagem,linkredireciona;

    if ((this.gradeX.length > 0) && this.idgradeXcompra == undefined || this.idgradeXcompra == "") {
      alert("grade X em branco");
    } else if ((this.gradeY.length > 0) && this.idgradeYcompra == undefined || this.idgradeYcompra == "") {
      alert("grade Y em branco");
    } else if (this.idsellerCompra == undefined || this.idsellerCompra == "") {
      alert("seller não selecionado");
    } else {      
      seller = this.getSellerSelecionadoById(this.idsellerCompra);
      gradex = this.sProduto.getDadosGrade(this.gradeX, this.idgradeXcompra, 'x');
      gradey = this.sProduto.getDadosGrade(this.gradeY, this.idgradeYcompra, 'y');

      gradex = (gradex.length > 0)?gradex[0]:0;
      gradey = (gradey.length > 0)?gradey[0]:0;

      categoriamkt = this.categoria+'|'+this.subcategoria;
      
      garantia  = produtoSeller.garantia;
      montagem  = produtoSeller.montagem;
      skuproduto= produtoSeller.skuProduto;
      skuSeller = produtoSeller.skuSeller;
      urlFrete  = produtoSeller.urlFrete;

      dimensoes = {
        altura: produtoSeller.altura,
        largura: produtoSeller.largura,
        comprimento: produtoSeller.comprimento,
        cubage: produtoSeller.cubage
      }
      produtosCarrinho = this.sCarrinho.getProdutosCarrinho();

      userLogin = this.sUser.getCustomer();
      
        email   = (userLogin) ? userLogin.cusEmail : '';
        jsonCompra = this.sCarrinho.getJsonCompra(
          this.id,this.nome,categoriamkt,this.imagemPrincipal,this.idsellerCompra,seller.sellerName,
          gradey,gradex,skuproduto,skuSeller,urlFrete,dimensoes,produtoSeller.quantidade,produtoSeller.slug,
          this.maxCompra,'casamento','','','',montagem);
        jsonCadastroSessao = this.sCarrinho.getDadosCadastroSessao(skuproduto,null,produtoSeller.quantidade,0,email);

        let dados = {
          jsonCompra : jsonCompra,
          skuproduto:skuproduto,
          quantidade:produtoSeller.quantidade,
          jsonCadastroSessao:jsonCadastroSessao
        }
        linkredireciona = (garantia.length <= 0)?['compras/carrinho-compra']:['garantia/', this.id, produtoSeller.slug, produtoSeller.idSeller, produtoSeller.skuProduto];      


        if (this.gradeY.length > 0 && this.gradeX.length > 0) {
          this.showSwalFire('Produto ' + gradey.descricao + ' ' + gradey.titulo + '\n na cor '+gradex.descricao,'Deseja continuar?','warning',linkredireciona,dados);
        }else{
          if (this.gradeX.length > 0 && this.gradeY.length <= 0) {
            this.showSwalFire('Produto na cor ' + gradex.descricao,'Deseja continuar?','warning',linkredireciona,dados);
          }else if(this.gradeY.length > 0 && this.gradeX.length <= 0){
            this.showSwalFire('Produto ' + gradey.descricao + ' ' + gradey.titulo,'Deseja continuar?','warning',linkredireciona,dados);
          }else{
            if (!this.sCarrinho.setProdutoCarrinho(jsonCompra, 1)) {
              Swal.fire('Ops!','Falha ao inserir produto no carrinho.','error');
            }
            this.sCarrinho.cadastroSessaoCarrinho(jsonCadastroSessao).subscribe(v => {
              if (v.Code == "success") {
                let qtd  = this.sCarrinho.getQuantidadeProdutosCarrinho();
                
                if(linkredireciona != 'N'){
                  this.router.navigate(linkredireciona);
                }else{
                  this.progressBar.complete();
                  this._snackBar.open("Produto adicionado ao carrinho!","OK", {duration: 2000});
                }
              }
            });
          }
        }      
    }
  }

  showSwalFire(titulo,text,icon,redirecionar:any,dados:any){
    Swal.fire({
      title: titulo,
      text: text,
      icon: icon,
      showCancelButton: true,
      reverseButtons: true,
      cancelButtonText: 'Não, voltar',
      confirmButtonText: 'Sim'
    }).then(
      (result) => {
        if (result.value) {
          // this.progressBar.start();
          this.sProduto.getEstoqueProduto(dados.skuproduto, dados.quantidade).subscribe(r => {
            if(this.sCarrinho.setProdutoCarrinho(dados.jsonCompra, 1)){
              this.sCarrinho.cadastroSessaoCarrinho(dados.jsonCadastroSessao).subscribe(v => {
                if (v.Code == "success") {
                  this.sCarrinho.setLocalStorageCadastroSessao(v.session, v.cookie);
                  if(redirecionar != 'N'){
                    this.router.navigate(redirecionar);
                  }else{
                    // this.progressBar.complete();
                    // Swal.fire("","Adicionado ao carrinho","success");
                    this._snackBar.open('Produto adicionado ao carrinho!','OK', {duration: 2000});
                    let qtd  = this.sCarrinho.getQuantidadeProdutosCarrinho();
                    document.querySelector(".total-carrinho").innerHTML = qtd.toString();
                    this.undisabled();
                  }
                }
              });
            }else{
              // this.progressBar.complete();
              Swal.fire('Ops!','Falha ao inserir produto no carrinho.','error');
              this.undisabled();
            }
          },
          e => {
            // this.progressBar.complete();
            Swal.fire('Ops!','Este produto não tem estoque.','error');
            this.undisabled();
          })
        }else{
          this.undisabled();
        }
      });
  }

  public disabled(){
    let elements = this.btnsDisabled;
    for(let e of elements){
      if(document.querySelector(e)){
        document.querySelector(e).setAttribute('disabled','');
      }
    }
    this.compraDisabled = true;
    this.freteDisabled  = true;
  }
  public undisabled(){
    let elements = this.btnsDisabled;
    for(let e of elements){
      if(document.querySelector(e)){
        document.querySelector(e).removeAttribute('disabled');
      }
    }
    this.compraDisabled = false;
    this.freteDisabled  = false;
  }


  calcularFrete(cep) {

    this.cep = cep.replace("-", '');
    let rCalculo;
    let calcFrete;
    this.sRequisicao.getInfoCep(cep).subscribe(c => {
      $("#calculo-frete").find("#infoCep").fadeOut(0, () => {
        $("#calculo-frete").find("#localFrete").fadeIn(300);
      });
      this.infoCep = c;
      this.sellerPreco.forEach((v, k) => {
        calcFrete = this.sFrete.calculaFrete(cep, v);
        if (calcFrete) {
          calcFrete.subscribe(
            r => {
              rCalculo = r;
            },
            error => {
              alert("Falha ao calcular o frete.");
            },
            () => {
              v.frete = rCalculo.shippingQuotes[0];
            });
        }
      });
    },
      e => {
        this.infoCep = [];
        this.alertaFrete = this.sDados.getAlerta("Ops!", "O CEP inserido não foi encontrado.", 'warning');
        setTimeout(() => { this.alertaFrete = ''; }, 3000);
      },
      () => {
        $("#calculo-frete").find("#localFrete").fadeOut(0, () => {
          $("#calculo-frete").find("#infoCep").fadeIn(300);
        });
      })
  }


  addFavorito(id) {
    this.sUser.checkLogin();

    let json = { 'cpfCnpj': this.sUser.getCustomer().cpfCnpj, 'id': id };

    this.sProduto.adicionarFavorito(json).subscribe(l =>
      this.sProduto.getProduto(id).subscribe(r => {
        Swal.fire({
          icon: 'success',
          title: 'Adicionado!!!',
          text: r[0].nome + ' adicionado aos seus produtos favoritos!'
        })
        this.sProduto.listaFavoritos(this.customer.cpfCnpj).subscribe(
          r => {
            this.array = r;
            this.cookieService.set('favoritos_count', r.length);
          }
        )
        this.router.navigate(['/../../user/favoritos'], { relativeTo: this.route })
      })
    )
  }

  onSubmit(listForm: Form) {
    var erro = this.errorValidation(listForm);
    if (this.listForm.controls['estrelas'].value == '' || this.listForm.controls['recomendar'].value == '' || 
        this.listForm.controls['titulo_avaliacao'].value == '' || this.listForm.controls['avaliacao'].value == '' || 
        this.listForm.controls['termos'].value == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Preencha todos os campos obrigatórios!'
      })
    } else {
      if (!erro) {
        $(".modal-backdrop").remove();
        this.sUser.checkLogin();
        this.sAvaliacaoService.enviarAvaliacao(listForm).subscribe(
          r => {
            this.showMessage(r.Code, r.Label);
          },
          e => {
            //ERRO AO ENVIAR AVALIAÇÃO"
          })
      }
    }
  }

  showMessage(code: any, label: any) {
    if (code == "error") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: label
      })
    } else if (code == "success") {
      Swal.fire({
        icon: 'success',
        title: '',
        text: label
      })
    }
  }

  private errorValidation(data: any) {
    var erro;
    if (data.estrelas == "") {
      erro = "estrelas_empty";
    } else if (data.recomendar == "") {
      erro = "recomendar_empty";
    } else if (data.titulo_avaliacao == "") {
      erro = "titulo_avaliacao_empty";
    } else if (data.avaliacao == "") {
      erro = "avaliacao_empty";
    } else if (data.termos == "") {
      erro = "termos_empty";          
    } else if (data.titulo_avaliacao.length > 80) {
      erro = "titulo_avaliacao_long";
    } else if (data.avaliacao.length > 100) {
      erro = "avaliacao_long";
    } else {
      erro = false;
    }
    return erro;
  }

  // private showFloatingProduct(){
  //   let el = document.querySelector('.pd-floating-box');
  //   let footer = document.querySelector('footer');
  //   document.addEventListener('scroll', ()=>{
  //     if(window.scrollY > this.scrollShow.offsetTop) {
  //       if(window.scrollY < footer.offsetTop){
  //         el.classList.add('show');
  //       } else {
  //         el.classList.remove('show');
  //       }
  //     } else {
  //       el.classList.remove('show');
  //     }

  //     })
    
  // }

  private closeFloating(){
    let el = document.querySelector('.pd-floating-box');
    el.remove();
  }
}
