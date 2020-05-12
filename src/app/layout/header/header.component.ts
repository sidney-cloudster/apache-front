import { Component, OnInit,Injectable, Input, OnChanges, ɵConsole} from '@angular/core';
import { BuscaService } from '../../_services/busca.service';
import { Router } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { HeaderService } from '../../_services/header.service';
import { CarrinhoCompraService } from '../../_services/carrinho-compra.service';
import { ProdutoService } from '../../_services/produto.service';
import { CookieService } from 'ngx-cookie-service';
import {AuthService } from 'angularx-social-login';
import { configEnvi } from 'src/environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FavoriteService } from 'src/app/_services/favorite.service';
declare let $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() titulo;
  @Input() descricao;
  @Input() logo;
  @Input() corPrimaria;
  @Input() corSecundaria;
  @Input() hotsite;
  
  header:any;
  public customer;
  public overlay;
  public filter = '';
  public empytResult: boolean = false;
  public stateMenu:boolean;
  public time;
  public loadCarrinho:boolean;
  public overlayTime;
  public timeDailyOffer;
  public cartHover;
  public contandoUsuario;
  public keyUpSearch:boolean = false;
  public lastCat;
  public timeoutCategoria;
  // public qtdFavorito:any = 11111;
  public qtdProdutos:any;
  public resultadoBuscaSite;
  public textoPesquisa;
  public buscasRealizadas;
  public produtos:any = [];
  public totalCompra:number = 0;
  public totalCompraAux:number = 0;
  public paginaCarregada:boolean = false;
  public contaFavoritos:any = 0;
  public countProduto:any = 0;
  constructor(
    private sBusca:BuscaService,
    private router:Router,
    private sUser:UserService,
    private sHeader:HeaderService,
    private sCarrinho:CarrinhoCompraService,
    private sProduto:ProdutoService,
    private cookieService: CookieService,
    private socialAuthService: AuthService,
    public config: configEnvi,
    private _snackBar:MatSnackBar,
    private sFavorite: FavoriteService
  ) {
  }

  public login(socialPlatform : string) {
    let social = this.sUser.loginRedeSocial(socialPlatform);
    let json:any;
    this.socialAuthService.signIn(social).then(
      (userData) => {
        json = this.sUser.getJsonUsuario(userData.id,userData.name,userData.name,'I','',userData.email,userData.photoUrl,socialPlatform);
        this.sUser.setCustomer(json);
        this.customer = this.sUser.getCustomer();
      }
    );
  }
  private setHeader(header:any){
    this.header = header;
  }
  private setResultadoBuscaSite(resultadoBuscaSite:any){
    this.resultadoBuscaSite = resultadoBuscaSite;
  }
  private setTextoPesquisa(textoPesquisa:any){
    this.textoPesquisa = textoPesquisa;
  }
  private setBuscasRealizadas(buscasRealizadas:any){
    this.buscasRealizadas = buscasRealizadas;
  }
  private setProdutos(produtos:any){
    this.produtos = produtos;
  }
  private setTotalCompra(totalCompra:any){
    this.totalCompra += totalCompra;
  }
  private resetTotalCompra(){
    this.totalCompra = 0;
  }
  getHeader(){
    return this.header;
  }
  getResultadoBuscaSite(){
    return this.resultadoBuscaSite;
  }
  getTextoPesquisa(){
    return this.textoPesquisa;
  }
  getBuscasRealizadas(){
    return this.buscasRealizadas;
  }
  getProdutos(){
    return this.produtos;
  }
  getTotalCompra(){
    return this.totalCompra;
  }

  public carrinhoCompra(){
    
    this.getProdutosCarrinho();
  }
  BotaoPesquisaSite(v:any){
    if(v != ""){
      this.router.navigate(['/busca/', v]);
      this.ocultaBoxSearch();
      this.setBuscaRealizadas(v);
    }
  }
  keyPesquisaSite(v:any){
    this.keyUpSearch = true;
    if(v.length > 1){
      this.sBusca.autocompleteBusca(v).subscribe((r)=>{
        this.setResultadoBuscaSite(r);
      },
      error =>{
        // ERRO NO AUTOCOMPLETE
      });
    }else{
      this.setResultadoBuscaSite(false);
      this.keyUpSearch = false;
    }
    this.textoPesquisa = v;
  }
  getBuscaRealizadas(){
    var p:any = localStorage.getItem("pesquisasRealizadas");
    if(p){
      p = JSON.parse(p);
      if(p.pesquisas.length > 0){
        return p.pesquisas.sort();
      }else{
        return false;
      }
    }else{
      return false;
    }
  }
  private setBuscaRealizadas(texto:String){
    var pesquisa = localStorage.getItem("pesquisasRealizadas");
    var jsonText;
    var novoArray = [];
    jsonText = {
      pesquisas : []
    };
    if(!pesquisa){
      jsonText.pesquisas.push(texto);
      jsonText = JSON.stringify(jsonText);
      localStorage.setItem("pesquisasRealizadas",jsonText);
    }else{      
      var jsonObject = localStorage.getItem("pesquisasRealizadas");
      var js         = JSON.parse(jsonObject);
      for(let i = 0; i < js.pesquisas.length; i++){
        if(js.pesquisas[i] == texto){
          delete js.pesquisas[i];
        }
      }
      for(let i = 0; i < js.pesquisas.length; i++){
        if(js.pesquisas[i]){
          novoArray.push(js.pesquisas[i]);
        }
      }
      novoArray.push(texto);
      js.pesquisas = novoArray;
      localStorage.setItem("pesquisasRealizadas",JSON.stringify(js));
    }
  }   

  public logout(){
    this.sUser.logout();
    this.router.navigate(['/']);
    localStorage.removeItem('favoritosId');
    this.customer = "";
    this.contaFavoritos = this.sFavorite.contaFavoritos();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public clearSearch(e){
    document.querySelector(e).value = '';
    this.setResultadoBuscaSite(false);
    this.keyUpSearch = false;
  }
  public ocultaBoxSearch(){
    $('.overlay').removeClass('active');
      $('.box-search').hide();
      if(this.textoPesquisa){
        if(this.textoPesquisa.length <= 2 && this.resultadoBuscaSite){
          this.setResultadoBuscaSite(false);
          this.keyUpSearch = false;
        }
      }
  }
  public setPrecoProduto(produto,arrayPreco:any,p:number){
    produto.total = parseFloat(arrayPreco[0].total);
    produto.preco = parseFloat(arrayPreco[0].preco);
    this.setTotalCompra(produto.total);
  }
  getProdutosCarrinho(){
    let produtosCarrinho = this.sCarrinho.getProdutosCarrinho();
    if(!this.comparaCarrinho(produtosCarrinho)){
      this.setProdutos(produtosCarrinho);
      this.loadCarrinho = true;
      this.qtdProdutos  = this.sCarrinho.getQuantidadeProdutosCarrinho();
      let produtos = this.getProdutos();
      this.resetTotalCompra();
      
      if(produtos.length > 0){    
          produtos.forEach((v,k) => {
            this.sProduto.getPrecoProduto(v.id,v.skuProduto,v.quantidade).subscribe(
              r =>{
                this.setPrecoProduto(v,r,k);
              },
              e =>{
                // ERRO AO BUSCAR PREÇO DO PRODUTO
                this.loadCarrinho = false;
              },
              () =>{
                this.loadCarrinho = false; 
              });
        });
      } else {
        this.loadCarrinho = false; 
      }
    }
  }
  buscaProduto(txt:string){
    if(txt.length > 0){
      this.router.navigate(['/busca/', txt]);
      this.setBuscaRealizadas(txt);
      $('.overlay').removeClass('active');
      $('.box-search').hide();
    }
  }

  async removeItemBusca(i:number){
    let buscas = this.getBuscaRealizadas();
    let y = 0;
    localStorage.removeItem("pesquisasRealizadas");
    for(let b of buscas){
      if(i != y){
        await this.setBuscaRealizadas(b);
      }
      y++;
    }
    this.buscasRealizadas = this.getBuscaRealizadas();
  }

  public getLinkArray(urlBase,link:String){
    let v = link.split("/");
    let r = [urlBase];
    for(let l of v){
      r.push(l);
    }
    return r;
  }

  public deleteProduto(produto:any){
    this.sCarrinho.removeProdutoCarrinho(produto);
    this.getProdutosCarrinho();
  }
  ngOnInit() {
    
    this.showToTop();
    this.overlay = document.querySelector('.overlay');
    this.fixedNav();
    this.rulesResponsive();
    this.contaFavoritos = this.sFavorite.contaFavoritos();

    this.sHeader.getHomePageBanners().subscribe(r=>{
      if(r.banner != ''){
        this.setHeader(r.banner.header);
      }
    })

    this.customer = this.sUser.getCustomer();    

    this.buscasRealizadas = this.getBuscaRealizadas();
    this.getProdutosCarrinho();
  }


  public abrirSubMenu(i){
      document.querySelectorAll('.nav-categoria').forEach(e=>{
        e.classList.remove('show');
      });
      $('.category-sub').removeClass('show');
      $('.category-sub[id='+i+']').addClass('show');
      setTimeout(function() {
      $('.overlay').mouseenter(function() {
        $('.category-sub').removeClass('show');
      })
    }, 500);
  }
  
  formataPreco(valor){
    let v = valor.split(".");
    return v[0];
  }
  formataPrecoCentavos(valor){
    let v = valor.split(".");
    return v[1];
  }
  public abrirMenuNav(i) {
    this.lastCat = document.querySelector('#menu-'+i+' .nav-categoria');
    var select = document.querySelector('#menu-'+i);
    var cat = document.querySelector('#menu-'+i+' .nav-categoria');
    
    this.time = setTimeout(() => {
      select.classList.add('z-overlay');
      cat.classList.add('show');
      this.showOverlay();
    }, 200);
  }
  public fecharMenuNav() {
    clearTimeout(this.time);
  }
  public closeMenuHover(){
    if(this.checkFixedTop()){
      document.querySelectorAll('.nav-categoria').forEach(e=>{
        if(e.classList.contains('show')){
          e.classList.remove('show');
        }
      })
    }
  }

  public abrirSubBox(i) {
    $('.ctm-sub-box[id="'+i+'"]').addClass('show');
  }

  public fecharSubBox(i) {
    $('.ctm-sub-box[id="'+i+'"]').removeClass('show');
  }

  public checkOverlayStatus(){
    if(this.overlay.classList.contains('active')){
      return true;
    } else {
      return false;
    }
  }
  // COMPARA O CARRINHO QUE JA FOI CALCULADO COM O NOVO CARRINHO
  comparaCarrinho(prod:any){
    let newCarrinho = prod;
    let oldCarrinho = this.getProdutos();

    if(oldCarrinho != ''){
      if(newCarrinho.length == oldCarrinho.length){
        for(let n of newCarrinho){
          for(let o of oldCarrinho){
            if(n.idseller == o.idseller && n.id == o.id && n.skuProduto == o.skuProduto && n.quantidade == o.quantidade){
              return true;
            }
          }
        }
      }
    }
    return false;
  }
  public showOverlay(){
    this.overlay.classList.add('active');
  }
  public removeOverlay(){
    this.overlay.classList.remove('active');
  }

  public overlayClick(){
    let carrinhoEl = document.querySelector('.crt-carrinho');
    let userEl     = document.querySelector('.box-user');
    let categoriaEl= document.querySelector('.box-categorias');
    let navEl      = document.querySelector('.nav-search');
    let categoriaMobile = document.querySelector('.mobile-categoria');



    if (this.checkOverlayStatus()){
          // Fechar carrinho ao clicar overlay
      if(carrinhoEl.classList.contains('show')){
        carrinhoEl.classList.remove('show');
        carrinhoEl.classList.remove('hover');
        carrinhoEl.classList.remove('click');
        document.querySelector('#crt-carrinho').classList.remove('z-overlay');
        this.removeOverlay();
      }
          // Fechar usario tooltip ao clicar overlay
      if (userEl.classList.contains('show')) {
        document.querySelector('#user-act').classList.remove('z-overlay');
        userEl.classList.remove('show');
        userEl.classList.remove('hover');
        userEl.classList.remove('click');
        this.removeOverlay();
      }
        // Fechar categorias geral ao clicar overlay
      if (categoriaEl.classList.contains('show')) {
          this.hideCats();
        }
        // Remove overlay ao click fora do seach (overlay)
      if(navEl.classList.contains('z-overlay')) {
        let searchEl = document.querySelector('.box-search');
        this.removeOverlay();
        searchEl.classList.remove('show');
        navEl.classList.remove('z-overlay');
        if(this.textoPesquisa){
          if(this.textoPesquisa.length  <= 2 && this.resultadoBuscaSite){
            this.setResultadoBuscaSite(false);
            this.buscasRealizadas = [];
            this.keyUpSearch = false;
          }
        }
      }
      if(categoriaMobile.classList.contains('show')) {
        categoriaMobile.classList.remove('show');
        document.querySelectorAll('.ctm-sub-box').forEach(e => {
          if(e.classList.contains('show')){
            e.classList.remove('show');
          }
        });
        this.removeOverlay();
        document.body.style.overflow = 'auto';
      }
    }     
  }

  public openSeachMobile(){
    if(document.querySelector(".nav-search").classList.contains("open-nav-search")){
      document.querySelector(".nav-search").classList.remove("open-nav-search");
    }else{
      document.querySelector(".nav-search").classList.add("open-nav-search");
      document.getElementById("search-topo").focus();
    }
    
  }
  public overlayOver(){
    
    let carrinhoEl = document.querySelector('.crt-carrinho');
    let userEl = document.querySelector('.box-user');
    let categoriaEl = document.querySelector('.box-categorias');
    let navEl = document.querySelector('.nav-search');
    let categoriaMobile = document.querySelector('.mobile-categoria');

    if(document.querySelector(".nav-search").classList.contains("open-nav-search")){
      document.querySelector(".nav-search").classList.remove("open-nav-search");
    }

    if(this.checkOverlayStatus()){
      this.overlayTime = setTimeout(()=>{
          if (!userEl.classList.contains('click')) {
            if(userEl.classList.contains('hover')){
              userEl.classList.remove('show');
              userEl.classList.remove('hover');
              userEl.classList.remove('click');
              this.removeOverlay();
              document.querySelector('#user-act').classList.remove('z-overlay');
            }
        } else {
          userEl.classList.remove('hover');
        }
        if(!carrinhoEl.classList.contains('click')) {
          if(carrinhoEl.classList.contains('hover')){
            carrinhoEl.classList.remove('show');
            carrinhoEl.classList.remove('hover');
            carrinhoEl.classList.remove('click');
            this.removeOverlay();
            document.querySelector('#crt-carrinho').classList.remove('z-overlay');
          }
        }
        document.querySelectorAll('.nav-categoria').forEach(e=>{
          if(e.classList.contains('show')) {
            e.classList.remove('show');
            this.removeOverlay();
            document.querySelectorAll('.nav-item').forEach(el=>{
              el.classList.remove('z-overlay');
            })
          }
        })
        if (!categoriaEl.classList.contains('click')) {
          if(categoriaEl.classList.contains('hover')){
            this.hideCats();
          } else {
            categoriaEl.classList.remove('hover');
          }
        }
        if(document.querySelector('.daily-box').classList.contains('show')){
          document.querySelector('.daily-button').classList.remove('z-overlay');
          document.querySelector('.daily-box').classList.remove('show');
          this.removeOverlay();
        }
    }, 500)
    }
  }
  public overlayOut(){
    clearTimeout(this.overlayTime);
  }

  
  public clickUser(){
    let userBox = document.querySelector('.box-user');

    if(this.cartStatus()){
      this.closeCart();
    }

    if(document.querySelector('.box-user').classList.contains('show')){
      document.querySelector('#user-act').classList.remove('z-overlay');
      userBox.classList.remove('show');
      this.removeOverlay();
      userBox.classList.remove('click');
      userBox.classList.remove('hover');
    } else {
      document.querySelector('#user-act').classList.add('z-overlay');
      userBox.classList.add('show');
      this.showOverlay();
      userBox.classList.add('click');
    }
  }
  public overUser(){
    this.contandoUsuario = setTimeout(() => {
      if(this.cartStatus()){
        this.closeCart();
      }
      let userBox = document.querySelector('.box-user');
      document.querySelector('#user-act').classList.add('z-overlay');
      userBox.classList.add('show');
      this.showOverlay();
      userBox.classList.add('hover');
    }, 500);
  }
  public overUserOut(){
    clearTimeout(this.contandoUsuario);
  }
  public focarSearchBox(e){
    e.parentElement.classList.add('z-overlay');
    this.showOverlay();
    document.querySelector('.box-search').classList.add('show');
  }

  public openCart(){
    let el = document.querySelector('.crt-carrinho');

    if(this.userStatus){
      this.closeUser();
    }

    if(el.classList.contains('click')){
      el.classList.remove('show');
      el.classList.remove('click');
      el.classList.remove('hover');
      document.querySelector('#crt-carrinho').classList.remove('z-overlay');
      this.removeOverlay();
    } else if(el.classList.contains('show')){
      el.classList.remove('show');
      el.classList.remove('click');
      el.classList.remove('hover');
      document.querySelector('#crt-carrinho').classList.remove('z-overlay');
      this.removeOverlay();
    } 
    else {
      el.classList.add('show');
      el.classList.add('click');
      document.querySelector('#crt-carrinho').classList.add('z-overlay');
      this.getProdutosCarrinho();
      this.showOverlay();
    }
  }

  public cartStatus(){
    let el = document.querySelector('.crt-carrinho');
    return el.classList.contains('show');
  }

  public closeCart(){
    let el = document.querySelector('.crt-carrinho');
    el.classList.remove('show');
    el.classList.remove('click');
    el.classList.remove('hover');
    document.querySelector('#crt-carrinho').classList.remove('z-overlay');
    this.removeOverlay();
  }
  
  public showCartHover(){
    let el = document.querySelector('.crt-carrinho');
    this.cartHover = setTimeout(() => {
      if(this.userStatus){
        this.closeUser();
      }
      el.classList.add('show');
      el.classList.add('hover');
      document.querySelector('#crt-carrinho').classList.add('z-overlay');
      this.carrinhoCompra();
      this.showOverlay();
    }, 500);
  }

  public cartOut(){
    clearTimeout(this.cartHover);
  }

  public closeCarrinho(){
    let el = document.querySelector('.crt-carrinho');
    el.classList.remove('show');
    el.classList.remove('click');
    el.classList.remove('hover');
    document.querySelector('#crt-carrinho').classList.remove('z-overlay');
    this.removeOverlay();
  }
  public checkFixedTop(){
    if(document.querySelector('.navbar').classList.contains('fixed-top')){
      return true;
    } else {
      return false;
    }
  }

  public fixedNav(){
    document.addEventListener('scroll', ()=>{
      if(document.querySelector('.navbar')){
        if(scrollY > 30){

          if(this.checkHidenMenu()){
            if(document.querySelector('.box-categorias').classList.contains('show')){
              this.hideCats();
            }
          }
          document.querySelector('.navbar').classList.add('fixed-top');
          if(!this.stateMenu){
            document.querySelector('.nav-links').classList.add('hide');
          }
          
        } else {
          document.querySelector('.navbar').classList.remove('fixed-top');
          document.querySelector('.nav-links').classList.remove('hide');
        }
      }
    })
  }

  public checkHidenMenu(){
    if(document.querySelector('.nav-links').classList.contains('hide')){
      return true;
    } else {
      return false;
    }
  }
  public showMenu(e){
    let el = document.querySelector('.nav-links');
    if(el.classList.contains('hide')){
      el.classList.remove('hide');
      e.classList.add('active');
      this.stateMenu = true;
    } else {
      if(document.querySelector('.box-categorias').classList.contains('show')){
        this.hideCats();
      }
      el.classList.add('hide');
      e.classList.remove('active');
      this.stateMenu = false;
    }
  }

  public checkMenuShow(){
    let el = document.querySelector('.nav-links');
    if(el.classList.contains('hide')){
      return false;
    } else {
      return true;
    }
  }

  public showCategorias() {
    this.timeoutCategoria = setTimeout(function(){
      $('.box-categorias').addClass('show');
      $('.overlay').addClass('active');
      $(this).addClass('z-overlay');
      $(this).addClass('active');
      $('.box-categorias').addClass('show');
      $('.btn-categoria').addClass('z-overlay');
      $('.btn-categoria').addClass('active');
      $('.navbar .hamburger').addClass('is-active');
      $('.box-categorias').addClass('hover');
    }, 500);
  }

  public userStatus(){
    let userBox = document.querySelector('.box-user');
    return userBox.classList.contains('show');
  }

  public closeUser(){
    let userBox = document.querySelector('.box-user');
    document.querySelector('#user-act').classList.remove('z-overlay');
    userBox.classList.remove('show');
    this.removeOverlay();
    userBox.classList.remove('click');
    userBox.classList.remove('hover');
  }

  public rulesResponsive(){
    window.addEventListener('resize', ()=>{
      if(screen.width < 991){
        if(document.querySelector('.nav-search')){
          if(this.checkOverlayStatus()){
            document.querySelector('.nav-search').classList.add('z-overlay');
          }
        }
      }
    })
  }

  public showCats(e){
    let el = document.querySelector('.box-categorias');
    if(!el.classList.contains('click')){
      el.classList.add('show');
      this.showOverlay();
      e.classList.add('z-overlay');
      e.classList.add('active');
      document.querySelector('.navbar .hamburger').classList.add('is-active');
      el.classList.add('click');
    } else {
      el.classList.remove('show');
      this.removeOverlay();
      e.classList.remove('z-overlay');
      e.classList.remove('active');
      document.querySelector('.navbar .hamburger').classList.remove('is-active');
      el.classList.remove('click');
      el.classList.remove('hover');
    }
  }

  public hideCats(){
    let el = document.querySelector('.box-categorias');
    let e = document.querySelector('.btn-categoria');
    el.classList.remove('show');
    this.removeOverlay();
    e.classList.remove('z-overlay');
    e.classList.remove('active');
    document.querySelector('.navbar .hamburger').classList.remove('is-active');
    el.classList.remove('click');
    el.classList.remove('hover');
    this.ctgClearSearch('#ctgSearch');
  }

  public overCats(e){
    this.timeoutCategoria = setTimeout(() => {
      let el = document.querySelector('.box-categorias');
      el.classList.add('show');
      this.showOverlay();
      e.classList.add('z-overlay');
      e.classList.add('active');
      document.querySelector('.navbar .hamburger').classList.add('is-active');
      el.classList.add('hover');
    }, 500);
  }

  public outCats(){
    clearTimeout(this.timeoutCategoria);
  }

  public showDaily(e){
    this.timeDailyOffer = setTimeout(() => {
      e.classList.add('z-overlay');
      e.parentElement.querySelector('.daily-box').classList.add('show');
      this.showOverlay();
    }, 200);
  }

  public hideDaily(){
    clearTimeout(this.timeDailyOffer);
  }

  public openCatMobile(){
    let el = document.querySelector('.mobile-categoria');
    el.classList.add('show');
    el.classList.add('click');
    document.body.style.overflow = 'hidden';
    this.showOverlay();
  }

  public removeOverflowClick(){
    this.closeCatMobileAll();
    document.body.style.overflow = 'auto';
  }

 

  public closeCatMobileAll(){
    this.closeCatMobile();
    document.querySelectorAll('.ctm-sub-box').forEach(e => {
      if(e.classList.contains('show')){
        e.classList.remove('show');
      }
    });
  }

  public closeCatMobile(){
    let el = document.querySelector('.mobile-categoria');
    el.classList.remove('show');
    el.classList.remove('click');
    document.body.style.overflow = 'auto';
    this.removeOverlay();
  }

  public showToTop(){
    let el = document.querySelector('.back-to-top');
    document.addEventListener('scroll', ()=>{
      if(scrollY > 80){
        el.classList.add('show');
      } else {
        el.classList.remove('show');
      }
    })
  }

  public goToTop(){
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  public searchCat(elVal) {
    // Mostra as subs ao inserir value no input
    document.querySelectorAll('.sub-links').forEach(e=>{
      e.setAttribute('style','display: block;');
    });

    // Remove o sub links que não tiverem nenhum link
    let sub = document.querySelectorAll('.sub-links');
    for (let i = 0; i < sub.length; i++) {
      if(sub[i].children.length == 0){
        sub[i].remove();
      }
    }

    document.querySelectorAll('.category-sub').forEach(e=>{
      e.classList.remove('show');
    });

    var ul, li, a, i, txtValue, display, element;
    this.filter = this.filterText(elVal);
    ul = document.querySelector('.categoria-list');
    li = document.querySelectorAll(".categoria-list > li .ctg-link");

    /* Filtra de acordo com que for digitado no input
     adicionando "display: block" ou "display: none"*/
    if(this.filter != '' && this.filter != null){
      this.empytResult = false;
      for (i = 0; i < li.length; i++) {
        // element[i].parentElement.querySelectorAll(".ctg-link").forEach(el => {
        //   a = el;
        // });
        txtValue = li[i].textContent || li[i].innerText;
        txtValue = this.filterText(txtValue);
        if (txtValue.indexOf(this.filter) > -1) {
          li[i].style.display = "block";
        } else {
          li[i].style.display = "none";
        }
    }
    } else {
      document.querySelectorAll('.sub-links').forEach(e=>{
        e.setAttribute('style','display: none;');
      });
      document.querySelectorAll('.categoria-list > li .ctg-link').forEach(e=>{
        e.removeAttribute('style');
      });
      document.querySelectorAll('.category-sub').forEach(e=>{
        e.classList.remove('show');
      });
      this.empytResult = false;
    }

    /* Verifica o total de li com display: none; */
    let total = document.querySelectorAll('.categoria-list > li .ctg-link').length;
    display = 0;
    document.querySelectorAll('.categoria-list > li .ctg-link').forEach(el=>{
      if(el.getAttribute('style') == 'display: none;'){
        display = display + 1;
      }
    });

      /* Verifica o total de items com display:none, 
      se for o mesmo que o total de li na categoria 
      seta o valor true para a empytResult */
    if(display >= total) {
      this.empytResult = true;
      ul.setAttribute('search','false');
    }
    
}

public filterText(value:string){
  let filter = value.toLowerCase();
  return filter.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '');
}

public ctgClearSearch(el){
  this.empytResult = false;
  this.filter = '';
  document.querySelectorAll('.category-sub').forEach(e=>{
    e.classList.remove('show');
  });
  document.querySelectorAll('.sub-links').forEach(e=>{
    e.setAttribute('style','display: none;');
  });
  document.querySelectorAll('.categoria-list > li .ctg-link').forEach(e=>{
    e.removeAttribute('style');
  });
  document.querySelector(el).value = '';
}

}
