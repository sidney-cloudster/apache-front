import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { carrinho } from '../../environments/environment';
import { api } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Http, Headers, Response} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoCompraService {
  private localStorageProduto = 'product_cart';
  private localStorageSessao  = 'session_cart';

  private carrinho:any = [];
  private carrinhoisEdit:boolean = false;

  public urlbase = api.urlbase;
  private header = new Headers({
    'Authorization': api.key,
    'Content-Type': 'application/json; charset=utf-8'
  });

  private endPoint      = this.urlbase+"api/v1/payment/account/customer";
  private endPointOrder = this.urlbase+"api/v1/payment/order/create/boleto";
  private endPointOrderCreditCard = this.urlbase+"v1/payment/order/create/creditcard";

  constructor(private http:Http) { }

  
  // 
  public getParcelamento = (session:string,total): Observable<any> => {
    return this.http.get(this.urlbase + "api/shoppingcartparcelas/"+session+"?valor="+total, { headers: this.header })
      .map((response: Response) => response.json())
      .map(res => res)
  }

  public checkUser = (data:any): Observable<any> => {
    return this.http.post(this.endPoint, data, { headers: this.header })
      .map((response: Response) => response.json())
      .map(res => res)
  }

  public createOrder = (data:string, form:any, formCC:any): Observable<any> => {
    return this.http.post(this.endPointOrder, [data,form,formCC], { headers: this.header })
      .map((response: Response) => response.json())
      .map(res => res)
  }

  public createOrderCreditCard = (data:string, form:any, formCC:any): Observable<any> => {
    return this.http.post(this.endPointOrderCreditCard, [data,form,formCC], { headers: this.header })
      .map((response: Response) => response.json())
      .map(res => res)
  }
  
  public getOrder = (data:string): Observable<any> => {
    return this.http.get(this.urlbase + "api/ordertoken/"+data, { headers: this.header })
      .map((response: Response) => response.json())
      .map(res => res)
  }

  public getCarrinhoBySessao = (sessao:any):Observable <any> => {
    return this.http.get(api.urlbase+'api/shoppingcartabandoned/'+sessao,{ headers: this.header })
        .map((response: Response) => response.json())
        .map(res => res)
  }


  public setProdutoCarrinho(produto,alteraQtdCarrinho,tipo:any = ''){
    
    let jsonText;
    let produtoCarrinho= this.getProdutosCarrinho();
    let idseller       = produto.idseller;
    let id             = produto.id;
    let dadosgarantia  = produto.garantias;
    let retiraloja     = produto.retiraloja;
    let montagem       = produto.montagem;
    let idgradex       = (produto.gradex != undefined)?produto.gradex.idGradeX:0;
    let idgradey       = (produto.gradey != undefined)?produto.gradey.idGradeY:0;
    let qtd            = (alteraQtdCarrinho > 0 || alteraQtdCarrinho != '')?alteraQtdCarrinho:1;
    let encryp;
    let inserido = false;
    let carrinhoEdit = this.verificarProdutoCarrinho(idseller,id,idgradex,idgradey,qtd,dadosgarantia,retiraloja,montagem,tipo);

    if(!produtoCarrinho){
      jsonText = JSON.stringify(produto);
      jsonText = "["+jsonText+"]";
      encryp   = CryptoJS.AES.encrypt(JSON.stringify(jsonText), carrinho.keyCarrinho).toString(); // ENCRYP
      localStorage.setItem(this.localStorageProduto,encryp);

    }else{
      var jsonObject = this.getProdutosCarrinho();
      if(this.carrinhoisEdit){
        jsonObject = carrinhoEdit;
      }else{
        jsonObject.push(produto);
      }
      encryp   = CryptoJS.AES.encrypt(JSON.stringify(jsonObject), carrinho.keyCarrinho).toString(); // ENCRYP
      localStorage.setItem(this.localStorageProduto,encryp);
      this.carrinhoisEdit = false;
    }
    if(this.verificaSetItem(produto,encryp)){
      inserido = true;
    }
    return inserido;
  }
  public cadastroSessaoCarrinho = (data:any):Observable <any> => {
    return this.http.post(api.urlbase+'api/shoppingcartadd',data,{ headers: this.header })
        .map((response: Response) => response.json())
        .map(res => res)
  }

  /*
    Verifica se o valor inserido no localStorage foi realmente inserido
  */
  private verificaSetItem(produto:any,encryp:any){
    var retorno = false;
    var decryp  = CryptoJS.AES.decrypt(encryp, carrinho.keyCarrinho); // DECRYP
    var decryp2 = JSON.parse(decryp.toString(CryptoJS.enc.Utf8));     // DECRYP 2
    if(typeof decryp2 == "string"){
      decryp2 = JSON.parse(decryp2);
    }
    decryp2.forEach(decr => {
      if(decr.idseller == produto.idseller && decr.id == produto.id && decr.skuProduto == produto.skuProduto){
        retorno = true;
      }
    });
    return retorno;
  }

  public getQuantidadeProdutosCarrinho(){
    let produtos;
    let qtd = 0;
    produtos = this.getProdutosCarrinho();
    for(let p of produtos){
      if(p.quantidade > 0){
        qtd += parseInt(p.quantidade);
      }
    }
    return qtd;
  }
  public getProdutosCarrinho(){
    var decryp,carrinho_hash;
    carrinho_hash = localStorage.getItem(this.localStorageProduto);

    if(carrinho_hash){
      try {
        decryp        = CryptoJS.AES.decrypt(carrinho_hash, carrinho.keyCarrinho); // DECRYP
        this.carrinho = JSON.parse(decryp.toString(CryptoJS.enc.Utf8)); // DECRYP 2
        if(this.carrinho){
          if(typeof this.carrinho == "string"){
            this.carrinho = JSON.parse(this.carrinho);
          }
          return this.carrinho;
        }else{
          return [];
        }
      } catch (error) {
          return [];
      }
    }else{
      return [];
    }
  }

  public getProdutosCarrinhoById(id,idseller,sku){
    var decryp,carrinho_hash;
    carrinho_hash = localStorage.getItem(this.localStorageProduto);

    if(carrinho_hash){
      try {
        decryp        = CryptoJS.AES.decrypt(carrinho_hash, carrinho.keyCarrinho); // DECRYP
        this.carrinho = JSON.parse(decryp.toString(CryptoJS.enc.Utf8)); // DECRYP 2
        if(this.carrinho){
          if(typeof this.carrinho == "string"){
            this.carrinho = JSON.parse(this.carrinho);
          }
          for(let c of this.carrinho){
            if(c.idseller == idseller && id == c.id && sku == c.skuProduto){
              return c;
            }
          }
        }else{
          return [];
        }
      } catch (error) {
          return [];
      }
    }else{
      return [];
    }
  }

  // QUANDO FOR NO MODO VENDEDOR, REMOVE OS PRODUTOS QUE NÃO SÃO DO TIPO VENDEDOR
  public removerProdutosVendedor(idvendedor:number){ 
    let produtos:any;
    produtos = this.getProdutosCarrinho();
    for(let p of produtos){
      if(p.vendedor != '' && p.vendedor.idVendedor != idvendedor){
        this.removeProdutoCarrinho(p);
      }else if(p.vendedor == ''){
        this.removeProdutoCarrinho(p);
      }
    }
  }

  public removerProdutos(){ 
    let produtos:any;
    produtos = this.getProdutosCarrinho();
    for(let p of produtos){
      if(p.vendedor != ''){
        this.removeProdutoCarrinho(p);
      }
    }
  }

  public getQuantidade(produto:any,qtd){
    if(produto.maxCompra >= qtd){
      return qtd;
    }else{
      return produto.maxCompra;
    }
  }

  public verificarProdutoCarrinho(idSeller:number,id:number,idgradex:any,idgradey:any,qtd:number,dadosgarantia:any,retiraloja:any,montagem:any,tipo:any){
    var produtos = this.getProdutosCarrinho();
    if(produtos){
      for(let i = 0; i < produtos.length; i++){
        if(produtos[i].idseller == idSeller && produtos[i].id == id){ // SE O VENDEDOR E PRODUTO FOR IGUAIS
          produtos[i].garantias  = dadosgarantia;
          produtos[i].retiraloja = retiraloja;
          produtos[i].montagem   = montagem;
          produtos[i].quantidade = qtd;
          // if(produtos[i].quantidade <= 0){
            
          // }else{
          //   produtos[i].quantidade = (tipo == 'carrinho')?qtd:this.getQuantidade(produtos[i],parseFloat(produtos[i].quantidade) + 1);
          // }

          if(produtos[i].gradex != 0 && produtos[i].gradey != 0){ // SE EXISTIR GRADEX E GRADEY
            if(produtos[i].gradex.idGradeX == idgradex && produtos[i].gradey.idGradeY == idgradey){ // SE AS GRADES FOREM IGUAIS
              this.carrinhoisEdit = true;
            }
          }else if(produtos[i].gradex != 0 && produtos[i].gradey == 0){ // SE EXISTIR SOMENTE GRADEX
            if(produtos[i].gradex.idGradeX == idgradex ){ // SE AS GRADES X FOREM IGUAIS
              this.carrinhoisEdit = true;
            }
          }else if(produtos[i].gradex == 0 && produtos[i].gradey != 0){ // SE EXISTIR SOMENTE GRADEY
            if(produtos[i].gradey.idGradeY == idgradey ){ // SE AS GRADES Y FOREM IGUAIS
              this.carrinhoisEdit = true;
            }
          }else if(produtos[i].gradex == 0 && produtos[i].gradey == 0){
            this.carrinhoisEdit = true;
          }          
        }
      }
      return produtos;
    }
  }
  public removeProdutoCarrinho(produto:any){
    var produtos = this.getProdutosCarrinho();
    var i = 0;
    localStorage.removeItem(this.localStorageProduto); // REMOVE TODO OS PRODUTOS DO CARRINHO
    for(i = 0; i < produtos.length; i++){
      if(produtos[i].idseller  == produto.idseller &&
         produtos[i].skuSeller == produto.skuSeller &&
         produtos[i].id        == produto.id){
         delete produtos[i];
      }else{
        this.setProdutoCarrinho(produtos[i],produtos[i].quantidade);
      }
    }
  }

  public getJsonCompra(id,nome,categoriamkt,imagem,idseller,nomeseller,gradey,gradex,skuproduto,skuSeller,urlFrete,dimensoes,quantidade,link,maxCompra,origemCompra,retiraloja:any,vendedor:any,dadosgarantia:any,montagem:any){
    let jsonCompra;
    quantidade = (quantidade != '' || quantidade > 0)?quantidade:1;
    jsonCompra = {
      idseller: idseller,
      sellerName: nomeseller,
      skuSeller: skuSeller,
      urlFrete: urlFrete,
      id:id,
      descricao:nome,
      categoriamkt:categoriamkt,
      imagem:imagem,
      link:link,
      quantidade:quantidade,
      altura: dimensoes.altura ,
      comprimento: dimensoes.comprimento,
      largura: dimensoes.largura,
      cubage: dimensoes.cubage,
      gradey:0,
      gradex:0,
      skuProduto:skuproduto,
      preco:0,
      total:0,
      garantias:dadosgarantia,
      montagem:montagem,
      maxCompra:maxCompra,
      estoque:0,
      origemCompra:origemCompra,
      retiraloja:retiraloja,
      vendedor:vendedor,
      frete: ''
    }
    if(gradey != undefined || gradey != '' ){
      jsonCompra.gradey = gradey;
    }
    if(gradex != undefined || gradex != ''){
      jsonCompra.gradex = gradex;
    }
    return jsonCompra;
  }

  public getJsonCadastroSessao(session:string,sku:string,idServiceRules:string,quantidade:number,idLoja:number,email:string,cookie:string){
    let json:object;

    json = {
      session:session,
      sku:sku,
      idServiceRules:idServiceRules,
      quantidade:quantidade,
      email:email,
      cookie:cookie,
      idLoja:idLoja
    }

    return json;
  }

  public getSessionCarrinho(){
    let session:any;
    if(session = localStorage.getItem('session_cart')){
      session  = JSON.parse(session);
      return session.session;
    }
    return false;
  }

  public setLocalStorageCadastroSessao(session:string,cookie:string){
    let json;
    json = {
      session:session,
      cookie:cookie
    };
    localStorage.setItem(this.localStorageSessao,JSON.stringify(json));
  }

  public removeLocalStorageCadastroSessao(){
    localStorage.removeItem(this.localStorageSessao);
    if(localStorage.getItem(this.localStorageSessao)){
      return false;
    }else{
      return true;
    }
  }
  public limparCarrinho(){
    localStorage.removeItem(this.localStorageProduto);
    if(localStorage.getItem(this.localStorageProduto)){
      return false;
    }else{
      return true;
    }
  }

  public getDadosCadastroSessao(skuProduto:string,idrules:string,qtd:number,idLoja:number,email:string){
    let carrinhoSessao,jsonCadastroSessao;

    carrinhoSessao     = JSON.parse(localStorage.getItem(this.localStorageSessao));
    if(carrinhoSessao){
      jsonCadastroSessao = this.getJsonCadastroSessao(carrinhoSessao.session,skuProduto,idrules,qtd,idLoja,email,carrinhoSessao.cookie);
    }else{
      jsonCadastroSessao = this.getJsonCadastroSessao('',skuProduto,idrules,qtd,idLoja,email,'');
    }
    return jsonCadastroSessao;
  }

}
