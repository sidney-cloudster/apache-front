import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequisicoesService } from '../../_services/requisicoes.service';
import { DadosService } from '../../_services/dados.service';
import { CarouselProdutosComponent } from '../../layout/carousel-produtos/carousel-produtos.component';
import { CategoriasService } from '../../_services/categorias.service';
import { IndexService } from 'src/app/_services/index.service';
import Swal from 'sweetalert2';
import { Title, Meta } from '@angular/platform-browser';
import { MarketingService } from 'src/app/_services/marketing.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProdutoService } from 'src/app/_services/produto.service';
import { FavoriteService } from 'src/app/_services/favorite.service';
@Component({
  selector: 'app-categoriaproduto',
  templateUrl: './categoriaproduto.component.html',
  styleUrls: ['./categoriaproduto.component.css']
})

export class CategoriaprodutoComponent implements OnInit {

  @Input() inputBannerHomeCentro;
  @Input() inputResponsive;

  public overlay;

  public link;
  public rotaRedirecionaCategoria:any;
  public rotaBase:any;
  public itemsPerPage = 16; // Produtos por página;
  public p:number = 1;
  public categoria;
  public idcategoria;

  public msgNaoEncontrado;
  public naoEncontrado;
  public paginaCarregada:boolean = false;

  public outPutTitulo: any;
  public outPutProdutosCarrossel: any;
  public outPutProdutosCarrosselConfiraTambem: any;
  public outPutProdutosCarrosselAproveiteTambem: any;
  public outPutProdutosCarrosselMarcas: any;
  public outPutProdutosCarrosselQuemViuComprouTambem: any;
  public outPutArrayQtdItens: any = [2,3,4,5,5];

  public tituloCarousel;
  public tituloConfiraTambem;
  public tituloAproveiteTambem;
  public tituloMarcasProcuradas;
  public tituloQuemViuComprouTambem;

  public titulo: string;
  public descricao: string;
  public metatag: string;
  public keyword: string;
  public categorias;
  public banners: any = [];
  public desconto;
  public componentes: any = [];
  public central:any;
  // FILTROS
  public categoriaView  = [];
  public filtrosAplicadosView;
  public produtoView;
  public filtrosView = [];
  public produto = [];
  public buscados:any = [];

  public tiposFiltros = [
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
  public carrossel:OwlOptions;
  public banner;
  public breadCrumb = [];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sDados: DadosService,
    private sCategoria: CategoriasService,
    private title: Title,
    private meta: Meta,
    public sMarketingService:MarketingService,
    private sProduto: ProdutoService,
    private sFavorito: FavoriteService
  ) {
    
    this.sMarketingService.camposURL(location.search.slice(1));
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

    this.route.params.subscribe(params => {
      
      if (params) {
        var idcategoria = parseInt(params.idcategoria);
        if (Number.isInteger(idcategoria)) {

          this.categoria   = params.categoria;
          this.idcategoria = idcategoria;
          $(".loading").fadeIn(0);
          this.paginaCarregada = false;
          this.sCategoria.getCategoriaById(this.idcategoria).subscribe(
            rc => {
              
              this.banner = rc.banners;
              this.naoEncontrado   = false;
              this.paginaCarregada = true;

              this.breadCrumb  = [];
              this.title.setTitle(rc.titulo);
              const tags = [
                { name: 'description', content: rc.metatag},
                { name: 'keywords',    content: rc.keyword},
              ];        
              tags.forEach(tag => this.meta.updateTag(tag));

              var imagem_banner:any;  
              if(rc.banners[0] !== "" && rc.banners[0] !== undefined) {
                imagem_banner = rc.banners[0].image;    
              }else{
                imagem_banner = "Imagem não cadastrada!";
              }
              this.sMarketingService.openGraph(rc.metatag, imagem_banner);  

              this.rotaBase   = ['/categorias',this.categoria,this.idcategoria];
              this.rotaRedirecionaCategoria = ['/categorias/',this.categoria];
              this.link        = [];
              this.produto     = [];
              this.filtrosView = [];

              this.breadCrumb.push({nome:this.categoria,link:''})

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

              if(rc.categorias.length > 0){
                this.categoriaView = [];
                for(let categoria of rc.categorias){ 
                  if(categoria.submenu.length > 0){
                    this.categoriaView.push(categoria);
                    for(let subcategoria of categoria.submenu){
                      this.filtrosView.push({tipo:'subcategoria',ref:'c',descricao:subcategoria.nome,valor:this.trataValor(subcategoria.nome),id:categoria.idCategoria,url:categoria.nome+'/'+categoria.idCategoria})
                    }
                  }
                }
              }
              // if(rc.buscados.length > 0){
              //   for(let buscados of rc.buscados){ 
              //     this.filtrosView.push({tipo:'buscados',ref:'b',descricao:buscados.descricao,valor:this.trataValor(buscados.descricao)})
              //   }
              // }

              this.buscados = rc.buscados;

              if(rc.desconto.length > 0){
                for(let desconto of rc.desconto){ 
                  this.filtrosView.push({tipo:'desconto',ref:'d',descricao:desconto.descricao,valor:desconto.percentual_minimo+'-'+desconto.percentual_maximo})
                }
              }
              if(rc.preco.length > 0){
                for(let preco of rc.preco){ 
                  this.filtrosView.push({tipo:'preco',ref:'p',descricao:preco.valor,valor:preco.inicial+'-'+preco.final})
                }
              }

              for(let op of this.ordernacaoPreco){ 
                this.filtrosView.push({tipo:'ordenar',ref:'o',descricao:op.nome,valor:this.trataValor(op.nome)});
              }

              for(let estrela of this.estrelaAvaliacao){
                this.filtrosView.push({tipo:'estrela',ref:'e',descricao:estrela.nome,valor:this.trataValor(estrela.nome)})
              }
            
              if (rc.componentes.length > 0) {

                this.setTitulo(rc.titulo);
                this.setDescricao(rc.descricao);
                this.setMetatag(rc.metatag);
                this.setKeyword(rc.keyword);
                this.setCategorias(rc.categorias);
                this.setBanners(rc.banners);
                this.setDesconto(rc.desconto);
                this.setComponentes(rc.componentes);
                this.outPutProdutosCarrosselConfiraTambem = rc.componentes[1].products;
                this.tituloCarousel = rc.componentes[0].titulo;
                this.tituloConfiraTambem = rc.componentes[1].titulo;
                this.tituloMarcasProcuradas = rc.componentes[2].titulo;
                this.tituloQuemViuComprouTambem = rc.componentes[3].titulo;
                this.outPutProdutosCarrosselAproveiteTambem = rc.componentes[1].products;
                this.outPutProdutosCarrosselMarcas = rc.componentes[2].products[0].products
                this.outPutProdutosCarrosselQuemViuComprouTambem = rc.componentes[3].products;                
                
              }
            },
            e => {
              this.msgNaoEncontrado = 'Nenhum produto foi encontrado para essa categoria.';
              this.naoEncontrado    = true;
              this.paginaCarregada  = true;
              $(".loading").fadeOut(0);
            },
            () => {
              this.setLayoutBanners(this.getComponentes());

            if(this.link.length > 0){

              this.sCategoria.getProdutosCategoriaById(this.idcategoria).subscribe(r =>  {
              this.produto        = r.produtos;
              this.filtrosAplicadosView = this.getFiltroView();
              this.produtoView          = this.produto;
              this.setCheckFiltrosAplicados();
              let p_valor;
              let i = 0;
              let filtroPush     = [];
              let categoriaPush  = [];
              let produtoFiltro  = [];

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
                      filtroPush.push(this.getProdcutById(v,produtoFiltro,fa));
                    }
                  }else{
                    for(let v of val){
                      produtoFiltro.push(this.getProdcutById(v,this.produto,fa));
                    }
                  }
    
                }

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
              }else{
                this.produtoView = produtoFiltro;
                this.paginaCarregada = true;
              }
  
            }else{
              this.produtoView = this.produto;
              this.paginaCarregada = true;
            }
              $(".loading").fadeOut(0);
              this.paginaCarregada = true;
            });
          }
          $(".loading").fadeOut(0);
          this.paginaCarregada = true;
          });
        } else {
          this.router.navigate(['/']);
        }
      } else {
        this.router.navigate(['/']);
      }
      
    },
    error => {

    },
    () =>{
      this.paginaCarregada = true;
    });
  }

  getProdcutById(value,productArray,fa){
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
  public setCentral(central:any){this.central = central;}
  
  ngOnInit() {

    this.overlay = document.querySelector('.overlay-body');

    
  }
  public filtrar(referencia,valor){
    let valoresFiltro;
    let splitBarra,splitPipe;
    valor = (referencia != 'c')?this.trataValor(valor):valor;
    
    
    if(referencia == 'c'){
      
      splitPipe        = valor.split("|");
      splitBarra       = splitPipe[0].split("/");
      let categoria    = this.trataValor(splitBarra[0]);
      let idCategoria  = splitBarra[1];
      let separaBarra;
      this.link.push(referencia+"/"+splitPipe[1]);
      this.link.sort();

      this.rotaRedirecionaCategoria.push(categoria,idCategoria);
      for(let redirect of this.link){
        separaBarra = redirect.split("/");
        this.rotaRedirecionaCategoria.push(separaBarra[0],separaBarra[1]);
      }
      this.router.navigate(this.rotaRedirecionaCategoria);

    }else if(referencia == 'b'){

    }else{
      if(this.link.length > 0){
        if(this.existeReferencia(this.link,referencia)){
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
        }else{
          this.link.push(referencia+"/"+valor);
        }
      }else{
        this.link.push(referencia+"/"+valor);
      }
      this.redirectUser(this.link.sort())
    }
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
  private setTitulo(titulo: string) {
    this.titulo = titulo;
  }
  private setDescricao(descricao: string) {
    this.descricao = descricao;
  }
  private setMetatag(metatag: string) {
    this.metatag = metatag;
  }
  private setKeyword(keyword: string) {
    this.keyword = keyword;
  }
  private setCategorias(categorias) {
    this.categorias = categorias;
  }
  private setBanners(banners) {
    this.banners = banners;
  }
  private setDesconto(desconto) {
    this.desconto = desconto;
  }
  private setComponentes(componentes) {
    this.componentes = componentes;
  }


  getTitulo() {
    return this.titulo;
  }
  getDescricao() {
    return this.descricao;
  }
  getMetatag() {
    return this.metatag;
  }
  getKeyword() {
    return this.keyword;
  }
  getCategorias() {
    return this.categorias;
  }
  getBanners() {
    return this.banners;
  }
  getDesconto() {
    return this.desconto;
  }
  getComponentes() {
    return this.componentes;
  }

  public removerTodos(){
    this.router.navigate(this.rotaBase);
  }

  public trataValor(valor){
    return valor.toLowerCase().replace(','," ").replace(/\s/g, "-");
  }
  getEstrelaByProduto(qtdEstrela){
    return this.sDados.getEstrelaAvaliacao(qtdEstrela);
  }
  public getEstrelaAvaliacao(qtd){
    return this.sDados.getEstrelaAvaliacao(qtd);
  } 

  public getLinkArray(urlBase,link:String){
    let v = link.split("/");
    let r = [urlBase];
    for(let l of v){
      r.push(l);
    }
    return r;
  }

  public getValorMascara(ref,valor){
    for(let fv of this.filtrosView){
      if(fv.ref == ref && valor == fv.valor){
        return fv.descricao;
      }
    }
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
  public filtroAcumulado(filtro,ref){
    let cont = 0;
    for(let f of filtro){
      if(ref == f.referencia){
        cont++;
      }
    }
    return cont;
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
  public abreDropDownFiltro(categoria){
    for(let fv of this.filtrosView){
      if(fv.ref == 'c'){
        if(categoria.idCategoria == fv.id && fv.checked){
          return true;
        }
      }
    }
    return false;
  }

  // MÉTODO RESPONSAVEL POR FAZER O CHECK [V] NO FILTRO QUE ESTA APLICADO
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


  private setLayoutBanners(componentes: any) {
    componentes.forEach((v, k) => {
      if (v.tipo == "carousel" && k == 0) {
        this.outPutTitulo = v.titulo;
        this.outPutProdutosCarrossel = v.products;
      }
    })
  }

  bannerClick(id:number,url:any){
    this.sMarketingService.clickBanner(id);
  }

  
  public selectFilter(e){
    let el = e.parentElement;

    if(!el.classList.contains('active')){
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
    
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

  adicionarFavoritos(id:number){
    return this.sFavorito.addFavorito(id);
  }

  verificaFavorito(id:number){
    return this.sDados.isFavorito(id);
  }

}
