import { Component, OnInit,Injectable, Input, OnChanges} from '@angular/core';
import { BuscaService } from '../../../_services/busca.service';
import { Router } from '@angular/router';
import { FavoriteService } from '../../../_services/favorite.service';
import { UserService } from '../../../_services/user.service';
import { HeaderService } from '../../../_services/header.service';
import { CarrinhoCompraService } from '../../../_services/carrinho-compra.service';
import { DadosService } from '../../../_services/dados.service';
import { ProdutoService } from '../../../_services/produto.service';
import { CookieService } from 'ngx-cookie-service';
import {AuthService } from 'angularx-social-login';
import { configEnvi } from 'src/environments/environment';
import { VendedorService } from 'src/app/_services/vendedor.service';
declare let $: any;

@Component({
  selector: 'app-header-vendedor',
  templateUrl: './header-vendedor.component.html',
  styleUrls: ['./header-vendedor.component.css']
})
export class HeaderVendedorComponent implements OnInit {


  // @Input() titulo;
  // @Input() descricao;
  // @Input() logo;
  // @Input() corPrimaria;
  // @Input() corSecundaria;
  // @Input() hotsite;
  
  header:any;
  public customer;
  public vendedorDados:any;
  public overlay;
  public stateMenu:boolean;
  public time;
  public overlayTime;
  public timeDailyOffer;
  public cartHover;
  public contandoUsuario;
  public loadCarrinho:boolean;
  public lastCat;
  public timeoutCategoria;
  // public menuCategoria;
  public logo:any;
  public qtdFavorito:number = 0;
  public qtdProdutos:any;
  public resultadoBuscaSite;
  public textoPesquisa;
  public buscasRealizadas;
  public produtos:any = [];
  public totalCompra:number = 0;
  public paginaCarregada:boolean = false;
  public favoritos_count: string;
  public keyUpSearch;
  constructor(
    private sBusca:BuscaService,
    private router:Router,
    private sUser:UserService,
    private sHeader:HeaderService,
    private sCarrinho:CarrinhoCompraService,
    private sProduto:ProdutoService,
    private cookieService: CookieService,
    private sVendedor:VendedorService,
    public sConfig:configEnvi
  ) {}

  public clearSearch(e){
    document.querySelector(e).value = '';
    this.keyUpSearch = false;
  }
  // public login(socialPlatform : string) {
  //   let social = this.sUser.loginRedeSocial(socialPlatform);
  //   let json:any;
  //   this.socialAuthService.signIn(social).then(
  //     (userData) => {
  //       json = this.sUser.getJsonUsuario(userData.id,userData.name,userData.name,'I','',userData.email,userData.photoUrl,socialPlatform);
  //       this.sUser.setCustomer(json);
  //       this.customer = this.sUser.getCustomer();
  //     }
  //   );
  // }
  // private setHeader(header:any){
  //   this.header = header;
  // }
  // private setResultadoBuscaSite(resultadoBuscaSite:any){
  //   this.resultadoBuscaSite = resultadoBuscaSite;
  // }
  // private setTextoPesquisa(textoPesquisa:any){
  //   this.textoPesquisa = textoPesquisa;
  // }
  // private setBuscasRealizadas(buscasRealizadas:any){
  //   this.buscasRealizadas = buscasRealizadas;
  // }
  private setProdutos(produtos:any){
    this.produtos = produtos;
  }
  private setTotalCompra(totalCompra:any){
    this.totalCompra += totalCompra;
  }
  private resetTotalCompra(){
    this.totalCompra = 0;
  }
  // getHeader(){
  //   return this.header;
  // }
  // getResultadoBuscaSite(){
  //   return this.resultadoBuscaSite;
  // }
  // getTextoPesquisa(){
  //   return this.textoPesquisa;
  // }
  public carrinhoCompra(){
    this.getProdutosCarrinho();
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

  BotaoPesquisaSite(v:any){
    if(v != ""){
      this.router.navigate(['/vendedor','busca', v]);
      this.ocultaBoxSearch();
      this.setBuscaRealizadas(v);
    }
  }

  keyPesquisaSite(v:any){
    this.keyUpSearch = true;
    if(v.length > 1){
      let resultados;
      this.sBusca.autocompleteBuscaVendedor(v).subscribe((r)=>{
        resultados = r;
      },
      error =>{
        // ERRO AUTOCOMPLETE
      },
      () => {
        this.resultadoBuscaSite = resultados;
      });
    }else{
      this.resultadoBuscaSite = false;
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
    this.sVendedor.logout();
    setTimeout(()=>{
      this.router.navigate(["/vendedor"]);
    }, 1000); 
  }


  public ocultaBoxSearch(){
    $('.overlay').removeClass('active');
      $('.box-search').hide();
      if(this.textoPesquisa){
        if(this.textoPesquisa.length <= 2 && this.resultadoBuscaSite){
          this.resultadoBuscaSite = false;
        }
      }
  }

  public setPrecoProduto(produto,arrayPreco:any,p:number){
    produto.total = parseFloat(arrayPreco[0].total);
    produto.preco = parseFloat(arrayPreco[0].preco);
    
    this.setTotalCompra(produto.total);
  }

  getProdutosCarrinho(){
    this.setProdutos(this.sCarrinho.getProdutosCarrinho());
    this.qtdProdutos      = this.sCarrinho.getQuantidadeProdutosCarrinho();
    let produtos = this.getProdutos();
    this.loadCarrinho = true;
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
  buscaProduto(txt:string){
    if(txt.length > 0){
      this.router.navigate(['/vendedor','busca', txt]);
      this.setBuscaRealizadas(txt);
      $('.overlay').removeClass('active');
      $('.box-search').hide();
    }
  }

  async removeItemBusca(i:number){
    let buscas = this.getBuscaRealizadas();
    let y = 0;
    localStorage.removeItem("pesquisasRealizadas")

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
  ngOnChanges() {
    
  }

  ngOnInit() {
    this.overlay = document.querySelector('.overlay');
    this.rulesResponsive();
    this.favoritos_count = this.cookieService.get("favoritos_count");
    
    this.customer = this.sUser.getCustomer();
    this.vendedorDados = this.sVendedor.getVendedor();
    this.buscasRealizadas = this.getBuscaRealizadas();
    this.getProdutosCarrinho();

    $('#crt-search').click(function() {
      $('.nav-search').toggle("fast");
    })
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
public showOverlay(){
this.overlay.classList.add('active');
}
public removeOverlay(){
this.overlay.classList.remove('active');
}
public overlayClick(){
let carrinhoEl = document.querySelector('.crt-carrinho');
let userEl = document.querySelector('.box-user');
let categoriaEl = document.querySelector('.box-categorias');
let navEl = document.querySelector('.nav-search');
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
  // if (categoriaEl.classList.contains('show')) {
  //     let btnCategoria = document.querySelector('.btn-categoria');
  //     let boxCat = document.querySelector('.box-categorias');
  //     categoriaEl.classList.remove('show');
  //     this.removeOverlay();
  //     btnCategoria.classList.remove('z-overlay');
  //     btnCategoria.classList.remove('active');
  //     document.querySelector('.navbar .hamburger').classList.remove('is-active');
  //     boxCat.classList.remove('click');
  //     boxCat.classList.remove('hover');
  //   }
    // Remove overlay ao click fora do seach (overlay)
  if(navEl.classList.contains('z-overlay')) {
    let searchEl = document.querySelector('.box-search');
    this.removeOverlay();
    searchEl.classList.remove('show');
    navEl.classList.remove('z-overlay');
    if(this.textoPesquisa){
      if(this.textoPesquisa.length  <= 2 && this.resultadoBuscaSite){
        this.resultadoBuscaSite = false;
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

public overlayOver(){

let carrinhoEl = document.querySelector('.crt-carrinho');
let userEl = document.querySelector('.box-user');
let categoriaEl = document.querySelector('.box-categorias');
let navEl = document.querySelector('.nav-search');
let categoriaMobile = document.querySelector('.mobile-categoria');
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
    // if (!categoriaEl.classList.contains('click')) {
    //   if(categoriaEl.classList.contains('hover')){
    //     let btn = document.querySelector('.btn-categoria');
    //     categoriaEl.classList.remove('show');
    //     this.removeOverlay();
    //     btn.classList.remove('z-overlay');
    //     btn.classList.remove('active');
    //     document.querySelector('.navbar .hamburger').classList.remove('is-active');
    //     categoriaEl.classList.remove('click');
    //     categoriaEl.classList.remove('hover');
    //   } else {
    //     categoriaEl.classList.remove('hover');
    //   }
    // }
    // if(document.querySelector('.daily-box').classList.contains('show')){
    //   document.querySelector('.daily-button').classList.remove('z-overlay');
    //   document.querySelector('.daily-box').classList.remove('show');
    //   this.removeOverlay();
    // }
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
  // this.carrinhoCompra();
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

}
