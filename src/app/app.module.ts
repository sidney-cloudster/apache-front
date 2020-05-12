import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
// import {WebStorageModule, LocalStorageService} from "angular-localstorage";
import { CookieService } from 'ngx-cookie-service';
import { RouterModule,Routes } from '@angular/router';


import { McCardFlipModule } from '../../projects/mc-card-flip/src/lib/mc-card-flip.module'


import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRippleModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { GestureConfig } from '@angular/material';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { NgProgressRouterModule } from 'ngx-progressbar/router';

import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the modules

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
import { EsqueciMinhaSenhaComponent } from './duvidas/esqueci-minha-senha/esqueci-minha-senha.component';
import { ReimpressaoBoletoComponent } from './duvidas/reimpressao-boleto/reimpressao-boleto.component';
import { ValePresenteComponent } from './duvidas/vale-presente/vale-presente.component';
import { ErrorComponent } from './error/error.component';
import { Erro404Component } from './error/erro404/erro404.component';
import { ProdutoNaoEncontradoComponent } from './error/produto-nao-encontrado/produto-nao-encontrado.component';
import { NaoEncontradoComponent } from './error/nao-encontrado/nao-encontrado.component';
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
import { HeaderVendedorComponent } from './layout/vendedor/header-vendedor/header-vendedor.component';
import { ContentVendedorComponent } from './layout/vendedor/content-vendedor/content-vendedor.component';
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
import { EmailnewsComponent } from './emailnews/emailnews.component';
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
import { OrderPrintComponent } from './compras/conclusaoboleto/orderprint/orderprint.component';
import { OrderPrintPedidoComponent } from './user/meus-pedidos/orderprint/orderprint.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ngfModule} from "angular-file";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DatePipe, CommonModule, registerLocaleData } from '@angular/common';
import { HotsiteComponent } from './hotsite/hotsite.component';
import { ProdutoCasamentoComponent } from './casamento/lista-convidados/produto-casamento/produto-casamento.component';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { XmlAnuncianteComponent } from './xml-anunciante/xml-anunciante.component';
import { HomeComponent } from './vendedor/home/home.component';
import { ProdutosComponent } from './vendedor/produtos/produtos.component';
import { ProdutoVendedorComponent } from './vendedor/produto-vendedor/produto-vendedor.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BuscaVendedorComponent } from './vendedor/busca-vendedor/busca-vendedor.component';
import { VendedorComponent } from './vendedor/vendedor.component';
import { AgmCoreModule } from '@agm/core';
import { configEnvi } from '../environments/environment';
import { MenuUserComponent } from './layout/menu-user/menu-user.component';
import { CasamentoService } from './_services/_casamento/casamento.service';
import { BannerInfoComponent } from './banners/banner-info/banner-info.component';
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
import ptBr from '@angular/common/locales/pt';
import { ConfiguracaoService } from './_services/configuracao.service';
import { config } from 'rxjs';
registerLocaleData(ptBr)
@NgModule({
  declarations: [
    AppComponent,
    BannerMaisVendidosComponent,
    CasamentoComponent,
    IndexComponent,
    ComprasComponent,
    AdicionarProdutosComponent,
    CarrinhoComponent,
    ConfiguracoesComponent,
    ConfirmacaoComponent,
    CriarListaComponent,
    CriarListaConcluidoComponent,
    CriarListaEnderecoComponent,
    EmailPersonalizadoComponent,
    ListaConvidadosComponent,
    MeuCarrinhoComponent,
    MinhaListaComponent,
    PagamentoComponent,
    PainelComponent,
    CategoriasComponent,
    ConclusaoboletoComponent,
    ConclusaocartaoComponent,
    EntregaComponent,
    DuvidasComponent,
    AcompanharPedidoComponent,
    ComoComprarComponent,
    EsqueciMinhaSenhaComponent,
    ReimpressaoBoletoComponent,
    ValePresenteComponent,
    ErrorComponent,
    Erro404Component,
    InformacoesComponent,
    DuvidasFrequentesComponent,
    FormapagamentoComponent,
    PoliticaPrivacidadeComponent,
    PrazoEntregaComponent,
    TrocaDevolucaoComponent,
    InstitucionalComponent,
    EmpresaComponent,
    GlossarioComponent,
    MaisVendidosComponent,
    MapaSiteComponent,
    SegurancaComponent,
    LojistaComponent,
    ProdutoComponent,
    ListaProdutoComponent,
    ProdutoBoxComponent,
    UserComponent,
    AtendimentosComponent,
    CadastroComponent,
    ChatComponent,
    EnderecosComponent,
    FavoritosComponent,
    LoginComponent,
    MeusPedidosComponent,
    MinhaContaComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    ContentNoHeaderComponent,
    CheckoutPagamentoComponent,
    CarrinhoCompraComponent,
    BuscaCasamentoComponent,
    PoliticaEntregaComponent,
    ConfirmacaoCompraComponent,
    BannerHomeComponent,
    BannerTopoComponent,
    BannerHeaderComponent,
    BannerFaixaPrincipalCentroComponent,
    BannerFaixaPrincipalBaixoComponent,
    BannerFaixaPrincipalComponent,
    BannerFaixaRodapeComponent,
    BannerInfoComponent,
    EmailnewsComponent,
    BuscaComponent,
    CategoriaprodutoComponent,
    CarouselProdutosComponent,
    GarantiaComponent,    
    LayoutCasamentoComponent,
    MenuLateralComponent,
    LayoutCasamentoNoMenuComponent,
    LojaLoginComponent,
    HotsiteComponent,
    LayoutCasamentoConvidadoComponent,
    MenuLateralConvidadoComponent,
    IdentificacaoComponent,
    ProdutoNaoEncontradoComponent,
    NaoEncontradoComponent,
    ProdutoCasamentoComponent,
    XmlAnuncianteComponent,
    HomeComponent,
    HeaderVendedorComponent,
    ContentVendedorComponent,
    ProdutosComponent,
    ProdutoVendedorComponent,
    BuscaVendedorComponent,    
    VendedorComponent,
    OrderPrintComponent,
    OrderPrintPedidoComponent,
    MenuUserComponent
  ],
  imports: [
    NgxSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgProgressModule,
    McCardFlipModule,
    MatSnackBarModule,
    NgProgressRouterModule,
    // LoadingBarHttpClientModule,
    // LoadingBarRouterModule,
    // LoadingBarModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatRippleModule,
    BrowserModule.withServerTransition({ appId: 'site' }),
    AppRoutingModule,
    OwlModule,
    SocialLoginModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    NgProgressHttpModule,
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
    CommonModule,
    TransferHttpCacheModule,
    NgtUniversalModule,
    CarouselModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCYXMq93t6zPjYe1rZXg_L7kcpkrYkRCPw'
    })
  ],
  providers: [
    CarouselProdutosComponent,
    FavoritosComponent,
    CadastroComponent,
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
    DadosService,
    UserComponent,
    ValidationsService,
    FavoriteService,
    LojistaService,
    HeaderComponent,
    CookieService,
    DatePipe,
    HeaderVendedorComponent,
    ConfiguracaoService,
    configEnvi,
    MenuUserComponent,
    CasamentoService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    {provide: LOCALE_ID, useValue: 'pt'}
  ],
  bootstrap: [AppComponent]
  ,
  exports:[FormsModule]
  }
)
export class AppModule { }
