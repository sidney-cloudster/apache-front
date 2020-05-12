import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule,LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule,Routes } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CasamentoComponent } from './casamento/casamento.component';
import { IndexComponent } from './index/index.component';
import { ComprasComponent } from './compras/compras.component';
import { AdicionarProdutosComponent } from './casamento/adicionar-produtos/adicionar-produtos.component';
import { CarrinhoComponent } from './casamento/carrinho/carrinho.component';
import { ConfiguracoesComponent } from './casamento/configuracoes/configuracoes.component';
import { ConfirmacaoComponent } from './casamento/confirmacao/confirmacao.component';
import { CriarListaComponent } from './casamento/criar-lista/criar-lista.component';
import { CriarListaConcluidoComponent } from './casamento/criar-lista-concluido/criar-lista-concluido.component';
import { CriarListaEnderecoComponent } from './casamento/criar-lista-endereco/criar-lista-endereco.component';
import { EmailPersonalizadoComponent } from './casamento/email-personalizado/email-personalizado.component';
import { ListaConvidadosComponent } from './casamento/lista-convidados/lista-convidados.component';
import { MeuCarrinhoComponent } from './casamento/meu-carrinho/meu-carrinho.component';
import { MinhaListaComponent } from './casamento/minha-lista/minha-lista.component';
import { PagamentoComponent } from './casamento/pagamento/pagamento.component';
import { PainelComponent } from './casamento/painel/painel.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ConclusaoboletoComponent } from './compras/conclusaoboleto/conclusaoboleto.component';
import { ConclusaocartaoComponent } from './compras/conclusaocartao/conclusaocartao.component';
import { EntregaComponent } from './compras/entrega/entrega.component';
import { DuvidasComponent } from './duvidas/duvidas.component';
import { AcompanharPedidoComponent } from './duvidas/acompanhar-pedido/acompanhar-pedido.component';
import { ComoComprarComponent } from './duvidas/como-comprar/como-comprar.component';
import { InformacoesComponent } from './informacoes/informacoes.component';
import { DuvidasFrequentesComponent } from './informacoes/duvidas-frequentes/duvidas-frequentes.component';
import { FormapagamentoComponent } from './informacoes/formapagamento/formapagamento.component';
import { PoliticaPrivacidadeComponent } from './informacoes/politica-privacidade/politica-privacidade.component';
import { PrazoEntregaComponent } from './informacoes/prazo-entrega/prazo-entrega.component';
import { TrocaDevolucaoComponent } from './informacoes/troca-devolucao/troca-devolucao.component';
import { InstitucionalComponent } from './institucional/institucional.component';
import { EmpresaComponent } from './institucional/empresa/empresa.component';
import { GlossarioComponent } from './institucional/glossario/glossario.component';
import { MaisVendidosComponent } from './institucional/mais-vendidos/mais-vendidos.component';
import { MapaSiteComponent } from './institucional/mapa-site/mapa-site.component';
import { SegurancaComponent } from './institucional/seguranca/seguranca.component';
import { ProdutoComponent } from './produto/produto.component';
import { ListaProdutoComponent } from './produto/lista-produto/lista-produto.component';
import { ProdutoBoxComponent } from './produto/produto-box/produto-box.component';
import { UserComponent } from './user/user.component';
import { AtendimentosComponent } from './user/atendimentos/atendimentos.component';
import { CadastroComponent } from './user/cadastro/cadastro.component';
import { ChatComponent } from './user/chat/chat.component';
import { EnderecosComponent } from './user/enderecos/enderecos.component';
import { FavoritosComponent } from './user/favoritos/favoritos.component';
import { LoginComponent } from './user/login/login.component';
import { MeusPedidosComponent } from './user/meus-pedidos/meus-pedidos.component';
import { MinhaContaComponent } from './user/minha-conta/minha-conta.component';
import { OwlModule } from 'ngx-owl-carousel';
import * as $ from 'jquery';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ContentComponent } from './layout/content/content.component';
import {ContentNoHeaderComponent } from './layout/content-no-header/content-no-header.component';
import { CheckoutPagamentoComponent } from './compras/checkout-pagamento/checkout-pagamento.component';
import { CarrinhoCompraComponent } from './compras/carrinho-compra/carrinho-compra.component';
import { BuscaCasamentoComponent } from './casamento/busca-casamento/busca-casamento.component';
import { PoliticaEntregaComponent } from './informacoes/politica-entrega/politica-entrega.component';
import { ConfirmacaoCompraComponent } from './compras/confirmacao-compra/confirmacao-compra.component';
import {SocialLoginModule, AuthServiceConfig, GoogleLoginProvider,FacebookLoginProvider } from 'angularx-social-login';
import {BannerHomeComponent} from './banners/banner-home/banner-home.component';
import {BannerTopoComponent} from './banners/banner-topo/banner-topo.component';
import {BannerHeaderComponent} from './banners/banner-header/banner-header.component';
import {BannerFaixaPrincipalCentroComponent} from './banners/banner-faixa-principal-centro/banner-faixa-principal-centro.component';
import {BannerFaixaPrincipalBaixoComponent} from './banners/banner-faixa-principal-baixo/banner-faixa-principal-baixo.component';
import {BannerFaixaPrincipalComponent} from './banners/banner-faixa-principal/banner-faixa-principal.component';
import { BannerFaixaRodapeComponent } from './banners/banner-faixa-rodape/banner-faixa-rodape.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { RequisicoesService } from "./_services/requisicoes.service";
import { ValidationsService } from "./_services/validations.service";
import { FavoriteService  } from "./_services/favorite.service";
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DadosService } from './_services/dados.service';
import { LojistaService } from './_services/lojista.service';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BuscaComponent } from './busca/busca.component';
import { CategoriaprodutoComponent } from './categorias/categoriaproduto/categoriaproduto.component';
import { CarouselProdutosComponent } from './layout/carousel-produtos/carousel-produtos.component';
import { GarantiaComponent } from './compras/garantia/garantia.component';
import { LayoutCasamentoComponent } from './casamento/layout-casamento/layout-casamento.component';
import { MenuLateralComponent } from './casamento/layout-casamento/menu-lateral/menu-lateral.component';
import { MenuLateralConvidadoComponent } from './casamento/layout-casamento-convidado/menu-lateral/menu-lateral.component';
import { LayoutCasamentoNoMenuComponent } from './casamento/layout-casamento-no-menu/layout-casamento-no-menu.component';
import { LayoutCasamentoConvidadoComponent } from './casamento/layout-casamento-convidado/layout-casamento.component';
import { LojaLoginComponent } from './vendedor/loja-login/loja-login.component';
import { LojistaComponent } from './lojista/lojista.component'
import { IdentificacaoComponent } from './compras/_identificacao/identificacao.component';
import { BannerMaisVendidosComponent } from './banners/banner-mais-vendidos/banner-mais-vendidos.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ngfModule, ngf } from "angular-file";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DatePipe } from '@angular/common';
import { HotsiteComponent } from './hotsite/hotsite.component';
import { McCardFlipComponent } from 'mc-card-flip';
import { ProdutoCasamentoComponent } from './casamento/lista-convidados/produto-casamento/produto-casamento.component';
import { AppModule } from './app.module';
import { CasamentoService } from './_services/_casamento/casamento.service';
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("2535681409826543")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("175571712354-atg10uaqn8rbliiv607fisrvantrs11q.apps.googleusercontent.com")
        },
      ]
  );

  return config;
}
export let options: Partial<IConfig> | (() => Partial<IConfig>);
@NgModule({
  imports: [
    NgxSpinnerModule,
    AppRoutingModule,
    OwlModule,
    SocialLoginModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule, // required animations module
    ToastrModule.forRoot(),// ToastrModule added
    NgxMaskModule.forRoot(), 
    NgxMaskModule.forChild(),
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    AppRoutingModule,
    OwlModule,
    ngfModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    AppModule,
    BrowserTransferStateModule,
    BrowserModule
  ],
  providers: [
    CarouselProdutosComponent,
    FavoritosComponent,
    CadastroComponent,
    DadosService,
    UserComponent,
    ValidationsService,
    FavoriteService,
    LojistaService,
    HeaderComponent,
    CasamentoService,
    CookieService,
    DatePipe,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },   
  ],
  bootstrap: [AppComponent]
  ,
  exports:[FormsModule]
  }
)
export class AppBrowserModule { }
