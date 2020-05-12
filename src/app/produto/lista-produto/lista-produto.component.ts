import { Component, OnInit,Pipe} from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';
import { CarrinhoCompraService } from '../../_services/carrinho-compra.service';
import Swal from 'sweetalert2';
import { FreteService } from '../../_services/frete.service';
import { ProdutoService } from '../../_services/produto.service';
import { FormControl, FormGroup, Form } from '@angular/forms';
import { DadosService } from 'src/app/_services/dados.service';
import { UserService } from 'src/app/_services/user.service';
import {NgProgress, NgProgressRef} from 'ngx-progressbar';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-lista-produto',
  templateUrl: './lista-produto.component.html',
  styleUrls: ['./lista-produto.component.css']
})
@Pipe({
  name: 'currencyformat'
})
export class ListaProdutoComponent implements OnInit {
  carouselProduto = {
    margin: 0,
    nav: false,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: false
      },
      600: {
        items: 1,
        nav: false
      },
      1000: {
        items: 1,
        nav: true,
        loop: true
      },
      1500: {
        items: 1,
        nav: false,
        loop: true,
        dots: true
      }
    }
  }
  imagesProduto = [
    {
      image:"../assets/img/295.jpg"
    },
    {
      image:"../assets/img/295b.jpg"
    },
    {
      image:"../assets/img/295c.jpg"
    },
  ]
  public btnsDisabled:any  = [".calcular-frete",".btn-comprar-lista"];
  public pgtoBtn:boolean = true;
  public progressBar:NgProgressRef;
  public qtdOfertas:number = 0;
  public produto;
  public breadcrumb:any = {};
  public cepConsultado; // cep armazenado no LocalStorage
  public cepFrete;
  // public ObjectProduto:any = [];
  public id:number;
  public nome:String;
  public descricaominima:String;
  public productInfo:String;
  public marca:String;
  public largura:String;
  public altura:String;
  public profundidade:String;
  public cubage:String;
  public categoria:String;
  public subcategoria:String;
  public sellers:any;
  public preco:String;
  public preco_promocional:String;
  public link_categoria:String;
  public link_subcategoria:String;
  public maxCompra:number;
  public gradeX:any;
  public gradeY:any;
  public images:any;
  public estrelas:any;
  public messages:any;
  public tipoGrade:string;
  public slug:string;
  public link:string;
  public urlBase:string = '/produto/';
  public qtdmensagem:any;
  

  public cep;
  public produtoSeller;
  public urlIdGradeY;
  public urlDescGradeY:any = '';
  public urlIdGradeX;
  public urlDescGradeX:any = '';
  public paginaCarregada:boolean = true;

  public gradeyTitulo:string;
  public gradexTitulo:string;
  public mediaAvaliacao:any;
  
  public ordernaSeller = new FormGroup({
    ordenacao: new FormControl(''),
  });


  constructor(
    private route: ActivatedRoute,
    private sCarrinho:CarrinhoCompraService,
    private sFrete:FreteService,
    private sProduto:ProdutoService,
    private router:Router,
    private sDados:DadosService,
    private sUser:UserService,
    private _snackBar: MatSnackBar,
    private NgProgress: NgProgress) {
    this.cepConsultado = (this.sFrete.buscaUltimoCEPCalculado())?this.sFrete.buscaUltimoCEPCalculado():"";
    if(this.cepConsultado){
      this.cepFrete = this.cepConsultado;
    }
  }
 
  public orderna(tipoOrder){
    if(tipoOrder.ordenacao == "menor_preco"){
      this.produtoSeller.sort((a,b) => a.preco - b.preco).map((resultado, index, array) => resultado);
    }else if(tipoOrder.ordenacao == "maior_preco"){
      this.produtoSeller.sort((a,b) => b.preco - a.preco).map((resultado, index, array) => resultado);
    }
  }
  public getMediaAvaliacao(avaliacao) {
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
  ngOnInit() {
    this.progressBar = this.NgProgress.ref('produtoBar');
    this.route.params.subscribe(params => {
      if(params){
        $(".loading").fadeIn(0);
        this.id = parseInt(params.id);
        let tipo = '';
        if(tipo = params.tipo){
          switch (tipo) {
            case 'Y':
              this.urlIdGradeY   = params.grade;
              this.urlDescGradeY = params.desc;
              break;
            case 'X':
              this.urlIdGradeX   = params.grade;
              this.urlDescGradeX = params.desc;
              break;
            default:
              break;
          }
        }else{
          this.urlIdGradeX   = params.gradex;
          this.urlDescGradeX = params.descx;
          this.urlIdGradeY   = params.gradey;
          this.urlDescGradeY = params.descy;
        }
        if(Number.isInteger(this.id)){
          let resultadoBusca:any = [];
          this.sProduto.getProduto(this.id).subscribe(r => {  
            let slugLink;
            resultadoBusca = r;      
            r.forEach(produto =>{
              slugLink = produto.link.split("/");
              this.id             = produto.id;
              this.nome           = produto.nome;
              this.descricaominima= produto.descricaominima;
              this.productInfo    = produto.productInfo;
              this.marca          = produto.marca;
              this.largura        = produto.largura;
              this.altura         = produto.altura;
              this.profundidade   = produto.profundidade;
              this.cubage         = produto.cubage;
              this.categoria      = produto.categoria;
              this.subcategoria   = produto.subcategoria;
              this.sellers         = produto.sellers;
              this.preco          = produto.preco;
              this.preco_promocional = produto.preco_promocional;
              this.images         = produto.images;
              this.estrelas       = this.sDados.getEstrelaAvaliacao(produto.estrelas);
              this.messages       = produto.messages;
              this.link_categoria = produto.link_categoria;
              this.link_subcategoria = produto.link_subcategoria;
              this.link           = this.urlBase+produto.link;
              this.slug           = slugLink[1]; 
              this.gradeX         = produto.gradeX;
              this.gradeY         = produto.gradeY;
              this.gradeyTitulo   = (this.urlIdGradeY)?this.sProduto.getTituloGrade(produto.gradeY,this.urlIdGradeY,'y'):"";
              this.gradexTitulo   = (this.urlIdGradeX)?this.sProduto.getTituloGrade(produto.gradeX,this.urlIdGradeX,'x'):"";
              this.maxCompra      = produto.limiteCompra;
              this.qtdmensagem    = produto.messages.length;
              
            });
            this.setBreadcrumb(this.categoria,this.subcategoria,this.marca);
            this.setDadosProduto(this.sellers);
            this.orderna("menor_preco");
            $(".loading").fadeOut(500);
            this.calcularFrete(this.cepFrete)
          },
          e => {
            // console.log("ERRO AO BUSCAR PRODUTO",e);
          });
        }else{
          this.router.navigate(['/'])
        }
      }else{
        this.router.navigate(['/'])
      }
    });
  }

  private setDadosProduto(seller:any){
    let jsonSeller = [];
      seller.forEach(s => {
        s.gradeSeller.forEach(sg => {
          jsonSeller.push({
            idSeller   :s.idSeller,
            sellerName :s.sellerName,
            preco      :s.price,
            skuSeller  :sg.skuSeller,
            sku        :sg.sku,
            urlFrete   :s.urlFrete,
            cubage     :sg.cubage,
            largura    :sg.largura,
            altura     :sg.altura,
            comprimento:sg.comprimento,
            quantidade : 1,
            garantia   :s.garantia,
            skuProduto :sg.sku,
            parcela:this.getQtdParcelasSemJuros(sg.parcelamento),
            frete:{}
          });
        });
      });
    
    this.produtoSeller = jsonSeller;
    this.paginaCarregada = false;
    this.qtdOfertas    = jsonSeller.length;
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

  private setBreadcrumb(categoria:any,subcategoria:any,marca:any){
    this.breadcrumb = {
      categoria: categoria,
      subcategoria: subcategoria,
      marca: marca
    }
  }
  
  calcularFrete(cep){
    if(this.pgtoBtn === true){
      this.cep = cep.replace("-",'');
      let rCalculo;
      let calcFrete;
      this.disabled();
      this.produtoSeller.forEach((v,k) => {
        $(".frete-lista").find("#valFrete-"+k).fadeOut(0,()=>{
          $(".frete-lista").find("#calcFrete-"+k).fadeIn(300);
        });
        calcFrete = this.sFrete.calculaFrete(cep,v);
        if(calcFrete){
          calcFrete.subscribe(
            r =>{
              v.frete = r.shippingQuotes[0];
              this.undisabled();
            },
            error => {
              alert("Falha ao calcular o frete.");
            },
            () => {
              $(".frete-lista").find("#calcFrete-"+k).fadeOut(0,() => {
                $(".frete-lista").find("#valFrete-"+k).fadeIn(700);
              
              });
            });  
        }
      })
    }
  }
  
  public getLinkArray(urlBase:any,link:String){
    return this.sProduto.getLinkArray(urlBase,link);
  }
  btcomprar(produto:any){
    if(this.pgtoBtn === true){
      let jsonCompra,r,produtosCarrinho,gradex,gradey,dimensoes,categoriamkt;

      categoriamkt = this.categoria+'|'+this.subcategoria;
      gradex       = this.sProduto.getDadosGrade(this.gradeX,this.urlIdGradeX,'x');
      gradey       = this.sProduto.getDadosGrade(this.gradeY,this.urlIdGradeY,'y');
      let garantia  = produto.garantia;
      let montagem  = produto.montagem;
      let skuproduto= produto.skuProduto;
      let skuSeller = produto.skuSeller;
      let urlFrete  = produto.urlFrete;
      let quantidade = produto.quantidade;
      let userLogin;
      let email;
      let jsonCadastroSessao;
      let linkredireciona;
      dimensoes   = {
        altura:produto.altura,
        largura:produto.largura,
        comprimento:produto.comprimento,
        cubage:produto.cubage
      }
      produtosCarrinho = this.sCarrinho.getProdutosCarrinho();
      userLogin        = this.sUser.getCustomer();
      jsonCompra = this.sCarrinho.getJsonCompra(this.id,this.nome,categoriamkt,this.images[0].images,produto.idSeller,produto.sellerName,gradey,gradex,produto.sku,produto.skuSeller,produto.urlFrete,dimensoes,produto.quantidade,this.slug,this.maxCompra,'loja','','','','');
      email = (userLogin) ? userLogin.cusEmail : '';
      jsonCadastroSessao = this.sCarrinho.getDadosCadastroSessao(skuproduto,'',quantidade,0,email);

      let dados = {
        jsonCompra : jsonCompra,
        skuproduto:skuproduto,
        quantidade:quantidade,
        jsonCadastroSessao:jsonCadastroSessao
      }
      
      linkredireciona = (garantia.length <= 0)?['/compras/carrinho-compra']:['/garantia', this.id, this.slug,produto.idSeller,produto.skuProduto];      
      
      if (this.urlDescGradeX != '' && this.urlDescGradeY != '') {
        this.showSwalFire('Produto ' + this.urlDescGradeY + ' ' + this.gradeyTitulo + '\n na cor '+gradex.descricao,'Deseja continuar?','warning',linkredireciona,dados);
      }else{
        if (this.urlDescGradeX != '' && this.urlDescGradeY == '') {
          this.showSwalFire('Produto na cor ' + gradex.descricao,'Deseja continuar?','warning',linkredireciona,dados);
        }else if(this.urlDescGradeY != '' && this.urlDescGradeX == ''){
          this.showSwalFire('Produto ' + this.urlDescGradeY + ' ' + this.gradeyTitulo,'Deseja continuar?','warning',linkredireciona,dados);
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
                // Swal.fire("","Adicionado ao carrinho","success");
              }
            }
          });
        }
      }
    }
      // if(this.urlDescGradeY != ''){
      //   Swal.fire({
      //     title:'Produto '+ this.urlDescGradeY+" "+this.gradeyTitulo,
      //     text: 'Deseja continuar?',
      //     icon: 'warning',
      //     showCancelButton: true,
      //     reverseButtons: true,
      //     cancelButtonText: 'Não, voltar',
      //     confirmButtonText: 'Sim',
          
      //   }).then((result) => {
      //     if (result.value) {
      //       if(produto.garantia.length > 0){
      //         this.router.navigate(['garantia',this.id,this.slug,produto.idSeller,produto.skuProduto]);
      //       }else{
      //         this.sCarrinho.setProdutoCarrinho(jsonCompra,1);
      //         this.router.navigate(['compras/carrinho-compra']);
      //       }
      //     }
      //   });
      // }else if(this.urlDescGradeX != '' && this.urlDescGradeY == ''){
      //   if(produto.garantia.length > 0){
      //     this.router.navigate(['garantia',this.id,this.slug,produto.idSeller,produto.skuProduto]);
      //   }else{
      //     this.sCarrinho.setProdutoCarrinho(jsonCompra,1);
      //     this.router.navigate(['compras/carrinho-compra']);
      //   }
      // }
    
    }

    public disabled(){
      let elements = this.btnsDisabled;
      for(let e of elements){
        if(document.querySelector(e)){
          document.querySelector(e).setAttribute('disabled','');
        }
      }
      this.pgtoBtn = true;
    }
    public undisabled(){
      let elements = this.btnsDisabled;
      for(let e of elements){
        if(document.querySelector(e)){
          document.querySelector(e).removeAttribute('disabled');
        }
      }
      this.pgtoBtn = true;
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
    
}
