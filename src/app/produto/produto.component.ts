import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequisicoesService } from '../_services/requisicoes.service';
import { ProdutoService } from '../_services/produto.service';
import { DadosService } from '../_services/dados.service';
import { CarrinhoCompraService } from '../_services/carrinho-compra.service';
import { FreteService } from '../_services/frete.service';
import Swal from 'sweetalert2'
import * as $ from 'jquery';
import { UserService } from '../_services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { ConfiguracaoService } from '../_services/configuracao.service';
import { FormGroup, FormControl, Form, FormBuilder, Validators} from '@angular/forms';
import { MarketingService } from '../_services/marketing.service';
import { Title, Meta } from '@angular/platform-browser';
import { AvaliacaoService } from '../_services/avaliacao.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { RetiraLojaService } from '../_services/retira-loja.service';
import { MatSnackBar } from '@angular/material';
import {NgProgress, NgProgressRef} from 'ngx-progressbar'
import { FavoriteService } from '../_services/favorite.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css'],
})

@NgModule({
  providers: [ MarketingService ]
})

export class ProdutoComponent implements OnInit {
  public progressBar:NgProgressRef;
  public msgResposta;
  public msgRetorno = '';
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
  public btnsDisabled:any  = [".submit-comprar",".add-to-cart",".btn-frete"];
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
  public scrollShow;
  public sellers: any = [];
  public preco: String;
  public preco_promocional: String;
  public gradeX: any = [];
  public gradeY: any = [];
  public images: any = [];
  public imagemAvaliacao:any;
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
  public produtoSeller: any = '';
  public stars;
  public starsMedia;
  public avaliacao;
  public mediaAvaliacao;
  public cep;
  public infoCep: any = [];
  public valorCep:any;
  public breadcrumb = {};
  public alertaFrete: any;
  public atributos: any;
  public customer;
  public link_categoria:string;
  public link_subcategoria:string;
  public dadosFrete = [];
  public array;
  public isBoxSeller:boolean = false;
  public sellerData = [];
  public idgradeXcompra;
  public idgradeYcompra;
  public idsellerCompra;
  public sellerPreco = [];
  public gradeyDisponiveis = [];
  public menorPrecoBox;
  public dimensoes;
  public urlOfertas;
  public manualImagem:any;
  public manualDocumento:any;
  public nameSeller:String = '';
  // CONFIG
  public paginaCarregada: boolean = false;
  /*CARROSSEL*/
  public outPutTitulo: any;
  public outPutProdutosCarrossel: any;
  public outPutArrayQtdItens: any = [2, 3, 3, 5, 5];
  // CONFIG
  public cores;
  public produtoFavorito;
  public idLoja;
  public lojasRetiraLoja;
  public lat: number = 0;
  public lng: number = 0;
  public zoom: number = 15;
  public description: string = '';
  public buscando    = false;
  public mapDisabled = true;
  public retiraCep;
  public cepClient;
  public retiraLojaGrade:any;
  public dadosRetiraLoja:any;
  public cepCalculado;
  public listForm;

  public clickAvaliar = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sRequisicao: RequisicoesService,
    private sProduto: ProdutoService,
    private sDados: DadosService,
    private sCarrinho: CarrinhoCompraService,
    private sFrete: FreteService,
    private sUser: UserService,
    private cookieService: CookieService,
    private sConfiguracao:ConfiguracaoService,
    private sMarketingService:MarketingService,
    private title: Title,
    private meta: Meta,
    private sAvaliacaoService: AvaliacaoService,
    private sRetira : RetiraLojaService,
    private _snackBar: MatSnackBar,
    private NgProgress: NgProgress,
    private sFavorito: FavoriteService,
    private form: FormBuilder) { 
      // FORMULARIO AVALIAÇÃO
      this.listForm = this.form.group({
        id: this.form.control(''),
        nome: this.form.control(this.sUser.getCustomer().cusCompanyName),
        email: this.form.control(this.sUser.getCustomer().cusEmail),
        estrelas: ['', Validators.required],
        recomendar: this.form.control(''),
        titulo_avaliacao: this.form.control(''),
        avaliacao: this.form.control(''),
        termos: this.form.control(''),
      });

      this.customer  = this.sUser.currentUserValue; 
      this.cepClient = localStorage.getItem('product_frete')?JSON.parse(localStorage.getItem('product_frete')):'';
      this.cepCalculado = (this.cepClient != '')?this.cepClient.frete:'';
      this.route.params.subscribe(params => {
        let produto:any;
        if (params) {
          this.nameSeller = (params.nameSeller != undefined)?params.nameSeller:'';
          if (Number.isInteger(parseInt(params.id))) {
            this.sProduto.getProduto(params.id).subscribe(r => {
              if(!this.verificaIntegridadeProduto(r[0])){
                this.paginaCarregada = false;
                this.idLoja          = this.sConfiguracao.getShopID();
                this.sMarketingService.camposURL(location.search.slice(1));
                
                this.title.setTitle(r[0].nome); 
                
                const tags = [
                  { name: 'description', content: r[0].metatag},
                  { name: 'keywords',    content: r[0].keyword},
                ];    
                
                var imagem_banner:any;  
                if(r[0].gradeX[0] !== "" && r[0].gradeX[0] !== undefined) {
                  imagem_banner = r[0].gradeX[0].images;    
                }else{
                  imagem_banner = "Imagem não cadastrada!";
                }
                this.sMarketingService.openGraph(r[0].nome, imagem_banner);   

                tags.forEach(tag => this.meta.updateTag(tag));  
                  produto = r[0];
                  this.listForm.patchValue({id: produto.id});
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
                if(params.id+'/'+params.slug != this.link){
                  this.router.navigate(['/produto',linkSplit[0],linkSplit[1]])
                }
                this.isBoxSeller = (this.sellers.length > 1)?true:false;
                this.paginaCarregada = true;
                setTimeout(() => {
                  this.scrollShow = document.querySelector('#scrollShow');
                  this.showFloatingProduct();
                }, 100);
                this.setCarrossel();
                this.stars = this.sDados.getEstrelaAvaliacao(this.estrelas);
                this.setAvaliacao(this.messages);
                this.mediaAvaliacao = this.getMediaAvaliacao(this.avaliacao);
                this.starsMedia = this.sDados.getEstrelaAvaliacao(this.mediaAvaliacao);
                this.getRetiraLojaByIdLoja();
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
                
            }else{
              this.router.navigate(['/']);
            }
            
            },
            e => {
              this.router.navigate(['/']);
              // "ERRO AO BUSCAR PRODUTO"
            });
          } else {
            this.router.navigate(['/']);
          }
        } else {
          this.router.navigate(['/']);
        }
      });
    }
  
  // VERIFICA SE TODOS OS PARÂMETROS ESTÃO CORRETOS
  verificaIntegridadeProduto(produto:any){
    if(produto.sellers.length <= 0){
      return true;
    }
  }

  onSubmit() {
    let erro = this.errorValidation(this.listForm.value);
    let linkSplit = this.link.split("/");
    if(this.clickAvaliar === false){
      this.clickAvaliar = true;
      if(this.sUser.checkLogin()){
        if(erro === ''){
          this.sAvaliacaoService.enviarAvaliacao(this.listForm.value).subscribe(
            r => {
              this.showMessage(r.Code, r.Label);
              setTimeout(()=>{
                $("#modal-avaliar").removeClass('show');
                $(".modal-backdrop").remove();
                this.clickAvaliar = false;
              },1000);
            },
            e => {
              //ERRO AO ENVIAR AVALIAÇÃO"
              $("#modal-avaliar").removeClass('show');
              $(".modal-backdrop").remove();
              this.clickAvaliar = false;
            })
        }else{
          Swal.fire({icon: 'error',title: 'Oops...',text: erro});
          this.clickAvaliar = false;
        }
      }else{
        $(".modal-backdrop").remove();
        let link = ['user','login'];
        this.router.navigate(link,{queryParams:{ returnUrl: '/produto/'+linkSplit[0]+'/'+linkSplit[1] } });
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
    var erro = '';
    let e = parseFloat(data.estrelas);
    if (e <= 0 || e > 5) {
      erro = "Escolha uma estrela para sua avaliação.";
    } else if (data.recomendar == "") {
      erro = "Escolha sua recomendação.";
    } else if (data.titulo_avaliacao == "") {
      erro = "De um títutlo para sua avaliação";
    } else if (data.avaliacao == "") {
      erro = "Escreva sua avaliação";
    } else if (data.termos == "") {
      erro = "Marque a caixinha de concordar com os termos, caso concorde. ";          
    } else if (data.titulo_avaliacao.length > 80) {
      erro = "Seu título não pode ultrapassar 80 caracteres.";
    } else if (data.avaliacao.length > 100) {
      erro = "Sua avaliação não pode ultrapassar 100 caracteres.";
    }
    return erro;
  }

  ngOnInit() {
    this.progressBar = this.NgProgress.ref('produtoBar');
    if(this.cepClient != ''){
      this.calcularFrete(this.cepClient.frete);
    }
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

  private ordenarGradeY(grade,gradey) {
    if(grade.length > 0){
      this.gradeyDisponiveis = grade.sort((a, b) => a.idGradeY - b.idGradeY).map((resultado, index, array) => resultado);
    }else{
      for(let gy of gradey){
        this.gradeyDisponiveis.push(gy);
      }
    }
  }

  private selecionaGradexAleatorio() { // AO CARREGAR A PAGINA, SELECIONA ALEATORIAMENTE A GRADEX
    let gradexRandom;
    let idgradex;
    gradexRandom = Math.floor(Math.random() * this.gradeX.length);
    idgradex = this.gradeX[gradexRandom].idGradeX;
    this.verificaGradeX(idgradex);
  }

  private selecionaPrimeiraGradeY() { // SELECIONA A PRIMEIRA GRADEY DISPONIVEL
    let idgradey,idgradeySeller = 0;
    idgradeySeller = this.getGradeYBySeller(this.getIdSellerbyName(this.nameSeller));
    if (this.gradeyDisponiveis.length > 0) {
      idgradey = (idgradeySeller > 0)?idgradeySeller:this.gradeyDisponiveis[0].idGradeY;
      this.verificaGradeY(idgradey);
    }
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

// *********** FIM FUNÇÕES QUANDO EXISTER SELLER NA URL ***********
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
      let id;
      if(
        (isClick && idgrade == this.getGradeYBySeller(this.getIdSellerbyName(this.nameSeller))) || 
        isClick == false && this.getIdSellerbyName(this.nameSeller) > 0){
        id = this.getIdSellerbyName(this.nameSeller);
      }else{
        id = (this.sellerPreco.length > 0)?this.sellerPreco[0].idSeller:0;
      }

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
    let j,v;
    for (j = 0; j < this.sellerData.length; j++) {
      if (this.sellerData[j].idSeller == idseller) {
        v = true;
      }
    }
    return v;
  }

  private getSellersByGradeXY(idgrade: number = 0, tipoGrade: any = '') {
    let i, y, j = 0;
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
        } else if (tipoGrade == 'y') {
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
        }else if (tipoGrade == 'n') {
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
    this.ordenarGradeY(this.sDados.removerValoresDuplicados(gradey, "idGradeY"),this.gradeY);
  }
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
  getRetiraLojaByIdLoja(){
    return this.produtoSeller.sellerName;
  }
  openShareButton(e:any){
    let compar = document.querySelector(".btn-compartilha");

    if(e.classList.contains("active")){
      e.classList.remove("active");
      compar.querySelectorAll("span").forEach(element =>{
        element.classList.remove("active");
      });
    }else{
      e.classList.add("active");
      compar.querySelectorAll("span").forEach(element =>{
        element.classList.add("active");
      });
    }
  }


  public getYGradeSelecionada() {
    let grade = this.sProduto.getDadosGrade(this.gradeY, this.idgradeYcompra, 'y');
    return grade[0].descricao;
  }

  public getXGradeSelecionada() {
    let grade = this.sProduto.getDadosGrade(this.gradeX, this.idgradeXcompra, 'x');
    return grade[0].descricao;
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
  btnComprar(produtoSeller: any, retiraLoja: any, tipocompra:any = '') {
    if(!this.compraDisabled){
      this.progressBar.start();
      this.disabled();
      let jsonCompra, seller, gradex, gradey, produtosCarrinho, garantia, skuproduto, skuSeller, urlFrete, dimensoes,
        jsonCadastroSessao, userLogin, email = '',linkredireciona, montagem,gradexImagem,categoriamkt,idLoja = 0,idrules = '0';

      if ((this.gradeX.length > 0 && this.idgradeXcompra == undefined) || (this.gradeX.length > 0 && this.idgradeXcompra == "")) {
        alert("grade X em branco");
        this.progressBar.complete();
      } else if ((this.gradeY.length > 0 && this.idgradeYcompra == undefined) || (this.gradeY.length > 0 && this.idgradeYcompra == "")) {
        alert("grade Y em branco");
        this.progressBar.complete();
      } else if (this.idsellerCompra == undefined || this.idsellerCompra == "") {
        alert("seller não selecionado");
        this.progressBar.complete();
      } else {      
        seller = this.getSellerSelecionadoById(this.idsellerCompra);
        categoriamkt = this.categoria+'|'+this.subcategoria;
        gradex = this.sProduto.getDadosGrade(this.gradeX, this.idgradeXcompra, 'x');
        gradey = this.sProduto.getDadosGrade(this.gradeY, this.idgradeYcompra, 'y');

        gradex = (gradex.length > 0)?gradex[0]:0;
        gradey = (gradey.length > 0)?gradey[0]:0;

        gradexImagem = (gradex != 0)?gradex.images:this.imagemPrincipal;

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
        userLogin        = this.sUser.getCustomer();
        jsonCompra = this.sCarrinho.getJsonCompra(this.id,this.nome,categoriamkt,gradexImagem,this.idsellerCompra,seller.sellerName,gradey,gradex,skuproduto,skuSeller,urlFrete,dimensoes,produtoSeller.quantidade,produtoSeller.slug,this.maxCompra,'loja',retiraLoja,'','',montagem);

        email   = (userLogin) ? userLogin.cusEmail : '';
        idLoja  = (retiraLoja != '')?retiraLoja.idLoja:0;
        jsonCadastroSessao = this.sCarrinho.getDadosCadastroSessao(skuproduto,null,produtoSeller.quantidade,idLoja,email);
        let dados = {
          jsonCompra : jsonCompra,
          skuproduto:skuproduto,
          quantidade:produtoSeller.quantidade,
          jsonCadastroSessao:jsonCadastroSessao
        }
        linkredireciona = (garantia.length <= 0)?['compras/carrinho-compra']:['garantia/', this.id, produtoSeller.slug, produtoSeller.idSeller, produtoSeller.skuProduto];      
          // SE FOR RETIRA LOJA
          if(retiraLoja != '' && retiraLoja != undefined){
            if(tipocompra == 'carrinho'){
              linkredireciona = 'N';
            }else if(tipocompra == 'comprar'){
              linkredireciona = ['compras/carrinho-compra'];
            }
          }else{
            if(tipocompra == 'carrinho'){
              linkredireciona = 'N';
            }
          }
          if(retiraLoja == undefined && retiraLoja != ''){
            Swal.fire("","Selecione um local de retirada antes de processeguir.","warning");
          }else{
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
                    document.querySelector(".total-carrinho").innerHTML = qtd.toString();
                    
                    if(linkredireciona != 'N'){
                      this.router.navigate(linkredireciona);
                    }else{
                      this.progressBar.complete();
                      this._snackBar.open("Produto adicionado ao carrinho!","OK", {duration: 2000});
                      this.undisabled();
                      // Swal.fire("","Adicionado ao carrinho","success");
                    }
                  }
                });
              }
            }
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
          this.progressBar.start();
          this.sProduto.getEstoqueProduto(dados.skuproduto, dados.quantidade).subscribe(r => {
            if(this.sCarrinho.setProdutoCarrinho(dados.jsonCompra, 1)){
              this.sCarrinho.cadastroSessaoCarrinho(dados.jsonCadastroSessao).subscribe(v => {
                if (v.Code == "success") {
                  this.sCarrinho.setLocalStorageCadastroSessao(v.session, v.cookie);
                  if(redirecionar != 'N'){
                    this.router.navigate(redirecionar);
                  }else{
                    this.progressBar.complete();
                    // Swal.fire("","Adicionado ao carrinho","success");
                    this._snackBar.open('Produto adicionado ao carrinho!','OK', {duration: 2000});
                    let qtd  = this.sCarrinho.getQuantidadeProdutosCarrinho();
                    document.querySelector(".total-carrinho").innerHTML = qtd.toString();
                    this.undisabled();
                  }
                }
              });
            }else{
              this.progressBar.complete();
              Swal.fire('Ops!','Falha ao inserir produto no carrinho.','error');
              this.undisabled();
            }
          },
          e => {
            this.progressBar.complete();
            Swal.fire('Ops!','Este produto não tem estoque.','error');
            this.undisabled();
          })
        }else{
          this.progressBar.complete();
          this.undisabled();
        }
      });
  }

  getProdutoDisponivelRetiraLoja(){
    let produtoLoja,gx,gy;
    let retorno = []
    for(let s of this.sellerData){
      // if(s.idSeller == this.idLoja){
        produtoLoja = s.gradeSeller[0];
      // }
    }
    if(produtoLoja){
      if(this.gradeX.length > 0){
        gx = this.sProduto.getDadosGrade(this.gradeX,produtoLoja.idGradeX,'x');
        gx[0].tipo = 'x';
        retorno.push(gx[0]);
      }
      if(this.gradeY.length > 0){
        gy = this.sProduto.getDadosGrade(this.gradeY,produtoLoja.idGradeY,'y');
        gy[0].tipo = 'y';
        retorno.push(gy[0]);
      }
      this.progressBar.complete();
      return retorno;
    }
    this.progressBar.complete();
    return [];
  }

  // TRANSFORMA O LINK STRING '/61/link-tv' EM ARRAY [61,'link-tv'] PARA UTILIZAR NO ROUTERLINK
  public getLinkArray(urlBase:any,link:String){
    return this.sProduto.getLinkArray(urlBase,link);
  }

  public buscaProdutoRetira(){
    this.progressBar.start();
    this.retiraLojaGrade = this.getProdutoDisponivelRetiraLoja();
  }
  // CONSULTA AS LOJAS PARA O "RETIRA LOJA"
  consultarRetiraLoja(cep){
    this.getProdutoDisponivelRetiraLoja();
    this.buscando = true;
    this.mapDisabled = true;
    this.sRequisicao.getInfoCep(cep).subscribe(c => {
      this.sRetira.buscaLojas(cep).subscribe(retira =>{
        this.lojasRetiraLoja = retira;
        this.buscando    = false;
      })
    },
    e =>{
      this.retiraCep = this.sDados.getAlerta("Ops!", "O CEP inserido não foi encontrado.", 'warning');
      setTimeout(() => { this.alertaFrete = ''; }, 3000);
      this.buscando    = false;
    });
  }
  consultaMapaRetiraLoja(endereco:any,loja:any){
    this.mapDisabled = true;
    this.sRetira.buscaMapaEndereco(endereco).subscribe(r =>{
      this.lat = r.results[0].geometry.location.lat;
      this.lng = r.results[0].geometry.location.lng;
      this.description = r.results[0].formatted_address;
      this.mapDisabled = false;
      this.dadosRetiraLoja = loja;
    })
  }
  // CALCULA FRETE DOS SELLERS
  calcularFrete(cep) {
    if(!this.freteDisabled){
      this.disabled();
      this.cep = cep.replace("-", '');
      let calcFrete;
      this.sRequisicao.getInfoCep(cep).subscribe(c => {
        $("#calculo-frete").find("#infoCep").fadeOut(0, () => {
          $("#calculo-frete").find("#localFrete").fadeIn(300);
        });
        
        this.sFrete.gravarUltimoCepCalculado(cep);
        this.sellerPreco.forEach((v, k) => {
          calcFrete = this.sFrete.calculaFrete(cep, v);
          if (calcFrete) {
            calcFrete.subscribe(
              r => {
                this.infoCep = c;
                v.frete = r.shippingQuotes[0];
                this.undisabled();
              },
              error => {
                //ERRO AO CALCULAR FRETE
                this.undisabled();
              });
          }
        });
      },
      e => {
        this.infoCep = [];
        this.valorCep = '';
        this.alertaFrete = this.sDados.getAlerta("Ops!", "O CEP inserido não foi encontrado.", 'warning');
        setTimeout(() => { this.alertaFrete = ''; }, 3000);
        this.undisabled();
      },
      () => {
        $("#calculo-frete").find("#localFrete").fadeOut(0, () => {
          $("#calculo-frete").find("#infoCep").fadeIn(300);
          this.undisabled();
        });
      })
    }
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

  adicionarFavoritos(id:number){
    return this.sFavorito.addFavorito(id);
  }

  verificaFavorito(id:number){
    return this.sDados.isFavorito(id);
  }

  // ADICIONA PRODUTO AOS FAVORITOS
  addFavorito(id) {
    this.progressBar.start();
    this.sUser.checkLogin();
    let user = this.sUser.getCustomer();
    let json = { 'cpfCnpj': user.cpfCnpj, 'id': id };
    if(user.plataform == 'site' && (user.cpfCnpj.length == 11 || user.cpfCnpj.length == 14)){
      this.sProduto.adicionarFavorito(json).subscribe(l => {
        if(l.Code == "success"){
          this.progressBar.complete();
          // Swal.fire("","Produto adicionado aos favoritos.","success");
          this._snackBar.open('Produto adicionado aos favoritos!','OK', {duration: 2000});
        }
      },
      e =>{
        Swal.fire("Ops!","Houve um erro ao tentar adicionar o produto aos favoritos.","error");
      });
    }else if(user.plataform == 'facebook' || user.plataform == 'google'){
      Swal.fire("Ops!","Para adicionar aos favoritos você precisa cadastrar seu CPF ou CNPJ.","warning");
    }
  }

  public showFloatingProduct(){
    let el = document.querySelector('.pd-floating-box');
    let footer = document.querySelector('footer');
    document.addEventListener('scroll', ()=>{
      try {
        if(window.scrollY > this.scrollShow.offsetTop) {
          if(window.scrollY < footer.offsetTop){
            el.classList.add('show');
          } else {
            el.classList.remove('show');
          }
        } else {
          el.classList.remove('show');
        }
  
      } catch (error) {
        el.classList.remove('show');
      }
    })
    
  }

  public closeFloating(){
    let el = document.querySelector('.pd-floating-box');
    el.remove();
  }

}
