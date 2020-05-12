import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DadosService } from '../../_services/dados.service';
import { ProdutoService } from '../../_services/produto.service';
import { FavoriteService } from '../../_services/favorite.service';
import { UserService } from '../../_services/user.service';
import Swal from 'sweetalert2';
import { Meta, Title } from '@angular/platform-browser';
import { MarketingService } from '../../_services/marketing.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MaisVendidosService } from 'src/app/_services/mais-vendidos.service';

@Component({
  selector: 'app-mais-vendidos',
  templateUrl: './mais-vendidos.component.html',
  styleUrls: ['./mais-vendidos.component.css']
})
export class MaisVendidosComponent implements OnInit {

  @Input() inputBannerHomeCentro;
  @Input() inputResponsive;
  itemsPerPage = 16; // Produtos por página;
  p: number = 1;
  public msgNaoEncontrado = '';
  public produto         = [];
  public produtoView     = [];
  public parametros;
  public naoEncontrado;
  public categoria;
  public idcategoria;
  public subcategoria;
  public overlay;
  public customer;
  public array;
  public layoutAtual;
  public link = [];
  public banner:any;
  public rota:any;
  public rotaBase:any;
  public filtrosView:any = [];
  public filtrosAplicadosView:any = [];
  public url_atual;

  public tiposFiltros = [
    { referencia:'c', descricao:'Categoria'},
    { referencia:'d', descricao:'Descontos'},
    { referencia:'e', descricao:'Avaliação'},
    { referencia:'p', descricao:'Preço'},
    { referencia:'o', descricao:'Ordenação'}
  ]
  public estrelaAvaliacao = [
    {ref : 'e',nome: '5 Estrelas',qtdEstrela : 5},
    {ref : 'e',nome: '4 Estrelas',qtdEstrela : 4},
    {ref : 'e',nome: '3 Estrelas',qtdEstrela : 3},
    {ref : 'e',nome: '2 Estrelas',qtdEstrela : 2},
    {ref : 'e',nome: '1 Estrelas',qtdEstrela : 1},
  ];
  public ordernacaoPreco = [
    {ref : 'o',nome: 'Maior valor'},
    {ref : 'o',nome: 'Menor valor'},
    {ref : 'o',nome: 'Mais avaliados'}
  ]
  public paginaCarregada:boolean = false;
  // BREADCRUMB
  public breadCrumb = [{
    link:["/institucional","mais-vendidos"],
    nome:"Mais Vendidos"
  }];
  public carrossel:OwlOptions;

  public carrosselPaginaCategoria = {
    margin: 0,
    nav: '',
    //  navText: ["<div class='nav-btn prev-slide'></div>", "<div class='nav-btn next-slide'></div>"],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: ''
      },
      600: {
        items: 1,
        nav: ''
      },
      1000: {
        items: 1,
        nav: true,
        loop: false
      },
      1500: {
        items: 1,
        nav: true,
        loop: false
      }
    }
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sDados: DadosService,
    private sProduto: ProdutoService,
    private sFavorito: FavoriteService,
    private user: UserService,
    private meta: Meta,
    private title: Title,
    public sMarketingService: MarketingService,
    private sMaisVendidos:MaisVendidosService) {
      this.customer = this.user.currentUserValue; 
      this.sMarketingService.camposURL(location.search.slice(1));
  }
  ngOnInit() {
    this.overlay = document.querySelector('.overlay-body');
    this.carrossel = {
      loop: false,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      navText: ['<span aria-label="Previous">‹</span>', '<span aria-label="Next">›</span>'],
      responsive: {
        0: {
          items: 1
        }
      },
      nav: true
    }

    this.url_atual = window.location.href;

    this.route.params.subscribe(params => {
      if (params) {
        this.produto         = [];
        this.filtrosView     = [];
        this.parametros   = params;
        this.rotaBase     = ['/institucional','mais-vendidos'];
        this.link         = [];
        // this.breadCrumb   = [];

        if(params.ref1 && params.ref1 != ''){
          this.link.push(""+params.ref1+"/"+params.val1+"");
        }
        if(params.ref2 && params.ref2 != ''){
          this.link.push(""+params.ref2+"/"+params.val2+"");
        }
        if(params.ref3 && params.ref3 != ''){
          this.link.push(""+params.ref3+"/"+params.val3+"");
        }
        if(params.ref4 && params.ref4 != ''){
          this.link.push(""+params.ref4+"/"+params.val4+"");
        }
        if(params.ref5 && params.ref5 != ''){
          this.link.push(""+params.ref5+"/"+params.val5+"");
        }
        this.getProdutosMaisVendidos();
      }
    });
    
  }
  
  public getLinkArray(urlBase,link:String){
    let v = link.split("/");
    let r = [urlBase];
    for(let l of v){
      r.push(l);
    }
    return r;
  }
  bannerClick(id:number,url:any){
    this.sMarketingService.clickBanner(id);
  }

  public getEstrelaAvaliacao(qtd){
    return this.sDados.getEstrelaAvaliacao(qtd);
  }
  public getTipoFiltro(ref){
    let tipo:any
    this.tiposFiltros.forEach(v =>{
      if(ref == v.referencia){
        tipo = v.descricao
      }
    });
    return tipo;
  }
  public in_array(arrayFiltros,valorProcura){    
    let tamanho = arrayFiltros.length;
    let i = 0;
    for(i = 0; i < tamanho; i++){
      if(arrayFiltros[i] == valorProcura){
        return true
      }
    }
    return false;
  }
  public arrayToString(array,separador){
    let i = 0;
    let tamanaho = array.length;
    let string = '';
    if(tamanaho > 0){
      for(i = 0; i < tamanaho; i++){
        string += array[i]+separador;
      }
    }
    return string.substr(0, string.length -1);
  }
  public redirectUser(link){
    let separaBarra;
    if(link.length > 0){
      for(let i = 0; i < link.length; i++){
        separaBarra = link[i].split("/");
        this.rotaBase.push(separaBarra[0],separaBarra[1]);
      }
    }
    this.router.navigate(this.rotaBase);
  }
  public existeReferencia(links,ref){
    let separaBarra;
    for(let i = 0; i < links.length; i++){
      separaBarra = links[i].split("/");
      if(separaBarra[0] == ref){
        return true;
      }
    }
    return false;
  }
  public getFiltroView(){
    let b,v;
    let obj = [];
    if(this.link.length > 0){
      for(let l of this.link){
        b = l.split("/");
        v = b[1].split(",");
        for(let filtros of v){
          obj.push({
            referencia:b[0],
            valor:filtros,
            valorMascara:this.getValorMascara(b[0],filtros),
            categoria:this.getTipoFiltro(b[0])
          });

        }
      }
    }
    return obj;
  }
  public getValorMascara(ref,valor){
    for(let fv of this.filtrosView){
      if(fv.ref == ref && valor == fv.valor){
        return fv.descricao;
      }
    }
  }
  public getLinkByReferencia(link,ref){
    let b,v,resultado;
    for(let i = 0; i < link.length; i++){
      b = link[i].split("/");
      if(b[0] == ref){
        for(let y = 0; y < b.length;y++){
          v = b[y].split(",");
          resultado = v;
        }
      }
    }
    return resultado;
  }
  public trataValor(valor){
    return valor.toLowerCase().replace(/\s/g, "-");
  }
  public removerTodos(){
    this.router.navigate(this.rotaBase);
  }
  public filtrar(referencia,valor){
    valor = this.trataValor(valor);
    let valoresFiltro;
    if(this.link.length > 0){
      if(this.existeReferencia(this.link,referencia)){
        if(referencia == 'c'){
          valoresFiltro = this.getLinkByReferencia(this.link,referencia);
          if(this.in_array(valoresFiltro,valor)){
            valoresFiltro.splice(valoresFiltro.indexOf(valor), 1 );
            let novo = [];
            if(valoresFiltro.length > 0){
              for(let i = 0; i < this.link.length; i++){
                if(this.link[i][0] == referencia){
                  this.link[i] = referencia+"/"+this.arrayToString(valoresFiltro,",");
                }
              }
            }else{
              for(let i = 0; i < this.link.length; i++){
                if(this.link[i][0] != referencia){
                  novo.push(this.link[i]);
                }
              }
              this.link = novo;
            }
          }else{
            //ACUMULA FILTRO COM VIRGULA
            for(let i = 0; i < this.link.length; i++){
              if(this.link[i][0] == referencia){
                this.link[i] += ','+valor;
              }
            }
          }
        }else{
          valoresFiltro = this.getLinkByReferencia(this.link,referencia);
          let novo = [];
          if(this.in_array(valoresFiltro,valor)){
            for(let i = 0; i < this.link.length; i++){
              if(this.link[i][0] != referencia){
                novo.push(this.link[i]);
              }
            }
            this.link = novo;
          }else{
            for(let i = 0; i < this.link.length; i++){
              if(this.link[i][0] == referencia){
                this.link[i] = referencia+"/"+valor;
              }
            }
          }
        }
      }else{
        this.link.push(referencia+"/"+valor);
      }

    }else{
      this.link.push(referencia+"/"+valor);
    }
    this.redirectUser(this.link.sort())
  }

  public verificaCheck(ref){
    for(let i = 0; i < this.filtrosView.length;i++){
     if(this.filtrosView[i].ref == ref){
       if(this.filtrosView[i].checked){
         return true;
       }
     }
    }
    return false;
  }

  public setCheckFiltrosAplicados(){
    for(let fa of this.filtrosAplicadosView){
      for(let i = 0; i < this.filtrosView.length;i++){
        if(fa.referencia == this.filtrosView[i].ref && fa.valor == this.filtrosView[i].valor){
          this.filtrosView[i].checked = true;
        }
      }
    }
  }

  central: any;
  private setCentral(central: any) { this.central = central; }
  getCentral() { return this.central; }

  public filtroAcumulado(filtro,ref){
    let cont = 0;
    for(let f of filtro){
      if(ref == f.referencia){
        cont++;
      }
    }
    return cont;
  }
  /** 
		* Método responsavel por buscar os produtos via requisição API . 
		* Código da Categoria
		* @var Integer idcategoria
  */
  private getProdutosMaisVendidos() {
    let produtoFiltro  = [];
    this.naoEncontrado = '';
    
    this.sMaisVendidos.getMaisVendidos().subscribe(
      r => {        
        // MARKETING
        this.title.setTitle(r.titulo);
        const tags = [
          { name: 'description', content: r.metatag},
          { name: 'keywords',    content: r.keyword},
        ];        
        tags.forEach(tag => this.meta.updateTag(tag));

        // var imagem_banner:any;  
        // if(r.banner[0] !== "" && r.banner[0] !== undefined) {
        //   imagem_banner = r.banner[0].arquivo;    
        // }else{
        //   imagem_banner = "Imagem não cadastrada!";
        // }
        // this.sMarketingService.openGraph(r.descricao,imagem_banner); 
        // FIM MARKETING

        // this.breadCrumb.push(
        //   {nome:r.categoria_principal,link:r.link_categoria.split("/")},
        //   {nome:r.subcategoria,link:r.link_subcategoria.split("/")}
        // );

        if (r.products.length > 0) {
          r.products.forEach((v, k) => {
            this.produto.push(v);
            this.banner = r.banner;
          });
        }
        if(r.categorias.length > 0){
          for(let categoria of r.categorias){ 
            this.filtrosView.push({tipo:'categoria',ref:'c',descricao:categoria.nome,valor:this.trataValor(categoria.nome)})
          }
        }
        if(r.desconto.length > 0){
          for(let desconto of r.desconto){ 
            this.filtrosView.push({tipo:'desconto',ref:'d',descricao:desconto.descricao,valor:desconto.percentual_minimo+'-'+desconto.percentual_maximo})
          }
        }
        if(r.preco.length > 0){
          for(let preco of r.preco){ 
            this.filtrosView.push({tipo:'preco',ref:'p',descricao:preco.valor,valor:preco.inicial+'-'+preco.final})
          }
        }

        for(let op of this.ordernacaoPreco){ 
          this.filtrosView.push({tipo:'ordenar',ref:'o',descricao:op.nome,valor:this.trataValor(op.nome)});
        }

        for(let estrela of this.estrelaAvaliacao){
          this.filtrosView.push({tipo:'estrela',ref:'e',descricao:estrela.nome,valor:this.trataValor(estrela.nome)})
        }
      },

      e => {
        this.naoEncontrado = JSON.parse(e._body);
        this.naoEncontrado = this.naoEncontrado.Label;
        $(".loading").fadeOut(0);
      },
      () =>{
        this.filtrosAplicadosView = this.getFiltroView();
        this.produtoView          = this.produto;
        this.setCheckFiltrosAplicados();
        let p_valor;
        let i = 0;
        let filtroPush     = [];
        let categoriaPush  = [];
        if(this.filtrosAplicadosView.length > 0){
          let filtroCategoriaAcumulado = this.filtroAcumulado(this.filtrosAplicadosView,'c');
          for(let fa of this.filtrosAplicadosView){
            //PRODUTO
            if(fa.referencia == 'p'){
              filtroPush = [];
              if(produtoFiltro.length > 0){
                for(let p of produtoFiltro){
                  p_valor = fa.valor.split("-");
                  if(
                    (parseFloat(p.preco_promocional) >= 0 && parseFloat(p.preco_promocional) >= parseFloat(p_valor[0]) && parseFloat(p.preco_promocional) <= parseFloat(p_valor[1]))
                    ||
                    (parseFloat(p.preco) <= 0 && parseFloat(p.preco) >= parseFloat(p_valor[0]) && parseFloat(p.preco) <= parseFloat(p_valor[1]))){
                      filtroPush.push(p);
                  }
                }
              }else{
                for(let p of this.produto){
                  p_valor = fa.valor.split("-");
                  if(
                    (parseFloat(p.preco_promocional) >= 0 && parseFloat(p.preco_promocional) >= parseFloat(p_valor[0]) && parseFloat(p.preco_promocional) <= parseFloat(p_valor[1]))
                    ||
                    (parseFloat(p.preco) <= 0 && parseFloat(p.preco) >= parseFloat(p_valor[0]) && parseFloat(p.preco) <= parseFloat(p_valor[1]))){
                    produtoFiltro.push(p);
                  }
                }
              }
              
            }
            //CATEGORIA
            if(fa.referencia == 'c'){
              if(produtoFiltro.length > 0){  
                if(filtroCategoriaAcumulado > 1){
                  for(let p of this.produto){
                    if(this.trataValor(p.categoria) == fa.valor){
                      filtroPush.push(p);
                    }
                  }
                }else{
                  for(let pf of produtoFiltro){
                    if(this.trataValor(pf.categoria) == fa.valor){
                      filtroPush.push(pf);
                    }
                  }
                }
              }else{
                if(filtroCategoriaAcumulado > 1){
                  for(let p of this.produto){
                    if(this.trataValor(p.categoria) == fa.valor){
                      filtroPush.push(p);
                    }
                  }
                }else{
                  for(let p of this.produto){
                    if(this.trataValor(p.categoria) == fa.valor){
                      produtoFiltro.push(p);
                    }
                  }
                }
              }
            }

            if(fa.referencia == 'd'){
              filtroPush = [];
              if(produtoFiltro.length > 0){
                for(let pf of produtoFiltro){
                  p_valor = fa.valor.split("-");
                  if(parseFloat(pf.percentual) >= parseFloat(p_valor[0]) && parseFloat(pf.percentual) <= parseFloat(p_valor[1])){
                    filtroPush.push(pf);
                  }
                }
              }else{
                for(let p of this.produto){
                  p_valor = fa.valor.split("-");
                  if(parseFloat(p.percentual) >= parseFloat(p_valor[0]) && parseFloat(p.percentual) <= parseFloat(p_valor[1])){
                    produtoFiltro.push(p);
                  }
                }
              }
            }
            if(fa.referencia == 'e'){
              let l = 0;
              filtroPush = [];
              if(produtoFiltro.length > 0){
                for(let pf of produtoFiltro){
                  p_valor = fa.valor.split("-");
                  if(parseFloat(pf.estrelas) == parseFloat(p_valor[0])){
                    filtroPush.push(pf);
                  }
                }
              }else{
                for(let p of this.produto){
                  p_valor = fa.valor.split("-");
                  if(parseFloat(p.estrelas) == parseFloat(p_valor[0])){
                    produtoFiltro.push(p);
                  }
                }
              }
            }
            
            if(fa.referencia == 'o'){
              let paramFiltro;
              filtroPush = [];
              let val = [];
              let ava = [];


              let filtroPor = (produtoFiltro.length > 0)?produtoFiltro:this.produto;

              for(let p of filtroPor){
                val.push({"valor":parseFloat(p.preco_promocional),"id":p.id});
                ava.push({"valor":p.estrelas,"id":p.id});
              }

              if(fa.valor == "maior-valor"){
                val = this.sDados.order(val,'maior');
              }else if(fa.valor == "menor-valor"){
                val = this.sDados.order(val,'menor');
              }else if(fa.valor == "mais-avaliados"){
                val = this.sDados.order(ava,'maior');
              }

              if(produtoFiltro.length > 0){
                for(let v of val){
                  filtroPush.push(this.getProductById(v,produtoFiltro,fa));
                }
              }else{
                for(let v of val){
                  produtoFiltro.push(this.getProductById(v,this.produto,fa));
                }
              }

            }
            // SE TEM MAIS QUE 1 FILTRO 
            if(filtroPush.length > 0 && i > 0 || categoriaPush.length > 0 && i > 0){
              if(categoriaPush.length > 0){
                produtoFiltro = categoriaPush;
              }else{
                produtoFiltro = filtroPush;
              }
            }else{
              if(produtoFiltro.length > 0 && i > 0){
                produtoFiltro = [];
              }else{
                produtoFiltro = produtoFiltro;
              }
            }
            i++;
          }
          if(filtroPush.length > 0 ){
            this.produtoView = filtroPush;
            this.paginaCarregada = true;
          }else{
            this.produtoView = produtoFiltro;
            this.paginaCarregada = true;
          }
        }else{
          this.produtoView = this.produto;
          this.paginaCarregada = true;
        }
        $(".loading").fadeOut(0);
        setTimeout(() => {
          this.setLayoutType();
        }, 5);
      }
    );
  }

  getProductById(value,productArray,fa){
    let paramFiltro;
    for(let p of productArray){
      paramFiltro = parseFloat(p.preco_promocional);
      if(fa.valor == "mais-avaliados"){
        paramFiltro = p.estrelas;
      }
      if(value.valor == paramFiltro && value.id == p.id){
       return p;
      }
    }
  }

  getEstrelaByProduto(qtdEstrela) {
    return this.sDados.getEstrelaAvaliacao(qtdEstrela);
  }

  addFavorito(id) {
    this.user.checkLogin();

    let json = { 'cpfCnpj': this.user.getCustomer().cpfCnpj, 'id': id };

    this.sProduto.adicionarFavorito(json).subscribe(l =>
      this.sProduto.getProduto(id).subscribe(r => {
        Swal.fire({
          icon: 'success',
          title: 'Adicionado!!!',
          text: r[0].nome + ' adicionado aos seus produtos favoritos!'
        })
      })
    )
  }

  checkFavorito(id) {
    this.user.checkLogin();

    let json = { 'cpfCnpj': this.user.getCustomer().cpfCnpj, 'id': id };

    this.sProduto.adicionarFavorito(json).subscribe(l =>
      this.sProduto.getProduto(id).subscribe(r => {
        Swal.fire({
          icon: 'success',
          title: 'Adicionado!!!',
          text: r[0].nome + ' adicionado aos seus produtos favoritos!'
        })
      })
    )

  }



  public setLayoutType() {
    let valor = localStorage.getItem('layoutType');
    this.layoutAtual = valor;
    document.querySelector('#layout').classList.add(valor);
    document.querySelectorAll('.layout-opt').forEach(e=>{
      if(valor == e.querySelector('input[type="radio"]').getAttribute('value')){
        e.querySelector('input[type="radio"]').setAttribute('checked','');
      }
    });
  }

  public changeLayout(e) {
    let layout = document.querySelector('#layout');
    layout.classList.remove(this.layoutAtual);
    let valor = e.querySelector('input[type="radio"').getAttribute('value');
    this.layoutAtual = valor;
    layout.classList.add(valor);
    localStorage.setItem('layoutType',this.layoutAtual);
  }

  public selectFilter(e){
    let el = e.currentTarget.parentElement;
    
    if(!el.classList.contains('active')){
      el.classList.add('active');
      e.stopPropagation();
    } else {
      el.classList.remove('active');
      e.stopPropagation();
    }

    document.addEventListener('click', ()=>{     
      if(el.classList.contains('active')){
        el.classList.remove('active');
      }
    })
    
  }

  public openFilterMob(){
    let mob = document.querySelector('.ct-sidebar');
    mob.classList.add('active');
    this.openOverlay();
  }

  public closeFilterMob(){
    let mob = document.querySelector('.ct-sidebar');
    mob.classList.remove('active');
    this.closeOverlay();
  }

  public openOverlay(){
   this.overlay.classList.add('active');
  }
  
  public closeOverlay(){
    this.overlay.classList.remove('active');
  }

  public clickOverlay(){
    let mob = document.querySelector('.ct-sidebar')
    if(mob.classList.contains('active')){
      this.closeFilterMob();
    }
  }
 
  public filterMob(){
    if(window.innerWidth < 991){
      document.querySelectorAll('.card-collapse-conteudo').forEach(e=>{

        e.classList.remove('collpase');
        e.classList.remove('show');
      })
    }
  }


}
