import { Injectable, PLATFORM_ID, Inject, ɵConsole } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Http, Headers, Response } from '@angular/http';
import { Title, Meta } from '@angular/platform-browser';
import { api } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UserService } from 'src/app/_services/user.service';
import { CarrinhoCompraService } from './carrinho-compra.service';
import { ConfiguracaoService } from './configuracao.service';
import { ProdutoService } from 'src/app/_services/produto.service';



@Injectable({
  providedIn: 'root'
})
export class MarketingService {

  private header = new Headers({
    'Authorization':api.key,
    'Content-Type': 'text/html; charset=utf-8'
  });

  private headerJson = new Headers({
    'Authorization':api.key,
    'Content-Type': 'application/json; charset=utf-8'
  });
    
  private endPointEnviarDadosSessao = api.urlbase+"api/useronline";
  private endPointClickBanner       = api.urlbase+"api/bannercategoryclicked";
  private endPointClickBannerPage   = api.urlbase+"api/bannerpageclicked";

  public url_site;
  public res;
  // public resArray = [];
  public json:any = [];
  public item:any = [];
  constructor(
    @Inject(DOCUMENT) private document,
    @Inject(PLATFORM_ID) private platformId,
    private titleService: Title,
    private meta: Meta,
    private http:Http,
    private router:Router,
    private sUser: UserService,
    private sCarrinho: CarrinhoCompraService,
    private sConfiguracao:ConfiguracaoService,
    private sProduto: ProdutoService ) { 
      
      this.sConfiguracao.getInformacoes().subscribe(r=>{
        this.url_site = r.url_site;
      });
    }

  public getXmlAnunciante = (idAnunciante:number,verificador:string): Observable <any> => {
    return this.http.get(api.urlbase+'api/xmladvertiser?id='+idAnunciante+'&verificador='+verificador,{ headers: this.header })
    .map((response: Response) => response.text())
    .map(res => res)
  }
  
  public resultadoBuscaURL = (idAnunciante:number,verificador:string) : Observable <any> => {
    return this.http.get(api.urlbase+'api/verificaparceiro?id='+idAnunciante+'&verificador='+verificador,{ headers: this.header })
      .map((response: Response) => response.json())
      .map(res => res)
      
  }

  public salvarDadosSessao = (data: any): Observable <any> => {
    return this.http.post(this.endPointEnviarDadosSessao,data,{ headers: this.headerJson })
        .map((response: Response) => response.json())
        .map(res => res)
  }

  public salvarUserOnline = (data: any): Observable <any> => {
    return this.http.post(this.endPointEnviarDadosSessao,data,{ headers: this.headerJson })
        .map((response: Response) => response.json())
        .map(res => res)
  }

  public salvarClickBanner = (data: any): Observable <any> => {
    return this.http.post(this.endPointClickBanner,data,{ headers: this.headerJson })
        .map((response: Response) => response.json())
        .map(res => res)
  }

  public salvarClickBannerPage = (data: any): Observable <any> => {
    return this.http.post(this.endPointClickBannerPage,data,{ headers: this.headerJson })
        .map((response: Response) => response.json())
        .map(res => res)
  }
 
  userOnline (sessao: string = null){
    
    var sessaoLogin  = JSON.parse(localStorage.getItem('session_cart'));
    var parceiro     = localStorage.getItem('idParceiro');
    var arquivo_url  = window.location.pathname;   
    var cpf_cnpj:any =  this.sUser.currentUserValue; 
    
    if((sessaoLogin === undefined) || (sessaoLogin === null) ) {
      sessaoLogin = "";
      // localStorage.setItem('session_cart', '');
    }else{
      sessaoLogin = sessaoLogin['session'];
      // localStorage.setItem('session_cart', sessaoLogin);
    }

    if (parceiro !== ""){
      parceiro = localStorage.getItem('idParceiro');
    }else{
      parceiro = '1';
    }
                   
    if(cpf_cnpj['cpfCnpj'] !== undefined){
      cpf_cnpj = cpf_cnpj['cpfCnpj'];
    
    }else {
      cpf_cnpj = "";
    }  
    let dados = { "session": sessaoLogin,"idParceiro": parceiro,"url": arquivo_url,"cpfCnpj": cpf_cnpj };

    this.salvarUserOnline(dados).subscribe(v => {

      if (v.Code == "success") {
          this.sCarrinho.setLocalStorageCadastroSessao(v.session, v.cookie);
          // console.log("USUÁRIO ONLINE SALVO COM SUCESSO!", v);
        } else {
          // console.log("ERRO AO SALVAR USUÁRIO ONLINE", v);
        }
    },
      e => {

    });
  }

  camposURL(query: string = null){
    // var query = location.search.slice(1);
    var partes = query.split('&');
    var data = {};

    partes.forEach(function (parte) {
        var chaveValor = parte.split('=');
        var chave = chaveValor[0];
        var valor = chaveValor[1];
        data[chave] = valor;
    });

    if((data['utm_source'] !== null && data['utm_source'] !== undefined) && (data['utm_medium'] !== null && data['utm_medium'] !== undefined) && (data['parceiro'] !== null && data['parceiro'] !== undefined)){
     
      var dataSource = data['utm_source'];
      var dataMedium = data['utm_medium'];
      var parceiro   = data['parceiro']; 
      
      this.resultadoBuscaURL(parceiro,dataMedium).subscribe(v => {
        if (v[0].idParceiro) {
          parceiro = v[0].idParceiro;
          localStorage.setItem('idParceiro', v[0].idParceiro);
        }else{
          parceiro = '1';
          localStorage.setItem('idParceiro', '1');   
        }
      },
        e => {
          parceiro = '1';
          localStorage.setItem('idParceiro', '1');
        });
    
    } else if(localStorage.getItem('idParceiro')){
      parceiro = localStorage.getItem('idParceiro');
      localStorage.setItem('idParceiro', localStorage.getItem('idParceiro'));   

    } else {
      parceiro = '1';
      localStorage.setItem('idParceiro', '1');
    }

    if(!localStorage.getItem('session_cart')){
      if((localStorage.getItem('session_cart') != undefined) || (localStorage.getItem('session_cart') != null)){
   
        var sessaoLogin = JSON.parse(localStorage.getItem('session_cart'));
            sessaoLogin = sessaoLogin['session'];

        var arquivo_url = window.location.pathname;  
        var cpf_cnpj:any =  this.sUser.currentUserValue; 

        if(cpf_cnpj['cpfCnpj'] !== undefined){
          cpf_cnpj = cpf_cnpj['cpfCnpj'];
        
        }else {
          cpf_cnpj = "";
        }      

        let dados = { "session": sessaoLogin,"idParceiro": parceiro,"url": arquivo_url,"cpfCnpj": cpf_cnpj };
        
        this.salvarDadosSessao(dados).subscribe(v => {
          this.sCarrinho.setLocalStorageCadastroSessao(v.session, v.cookie);
        },
          e => {

        });

      } 
    }       
  }

  public clickBanner(id:number){
    let dados = { "idBanner": id };
    this.salvarClickBanner(dados).subscribe(v => {
      // console.log("CLICK NO BANNER SALVO COM SUCESSO! ", v)
    },
    e => {
      // console.log("ERRO AO SALVAR CLICK NO BANNER!", e)
    });
  }

  public clickBannerPage(id:number){
    let dados = {"idBanner": id};
    this.salvarClickBannerPage(dados).subscribe(v =>{
      // console.log("CLICK NO BANNER PAGE SALVO COM SUCESSO! ", v)
    },
      e => {
      // console.log("ERRO AO SALVAR CLICK NO BANNER PAGE!", e) 
    });
  }

  verificaLink(url:string){
    var verificaUrl = url;
    var resultado   = verificaUrl.split("www.");
    
    if((resultado[1] !== undefined) && (resultado[1] !== null)){
      window.open(verificaUrl, "_blank");
      
    }else{
      var caminho = verificaUrl.split(this.url_site);

      if((caminho[1] !== "") && (caminho[1] !== undefined)){
        this.router.navigate([caminho[1]]);
      } 
    }
  }

  removeAcento (text){       
    text = text.toLowerCase();                                                         
    text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    text = text.replace(new RegExp('[Ç]','gi'), 'c');
    return text;                 
  }

  removeEspaco (text){
    text = text.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, "")
    return text;
  }

  primeiraLetraMaiuscula(str){
		return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}

  public loadGoogle(trackingID: string): void {
    let gaScript = document.createElement('script');
    gaScript.setAttribute('async', 'true');
    gaScript.setAttribute('src', `https://www.googletagmanager.com/gtag/js?id=${ trackingID }`);

    let gaScript2 = document.createElement('script');
    gaScript2.innerText = `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag(\'js\', new Date());gtag(\'config\', \'${ trackingID }\');`;
    
    document.documentElement.firstChild.appendChild(gaScript);
    document.documentElement.firstChild.appendChild(gaScript2);
    document.getElementsByTagName('head')[0].appendChild(gaScript);
  }

  public snippetCarregamentoPagina (trackingID: string): void {
    let gaScript  = document.createElement('script');
    let gaScript2 = document.createElement('script');

    gaScript2.innerText = `gtag(\'event\', \'conversion\', { \'send_to\': \'${ trackingID }\', \'transaction_id\': \'\' });`;
    
    document.documentElement.firstChild.appendChild(gaScript);
    document.documentElement.firstChild.appendChild(gaScript2);
    document.getElementsByTagName('head')[0].appendChild(gaScript);
  }

  public snippetCliquePagina (trackingID: string, url: string): void {
    let gaScript  = document.createElement('script');
    let gaScript2 = document.createElement('script');

    gaScript2.innerText = `function gtag_report_conversion(\'${ url }\') { var callback = function () { if (typeof(url) != \'undefined\') { window.location = \'${ url }\'; }}; gtag(\'event\', \'conversion\', { \'send_to\': \'${ trackingID }\', \'transaction_id\': \'\', \'event_callback\': callback }); return false; }`;
    
    document.documentElement.firstChild.appendChild(gaScript);
    document.documentElement.firstChild.appendChild(gaScript2);
    document.getElementsByTagName('head')[0].appendChild(gaScript);
  }

  public googleAvaliacoes(merchant_id: string, order_id: string, email: string, delivery_country: string, estimated_delivery_date: string): void {
    let gaScript = document.createElement('script');
    gaScript.setAttribute('async', 'true');
    gaScript.setAttribute('defer', 'true');
    gaScript.setAttribute('src', `https://apis.google.com/js/platform.js?onload=renderOptIn`);

    let gaScript2 = document.createElement('script');
    gaScript2.innerText = `window.renderOptIn = function() { window.gapi.load(\'surveyoptin\', function() { window.gapi.surveyoptin.render({ \'merchant_id\': \'${ merchant_id }\', \'order_id\': \'${ order_id }\', \'email\': \'${ email }\', \'delivery_country\': \'${ delivery_country }\', \'estimated_delivery_date\': \'${ estimated_delivery_date }\', }); }); }`;
    
    document.documentElement.firstChild.appendChild(gaScript);
    document.documentElement.firstChild.appendChild(gaScript2);
    document.getElementsByTagName('head')[0].appendChild(gaScript);
  }

  public googleIntegracaoSimbolo(merchant_id: string): void {
    let gaScript = document.createElement('script');
    gaScript.setAttribute('async', 'true');
    gaScript.setAttribute('defer', 'true');
    gaScript.setAttribute('src', `https://apis.google.com/js/platform.js?onload=renderBadge`);

    let gaScript2 = document.createElement('script');
    gaScript2.innerText = `window.renderBadge = function() { var ratingBadgeContainer = document.createElement(\'div\'); document.body.appendChild(ratingBadgeContainer); window.gapi.load(\'ratingbadge\', function() { window.gapi.ratingbadge.render(ratingBadgeContainer, { \'merchant_id\': \'${ merchant_id }\' }); }); }`;
    
    document.documentElement.firstChild.appendChild(gaScript);
    document.documentElement.firstChild.appendChild(gaScript2);
    document.getElementsByTagName('head')[0].appendChild(gaScript);
  }

  public googleFacebookPixel(merchant_id: string): void {
    let gaScript  = document.createElement('script');
    let gaScript2 = document.createElement('script');
    gaScript2.innerText = `!function(f,b,e,v,n,t,s) {if(f.fbq)return;n=f.fbq=function(){n.callMethod? n.callMethod.apply(n,arguments):n.queue.push(arguments)}; if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version=\'2.0\'; n.queue=[];t=b.createElement(e);t.async=!0 t.src=v;s=b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s)}(window, document,\'script\', \'https://connect.facebook.net/en_US/fbevents.js\'); fbq(\'init\', \'${ merchant_id }\'); fbq(\'track\', \'PageView\');`;

    document.documentElement.firstChild.appendChild(gaScript);
    document.getElementsByTagName('head')[0].appendChild(gaScript);


    let gaScript3 = document.createElement('noscript');
    gaScript3.innerHTML = `<img height=\'1\' width=\'1\' style=\'display:none\' src=\'https://www.facebook.com/tr?id=\'${ merchant_id }\'&ev=PageView&noscript=1\' />`;

    document.documentElement.firstChild.appendChild(gaScript3);
    document.getElementsByTagName('head')[0].appendChild(gaScript3);
  }

  public googleTagManager(merchant_id: string): void {
    let gaScript = document.createElement('script');
    gaScript.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({\'gtm.start\': new Date().getTime(),event:\'gtm.js\'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!=\'dataLayer\'?\'&l=\'+l:\'\';j.async=true;j.src=\'https://www.googletagmanager.com/gtm.js?id=\'+i+dl;f.parentNode.insertBefore(j,f);})(window,document,\'script\',\'dataLayer\',\'${ merchant_id }\');`;

    document.documentElement.firstChild.appendChild(gaScript);
    document.getElementsByTagName('head')[0].appendChild(gaScript);
  }

  public googleManagerNoscript(merchant_id: string): void {
    let gaScript = document.createElement('noscript');
    gaScript.innerHTML = `<iframe src=\"https://www.googletagmanager.com/ns.html?id=\'${ merchant_id }\'\" height=\"0\" width=\"0\" style=\"display:none;visibility:hidden\">`;

    document.documentElement.firstChild.appendChild(gaScript);
    document.getElementsByTagName('head')[0].appendChild(gaScript);
  }

  public googleLomadee(dataLayer:string, merchant_id: string): void {
    let gaScript = document.createElement('script');
    gaScript.innerText = `var lomadee_datalayer = \'${ dataLayer }\'; var lomadeeTag = document.createElement(\'script\'); lomadeeTag.type = \'text/javascript\'; lomadeeTag.src = \"//secure.lomadee.com/a/\'${ merchant_id }\'.js\"; document.getElementsByTagName(\'body\')[0].appendChild(lomadeeTag); `;

    document.documentElement.firstChild.appendChild(gaScript);
    document.getElementsByTagName('head')[0].appendChild(gaScript);
  }

  /* COMENTÁRIO IMPORTANTE
  merchant_id: Objeto que contém os dados do pedido.
  amount: Preencha com o valor total do pedido.
  discount: (opcional) Preencha com o valor do desconto aplicado no pedido (exemplo: descontos aplicados a pagamento por boleto).
  paymentType: Preencha com a forma de pagamento utilizada - cc (cartão de crédito), cd (débito), bl (boleto),fp (outros)
  sku: Preencha com o SKU do produto.
  name: Preencha com o Nome do produto.
  category: Preencha com a categoria do produto (De acordo com a listagem que deverá ser enviada para lomadee).
  price: Preencha com o preço unitário  pelo produto. (*IMPORTANTE: Preço final à ser pago pelo produto, já reduzidos os descontos)
  quantity: Preencha com a quantidade do produto que foi comprada pelo usuário.
  */
  public setItems(item:any,merchant_id: string, amount: string, discount: string, paymentType: string,
    qtdFor:number){
    var produtosCarrinho = this.sCarrinho.getProdutosCarrinho();
    this.item.push(item);
    let gaScript = document.createElement('script');

    if(produtosCarrinho.length == qtdFor){
      gaScript.innerHTML = `var lomadee_datalayer = {
                            \"page\" : \"conversion\",
                            \"conversion\" : {
                              \"transactionId\" : \'${ merchant_id }\',
                              \"amount\" : \'${ amount }\',
                              \"discount\" : \'${ discount }\',
                              \"currency\" : \"BRL\",
                              \"paymentType\" : \'${ paymentType }\',
                              \"itens\" : [${ this.item }]
                            }
                          }; 
                          
                          var lomadeeTag = document.createElement(\'script\');
                          lomadeeTag.type = \'text/javascript\';
                          lomadeeTag.src = \"//secure.lomadee.com/a/\'${ merchant_id }\'.js\";

                          document.getElementsByTagName(\'body\')[0].appendChild(lomadeeTag); 
                          document.documentElement.firstChild.appendChild(gaScript);
                          `;
    }
  }

  public googleLomadeeVenda(merchant_id: string, amount: string, discount: string, paymentType: string): void {
    var produtosCarrinho = this.sCarrinho.getProdutosCarrinho();
    this.item = [];
    let i = 1;
    for(let p of produtosCarrinho){
      this.sProduto.getPrecoProduto(p['id'],p['skuProduto'],p['quantidade']).subscribe(
      r =>{
          let x = '{\'sku\' : '+p['skuProduto']+', \'name\' : '+p['descricao']+', \'category\' : '+p['categoriamkt']+', \'price\' :'+ r[0].preco +', \'quantity\' : '+p['quantidade']+'}'
          this.setItems(x,merchant_id, amount, discount, paymentType,i);
          i++;
      }, e => {
          console.log("ERRO PAGE!", e) 
      });      
    }
  }

  /*
  home, product, category, visit
  */
  public lomadeePagina(merchant_id: string, pagina: string): void {
    let gaScript = document.createElement('script');
    gaScript.innerText = `
                          var lomadee_datalayer = {
                           \"page\" : \'${ pagina }\'
                          };
                        
                          var lomadeeTag = document.createElement(\'script\');
                          lomadeeTag.type = \'text/javascript\';
                          lomadeeTag.src = \"//secure.lomadee.com/a/\'${ merchant_id }\'.js\";
                        
                          document.getElementsByTagName(\'body\')[0].appendChild(lomadeeTag);`;

    document.documentElement.firstChild.appendChild(gaScript);
  }

  public seloEbitRodape(merchant_id: any) {
    let gaScript = document.createElement('script');
    gaScript.setAttribute('type', `text/javascript`);
    gaScript.setAttribute('id', `getSelo`);
    gaScript.setAttribute('src', `https://imgs.ebit.com.br/ebitBR/selo-ebit/js/getSelo.js?\'${ merchant_id }\'`);
    gaScript.setAttribute('defer', `defer`);
    
    document.documentElement.firstChild.appendChild(gaScript);
  }
    
  setDocTitle(title: string) {
    console.log('current title:::::' + this.titleService.getTitle());
    this.titleService.setTitle(title);
  }

  public openGraph(descricao:any, caminho_imagem: any){
    var url_atual = window.location.href;

    this.sConfiguracao.getInformacoes().subscribe(c =>{
      const tags = [
        { property: 'og:locale', content: "en_US"},
        { property: 'og:type', content: "article"},
        { property: 'og:title', content: c.titulo},
        { property: 'og:description', content: descricao},
        { property: 'og:url', content: url_atual},
        { property: 'og:site_name', content: c.nome_loja},
        { property: 'og:image', content: caminho_imagem},
        { property: 'og:image:secure_url', content: caminho_imagem},
        { name: 'twitter:card', content: "produto"},
        { name: 'twitter:description', content: descricao},
        { name: 'twitter:title', content: c.titulo},
        { name: 'twitter:image', content: caminho_imagem},
      ];        
      tags.forEach(tag => this.meta.updateTag(tag));
    });
  }

  
}
