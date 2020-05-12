import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { MinhaContaComponent } from './user/minha-conta/minha-conta.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { ContentComponent } from './layout/content/content.component';
// import { InicioComponent } from './index/inicio/inicio.component';
import { LoginComponent } from './user/login/login.component';
import { CadastroComponent } from './user/cadastro/cadastro.component';
import { ContentNoHeaderComponent } from './layout/content-no-header/content-no-header.component';
import { CheckoutPagamentoComponent } from './compras/checkout-pagamento/checkout-pagamento.component';
import {CarrinhoCompraComponent } from './compras/carrinho-compra/carrinho-compra.component';
// import {IdentificacaoComponent } from './compras/identificacao/identificacao.component';
import { ConclusaoboletoComponent } from './compras/conclusaoboleto/conclusaoboleto.component';
import {ConclusaocartaoComponent } from './compras/conclusaocartao/conclusaocartao.component';
import { EntregaComponent } from './compras/entrega/entrega.component';
import { MeusPedidosComponent } from './user/meus-pedidos/meus-pedidos.component';
import { FavoritosComponent } from './user/favoritos/favoritos.component';
import { EnderecosComponent } from './user/enderecos/enderecos.component';
import { ChatComponent } from './user/chat/chat.component';
import { AtendimentosComponent } from './user/atendimentos/atendimentos.component';
import { ProdutoComponent } from './produto/produto.component';
import { ProdutoBoxComponent } from './produto/produto-box/produto-box.component';
import { ListaProdutoComponent } from './produto/lista-produto/lista-produto.component';
import { LojistaComponent } from './lojista/lojista.component';
import { EmpresaComponent } from './institucional/empresa/empresa.component';
import { GlossarioComponent } from './institucional/glossario/glossario.component';
import { MaisVendidosComponent } from './institucional/mais-vendidos/mais-vendidos.component';
import { MapaSiteComponent } from './institucional/mapa-site/mapa-site.component';
import { SegurancaComponent } from './institucional/seguranca/seguranca.component';
import { TrocaDevolucaoComponent } from './informacoes/troca-devolucao/troca-devolucao.component';
import { PrazoEntregaComponent } from './informacoes/prazo-entrega/prazo-entrega.component';
import { PoliticaPrivacidadeComponent } from './informacoes/politica-privacidade/politica-privacidade.component';
import { FormapagamentoComponent } from './informacoes/formapagamento/formapagamento.component';
import { PoliticaEntregaComponent } from './informacoes/politica-entrega/politica-entrega.component';
import { DuvidasFrequentesComponent } from './informacoes/duvidas-frequentes/duvidas-frequentes.component';
import { AcompanharPedidoComponent } from './duvidas/acompanhar-pedido/acompanhar-pedido.component';
import { ComoComprarComponent } from './duvidas/como-comprar/como-comprar.component';
import { EsqueciMinhaSenhaComponent } from './duvidas/esqueci-minha-senha/esqueci-minha-senha.component';
import { ReimpressaoBoletoComponent } from './duvidas/reimpressao-boleto/reimpressao-boleto.component';
import { ValePresenteComponent } from './duvidas/vale-presente/vale-presente.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { BannerHomeComponent } from './banners/banner-home/banner-home.component';
import { Erro404Component } from './error/erro404/erro404.component';
// CASAMENTO
import { CasamentoComponent } from './casamento/casamento.component';
import { AdicionarProdutosComponent } from './casamento/adicionar-produtos/adicionar-produtos.component';
import { BuscaCasamentoComponent } from './casamento/busca-casamento/busca-casamento.component';
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
import { LayoutCasamentoComponent } from './casamento/layout-casamento/layout-casamento.component';
import { LayoutCasamentoNoMenuComponent } from './casamento/layout-casamento-no-menu/layout-casamento-no-menu.component';
import { AuthGuard } from './guard/auth.guard';
import { AuthVendedorGuard } from './guard/auth-vendedor.guard';
import { BuscaComponent } from './busca/busca.component';
import { CategoriaprodutoComponent } from './categorias/categoriaproduto/categoriaproduto.component';
import { GarantiaComponent } from './compras/garantia/garantia.component';
import { LojaLoginComponent } from './vendedor/loja-login/loja-login.component';
import { IndexComponent } from './index/index.component';
import { InformacoesComponent } from './informacoes/informacoes.component';
import { HotsiteComponent } from './hotsite/hotsite.component';
import { DuvidasComponent } from './duvidas/duvidas.component';
import { LayoutCasamentoConvidadoComponent } from './casamento/layout-casamento-convidado/layout-casamento.component';
import { ProdutoCasamentoComponent  } from './casamento/lista-convidados/produto-casamento/produto-casamento.component';
import { XmlAnuncianteComponent } from './xml-anunciante/xml-anunciante.component';
import { HomeComponent } from './vendedor/home/home.component';
import { HeaderVendedorComponent } from './layout/vendedor/header-vendedor/header-vendedor.component';
import { ContentVendedorComponent } from './layout/vendedor/content-vendedor/content-vendedor.component';
import { ProdutosComponent } from './vendedor/produtos/produtos.component';
import { ProdutoVendedorComponent } from './vendedor/produto-vendedor/produto-vendedor.component';
import { BuscaVendedorComponent } from './vendedor/busca-vendedor/busca-vendedor.component';
import { OrderPrintComponent } from './compras/conclusaoboleto/orderprint/orderprint.component';
import { OrderPrintPedidoComponent } from './user/meus-pedidos/orderprint/orderprint.component';

const routes: Routes = [
  { 
    path: 'notfound', component: Erro404Component 
  },
  {
    path: 'casamento',
    component: LayoutCasamentoNoMenuComponent,
    children: [
      { path: '', component: CasamentoComponent },
    ]
  },
  {
    path: 'casamento',
    component: LayoutCasamentoComponent,
    
    canActivate: [AuthGuard],
    children: [
      {
        path:'painel',
        children:[
          { path: 'adicionar-produtos', component: AdicionarProdutosComponent },
          { path: 'configuracoes', component: ConfiguracoesComponent },
          { path: 'minha-lista', component: MinhaListaComponent },
          { path: 'email-personalizado', component: EmailPersonalizadoComponent },
          { path: 'pagamento', component: PagamentoComponent },
          { path: '',component: PainelComponent}
        ]
      },
      { path: 'confirmacao', component: ConfirmacaoComponent },
      { path: 'meu-carrinho', component: MeuCarrinhoComponent },
    ]
  },
  {
    path: 'casamento',
    component: LayoutCasamentoNoMenuComponent,
    children: [
      { path: 'busca-casamento', component: BuscaCasamentoComponent },
      { path: 'criar-lista', component: CriarListaComponent , canActivate: [AuthGuard]},
      { path: 'criar-lista-concluido', component: CriarListaConcluidoComponent , canActivate: [AuthGuard]},
      { path: 'criar-lista-endereco', component: CriarListaEnderecoComponent , canActivate: [AuthGuard]}
    ]
  },
  {
    path: 'casamento',
    component: LayoutCasamentoConvidadoComponent,
    children: [
      { path: 'lista-convidados/:id_casal/:casal', component: ListaConvidadosComponent },
      { path: ':id_casal/produto/:id/:slug', component: ProdutoCasamentoComponent },
    ]
  },
  {
    path: '',
    component: ContentComponent, 
    children: [
      { path: '', component: IndexComponent },
    ]
  },{
    path: 'user',
    component: ContentComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: 'minha-conta', component: MinhaContaComponent },
      { path: 'meus-pedidos', component: MeusPedidosComponent},
      { path: 'meus-pedidos/orderprint/:token', component: OrderPrintPedidoComponent},
      { path: 'favoritos', component: FavoritosComponent },
      { path: 'enderecos', component: EnderecosComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'atendimentos', component: AtendimentosComponent }
    ]
  },
  {
    path: 'user',
    component: ContentNoHeaderComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'cadastro', component: CadastroComponent }
    ]
  },{
    path: 'compras',
    component: ContentNoHeaderComponent,
    children: [
      { path: 'checkout-pagamento', component: CheckoutPagamentoComponent, canActivate: [AuthGuard] },
      { path: 'carrinho-compra/:sessaocarrinho', component: CarrinhoCompraComponent },
      { path: 'carrinho-compra', component: CarrinhoCompraComponent },
      { path: 'conclusaocartao', component: ConclusaocartaoComponent, canActivate: [AuthGuard] },
      { path: 'conclusaoboleto', component: ConclusaoboletoComponent, canActivate: [AuthGuard] }
    ]
  },
  {
    path:'garantia',
    component:ContentComponent,
    children: [
      { path: ':id/:slug/:idseller/:skuproduto', component: GarantiaComponent}
    ]
  },
  {
    path: 'compras',
    component: ContentComponent,
    children: [
      { path: 'entrega', component: EntregaComponent, canActivate: [AuthGuard] }
    ]
  },{
    path: 'produto',
    component: ContentComponent,
    children: [
      { path: ':id/:slug', component: ProdutoComponent },
      { path: 'produto-box', component: ProdutoBoxComponent },
      { path: ':id/:slug/ofertas/:descx/:gradex/:descy/:gradey', component: ListaProdutoComponent },
      { path: ':id/:slug/ofertas/:descx/:gradex/:descy/:gradey', component: ListaProdutoComponent },
      { path: ':id/:slug/ofertas/:desc/:grade/:tipo', component: ListaProdutoComponent },
    ]
  },{
    path: 'lojista',
    component: ContentComponent,
    children: [
      { path: ':sellername/:ref1/:val1/:ref2/:val2/:ref3/:val3/:ref4/:val4', component: LojistaComponent },
      { path: ':sellername/:ref1/:val1/:ref2/:val2/:ref3/:val3', component: LojistaComponent },
      { path: ':sellername/:ref1/:val1/:ref2/:val2', component: LojistaComponent },
      { path: ':sellername/:ref1/:val1', component: LojistaComponent },
      { path: ':sellername', component: LojistaComponent },
      
    ]
  },{
    path: 'hotsite',
    component: ContentComponent,
    children: [
      { path: ':id/:slug', component: HotsiteComponent }
    ]
  }
    ,{
      path: 'vendedor',
      children: [
        { path: 'login', component: LojaLoginComponent },
        { path: '', component: LojaLoginComponent },
          { 
            path: 'produtos', 
            canActivate: [AuthVendedorGuard],
            component: ContentVendedorComponent,
            children:[
              { path: ':ref1/:val1/:ref2/:val2/:ref3/:val3/:ref4/:val4', component: ProdutosComponent },
              { path: ':ref1/:val1/:ref2/:val2/:ref3/:val3', component: ProdutosComponent },
              { path: ':ref1/:val1/:ref2/:val2', component: ProdutosComponent },
              { path: ':ref1/:val1', component: ProdutosComponent },
              { path: '', component:ProdutosComponent}
            ] 
        },
        {
          path: 'produto',
          canActivate: [AuthVendedorGuard],
          component: ContentVendedorComponent,
          children: [
            { path: ':id/:slug', component: ProdutoVendedorComponent },
          ]
        },
        {
          path: 'busca',
          canActivate: [AuthVendedorGuard],
          component: ContentVendedorComponent,
          children: [
            { path: ':texto', component: BuscaVendedorComponent }
          ]
        }
      ]
    },
    {
    path: 'busca',
    component: ContentComponent,
    children: [
      { path: ':texto', component: BuscaComponent }
    ]
  },{
    path: 'categorias',
    component: ContentComponent,
    children: [
      { path: ':categoria/:subcategoria/:idcategoria/:ref1/:val1/:ref2/:val2/:ref3/:val3/:ref4/:val4/:ref5/:val5', component: CategoriasComponent },
      { path: ':categoria/:subcategoria/:idcategoria/:ref1/:val1/:ref2/:val2/:ref3/:val3/:ref4/:val4', component: CategoriasComponent },
      { path: ':categoria/:subcategoria/:idcategoria/:ref1/:val1/:ref2/:val2/:ref3/:val3', component: CategoriasComponent },
      { path: ':categoria/:subcategoria/:idcategoria/:ref1/:val1/:ref2/:val2', component: CategoriasComponent },
      { path: ':categoria/:subcategoria/:idcategoria/:ref1/:val1', component: CategoriasComponent },
      { path: ':categoria/:subcategoria/:idcategoria', component: CategoriasComponent },

      { path: ':categoria/:idcategoria/:ref1/:val1/:ref2/:val2/:ref3/:val3/:ref4/:val4', component: CategoriaprodutoComponent },
      { path: ':categoria/:idcategoria/:ref1/:val1/:ref2/:val2/:ref3/:val3', component: CategoriaprodutoComponent },
      { path: ':categoria/:idcategoria/:ref1/:val1/:ref2/:val2', component: CategoriaprodutoComponent },
      { path: ':categoria/:idcategoria/:ref1/:val1', component: CategoriaprodutoComponent },
      { path: ':categoria/:idcategoria', component: CategoriaprodutoComponent }
    ]
  },{
    path: 'institucional',
    component: ContentComponent,
    children: [
      { path: 'empresa', component: EmpresaComponent },
      { path: 'glossario', component: GlossarioComponent },
      { path: 'mapa-site', component: MapaSiteComponent },
      { path: 'seguranca', component: SegurancaComponent }
    ]
  },
  { 
    path: 'institucional/mais-vendidos', 
    component: ContentComponent,
    children:[
      { path: ':ref1/:val1/:ref2/:val2/:ref3/:val3/:ref4/:val4', component: MaisVendidosComponent },
      { path: ':ref1/:val1/:ref2/:val2/:ref3/:val3', component: MaisVendidosComponent },
      { path: ':ref1/:val1/:ref2/:val2', component: MaisVendidosComponent },
      { path: ':ref1/:val1', component: MaisVendidosComponent },
      { path: '', component: MaisVendidosComponent },
    ] 
  },
  {
    path: 'informacoes',
    component:ContentComponent,
    children:[
      { path: '' , component:InformacoesComponent},
      { path:':info',component:InformacoesComponent},
    ]
  },
  {
    path: 'duvidas',
    component:ContentComponent,
    children:[
      { path: '' , component:DuvidasComponent},
      { path:':duvida',component:DuvidasComponent},
    ]
  },
  {
    path: 'xml-anunciante',
    component: ContentNoHeaderComponent,
    children: [
      { path: 'xml?id=:id&verificador=:slug', component: XmlAnuncianteComponent },
      { path: 'xml', component: XmlAnuncianteComponent },
    ]
  },
  {
    path: 'erro404',
    component: ContentComponent,
    children : [
      {path: '', component: Erro404Component}
    ]
  },
  {
    path: 'compras',
    component: ContentNoHeaderComponent,
    children : [
      {path: 'finalizacao_boleto/:token', component: ConclusaoboletoComponent},
      {path: 'finalizacao_cartao/:token', component: ConclusaocartaoComponent},
      {path: 'imprimir_pedido/:token', component: OrderPrintComponent}
    ]
  },
  { 
    path: '**', component: Erro404Component
  }
];

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
