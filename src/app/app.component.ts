import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RequisicoesService } from './_services/requisicoes.service';
import { ConfiguracaoService } from './_services/configuracao.service';
import { MarketingService } from './_services/marketing.service';
import { configEnvi } from '../environments/environment';
import { VendedorService } from './_services/vendedor.service';
import { Title } from '@angular/platform-browser';
import 'hammerjs';
import { NgProgress, NgProgressRef } from 'ngx-progressbar';
import { AngularFaviconService } from 'angular-favicon';
import { HeaderService } from './_services/header.service';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './_services/user.service';
import { ProdutoService } from './_services/produto.service';
import { DadosService } from './_services/dados.service';
import { FavoriteService } from './_services/favorite.service';
// import { LoadingBarService } from '@ngx-loading-bar/core';


declare var gtag;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  
  private configuracao;
  public primaria;
  public secundaria;
  public price_color;
  public nav_color;
  public background;
  public logo;
  public googleAnalytics;
  public googleAds;
  public googleSnippetPagina;
  public googleSnippetClique;
  public googleFacebookPixel;
  public googleTagManager;
  public googleManagerNoscript;
  public googleLomadee;
  public googleLomadeeVenda;
  public urlAtual;
  progressRef: NgProgressRef;
  public customer;
  
  constructor(
    private ngProgress: NgProgress,
    public router: Router,
    public sRequisicao:RequisicoesService,
    private sConfiguracao:ConfiguracaoService,
    private sMarketingService: MarketingService,
    private config:configEnvi,
    private title: Title,
    private ngxFavicon: AngularFaviconService,
    private sHeader:HeaderService,
    private sCookieService: CookieService,
    private sUser:UserService,
    private sProduto: ProdutoService,
    private sDados: DadosService,
    private sFavorite: FavoriteService) {  

      this.sHeader.getMenuPrincipal().subscribe(r => {
        this.config.setMenuPrincipal(r);
      });
      this.sHeader.getMenuCategorias().subscribe(r =>{
        this.config.setMenuCategoria(r);
      })

      this.sConfiguracao.getInformacoes().subscribe(r=>{
        this.ngxFavicon.setFavicon(r.icon);
        this.title.setTitle(r.titulo);
        this.config.setLogo(r.logo);
        this.config.setHeader(r.titulo,r.descricao,r.hotsite);
        this.config.setFooter(r.cnpj,r.cep,r.telefone,r.email,r.endereco,r.estado,r.numero,r.cidade,r.url_site,r.url_imagens,r.email_atendimento,r.facebook,r.instagram,r.youtube,r.twitte);
        this.primaria    = r.primaria;
        this.secundaria  = r.secundaria;
        this.price_color = r.price_color;
        this.nav_color   = r.nav_color;
        this.background  = r.background;
        this.changeTheme(this.primaria, this.secundaria, this.background, this.nav_color, this.price_color);
        this.sConfiguracao.setShopID('3');

        this.googleAnalytics       = r.marketing[0].analitycs;
        this.googleAds             = r.marketing[0].adwords;
        this.googleSnippetPagina   = r.marketing[0].snippet;
        this.googleSnippetClique   = r.marketing[0].snippet;
        this.googleFacebookPixel   = r.marketing[0].facebook_pixels;
        this.googleTagManager      = r.marketing[0].tag_manager;
        this.googleManagerNoscript = r.marketing[0].tag_noscript;
        this.googleLomadee         = r.marketing[0].lomadee_cpa;
        this.googleLomadeeVenda    = r.marketing[0].lomadee_venda_con;

        this.urlAtual              = window.location.href;
        
        if((this.googleAnalytics !== "") && (this.googleAnalytics !== undefined)){
          this.sMarketingService.loadGoogle(this.googleAnalytics);
        }

        if((this.googleAds !== "") && (this.googleAds !== undefined)){
          this.sMarketingService.loadGoogle(this.googleAds);
        }

        if((this.googleSnippetPagina !== "") && (this.googleSnippetPagina !== undefined)){
          this.sMarketingService.snippetCarregamentoPagina(this.googleSnippetPagina);
        }

        if((this.googleSnippetClique !== "") && (this.googleSnippetClique !== undefined)){
          this.sMarketingService.snippetCliquePagina(this.googleSnippetClique, this.urlAtual);
        }

        if((this.googleFacebookPixel !== "") && (this.googleFacebookPixel !== undefined)){
          this.sMarketingService.googleFacebookPixel(this.googleFacebookPixel);
        }
        
        if((this.googleTagManager !== "") && (this.googleTagManager !== undefined)){
          this.sMarketingService.googleTagManager(this.googleTagManager);
        }
        
        if((this.googleManagerNoscript !== "") && (this.googleManagerNoscript !== undefined)){
          this.sMarketingService.googleManagerNoscript(this.googleManagerNoscript);
        }

        if((this.googleLomadee !== "") && (this.googleLomadee !== undefined)){
          this.sMarketingService.googleLomadee('home', this.googleLomadee);
        }
        
        // if((this.googleLomadeeVenda !== "") && (this.googleLomadeeVenda !== undefined)){
        //   this.sMarketingService.googleLomadeeVenda('home', this.googleLomadeeVenda);
        // }

        // if((this.lomadeePagina !== "") && (this.lomadeePagina !== undefined)){
        //   this.sMarketingService.lomadeePagina('home', this.lomadeePagina);
        // }
      })

      this.sFavorite.setFavoritos();
      this.sFavorite.contaFavoritos();
  }

  

  public verificaLogin(){
    let segundos = 10;
    setInterval(()=>{
      if(!this.sCookieService.get("USE-L")){
        if(this.sUser.currentUserValue){
          this.sUser.logout();
          this.router.navigate(['/']);
        }
      }
    },(segundos * 1000));
  }

  public verificaSession(){
    let segundos = 10;
      setInterval(()=>{
        if(!localStorage.getItem("session_cart")){
          this.sMarketingService.userOnline(null);
        }
      },(segundos * 1000));
  }

  public ngOnInit(){
    this.verificaLogin();
    this.verificaSession();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });

    this.sMarketingService.camposURL(location.search.slice(1));
    this.sMarketingService.userOnline(null);
    this.progressRef = this.ngProgress.ref();
  }  
  
  private changeTheme(corPrimaria: string, corSecundaria: string, backgroundColor: string, navbarColor: string, priceColor: string) {
    document.documentElement.style.setProperty('--cor-primaria', corPrimaria);
    document.documentElement.style.setProperty('--cor-secundaria', corSecundaria);
    document.documentElement.style.setProperty('--background-color', backgroundColor);
    document.documentElement.style.setProperty('--navbar', navbarColor);
    document.documentElement.style.setProperty('--verde-ecommmerce', priceColor);
  }

  

  
}