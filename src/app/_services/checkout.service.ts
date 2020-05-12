import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { checkout } from '../../environments/environment';
import { ProdutoService } from '../_services/produto.service';
import { api } from '../../environments/environment';
import { Http, Headers, Response} from '@angular/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  public localStorageCheckout = 'checkout-compra';
  public json  = [];
  public urlbase = api.urlbase;
  private header = new Headers({
    'Authorization': api.key,
    'Content-Type': 'application/json; charset=utf-8'
  });
  public endPoint = this.urlbase+"api/validacupom/";
  constructor(private sProduto:ProdutoService,private http:Http) { }

    
  public getCupomDesconto = (cupom:string,cpfcnpj:string): Observable<any> => {
    let link = (cpfcnpj != '')?cupom+'/'+cpfcnpj:cupom;
    return this.http.get(this.endPoint+link, { headers: this.header })
      .map((response: Response) => response.json())
      .map(res => res)
  }
  public montaCarrinhoCheckoutVendedor(produtos:any,enderecoEntrega:any = '',vendedor:any){
    let a;
    let validacao,status,erros;
    let i = 0;
    let gradex,gradey;
    this.json = [];
    let pedido = {
      enderecoEntrega:enderecoEntrega,
      vendedor:vendedor,
      itensPedido : []
    };
    for(let produto of produtos){
      validacao = this.validacaoCheckout(produto);
      if(validacao.length <= 0){
        status = 'ok';
        erros  = [];
      }else{
        status = 'erro';
        erros  = validacao
      }
        gradex = (produto.gradex.length > 0)?this.sProduto.getDadosGrade(produto.gradex,produto.gradex[0].idGradeX,'x'):[];
        gradey = (produto.gradey.length > 0)?this.sProduto.getDadosGrade(produto.gradey,produto.gradey[0].idGradeY,'y'):[];
        this.json.push({
          status:status,
          erros:erros,
          produtos:{
            id:produto.id,
            descricao:produto.descricao,
            gradex:gradex,
            gradey:gradey,
            imagem:produto.imagem,
            urlFrete:produto.urlFrete,
            skuProduto:produto.skuProduto,
            quantidade:produto.quantidade,
            preco:produto.preco,
            altura:produto.altura,
            comprimento:produto.comprimento,
            largura:produto.largura,
            cubage:produto.cubage,
            seller: {
              sellerName:produto.sellerName,
              idseller:produto.idseller,
              skuSeller:produto.skuSeller,
              skuProduto:produto.skuProduto
            },
            enderecoEntrega:enderecoEntrega,
            total:produto.total,
            garantia:this.getDadosGarantiaEscolhida(produto.garantias),
            montagem:this.getDadosMontagemEscolhida(produto.montagem),
            frete:produto.frete,
            link:produto.link
          }
        });
        
      i++;
    }
    pedido.itensPedido = this.json;
    return this.json;
  }


  public montaCarrinhoCheckout(produtos:any){
    let a;
    let validacao,status,erros;
    let i = 0;
    let gradex,gradey;
    this.json = [];
    let tipoendereco;
    let retirLoja:any = '';
    for(let produto of produtos){
      validacao = this.validacaoCheckout(produto);
      if(validacao.length <= 0){
        status = 'ok';
        erros  = [];
      }else{
        status = 'erro';
        erros  = validacao
      }
        gradex = (produto.gradex.length > 0)?this.sProduto.getDadosGrade(produto.gradex,produto.gradex[0].idGradeX,'x'):[];
        gradey = (produto.gradey.length > 0)?this.sProduto.getDadosGrade(produto.gradey,produto.gradey[0].idGradeY,'y'):[];
        tipoendereco = (produto.retiraloja != '')?'retira-loja':'entrega';
        retirLoja    = (produto.retiraloja != '')?produto.retiraloja:'';
        this.json.push({
          status:status,
          erros:erros,
          produtos:{
            id:produto.id,
            descricao:produto.descricao,
            gradex:gradex,
            gradey:gradey,
            imagem:produto.imagem,
            urlFrete:produto.urlFrete,

            skuProduto:produto.skuProduto,
            quantidade:produto.quantidade,
            preco:produto.preco,
            altura:produto.altura,
            comprimento:produto.comprimento,
            largura:produto.largura,
            cubage:produto.cubage,
            seller: {
              sellerName:produto.sellerName,
              idseller:produto.idseller,
              skuSeller:produto.skuSeller,
              skuProduto:produto.skuProduto
            },
            retiraloja:retirLoja,
            tipoendereco:tipoendereco,
            total:produto.total,
            garantia:this.getDadosGarantiaEscolhida(produto.garantias),
            montagem:this.getDadosMontagemEscolhida(produto.montagem),
            frete:produto.frete,
            link:produto.link
          }
        });
        
      i++;
    }
    return this.json;
  }

  public setProdutoCheckout(jsonProduto:any){
    let statusInsere = false;
    if(jsonProduto.length > 0){
      localStorage.removeItem(this.localStorageCheckout);
      let encryp = CryptoJS.AES.encrypt(JSON.stringify(jsonProduto), checkout.keyCheckout).toString(); // ENCRYP
      localStorage.setItem(this.localStorageCheckout,encryp);
      if(this.verificaCheckout(jsonProduto,encryp)){
        statusInsere = true;
      }
    }
    return statusInsere;
  }

  public getProdutosCheckout(){
    var decryp,carrinho_hash,carrinho;
    carrinho_hash = localStorage.getItem(this.localStorageCheckout);

    if(carrinho_hash){
      decryp   = CryptoJS.AES.decrypt(carrinho_hash, checkout.keyCheckout); // DECRYP
      carrinho = JSON.parse(decryp.toString(CryptoJS.enc.Utf8)); // DECRYP 2
      if(carrinho){
        if(typeof carrinho == "string"){
          carrinho = JSON.parse(carrinho);
        }
        return carrinho;
      }else{
        return [];
      }
    }else{
      return [];
    }
  }
  /*
    Método responsavel por garantir que os produtos do checkout foram inseridos corretamente.
 */
  private verificaCheckout(produto:any,encryp:any){
    let retorno = false;
    let erro    = 0;
    let decryp  = CryptoJS.AES.decrypt(encryp, checkout.keyCheckout); // DECRYP
    let decryp2 = JSON.parse(decryp.toString(CryptoJS.enc.Utf8));     // DECRYP 2
    if(typeof decryp2 == "string"){
      decryp2 = JSON.parse(decryp2);
    }
    decryp2.forEach((decr,k) => {
      if(
         decr.produtos.seller.idseller != produto[k].produtos.seller.idseller &&
         decr.produtos.id != produto[k].produtos.id &&
         decr.produtos.seller.skuProduto != produto[k].produtos.seller.skuProduto
        ){
        erro++
      }
    });
    if(erro <= 0){
      return true;
    }else{
      return false;
    }
  }
  private validacaoCheckout(produto){
    let error = [];
    if(produto.id == undefined || produto.id <= 0){
      error.push({ errorCode:1,errorMsg:"id produto não encontrado."});
    }
    if(produto.descricao == undefined || produto.descricao.length <= 0){
      error.push({ errorCode:2,errorMsg:"nome do produto não encontrado."});
    }
    if(produto.sellerName == undefined || produto.sellerName.length <= 0){
      error.push({ errorCode:3,errorMsg:"nome do seller não encontrado."});
    }
    if(produto.idseller == undefined || produto.idseller <= 0 || typeof produto.idseller != "number"){
      error.push({ errorCode:4,errorMsg:"idseller não encontrado ou incorreto."});
    }
    if(produto.skuSeller == undefined || produto.skuSeller == '' || produto.skuSeller.length <= 0){
      error.push({ errorCode:5,errorMsg:"skuseller não encontrado ou incorreto."});
    }
    if(produto.skuProduto == undefined || produto.skuProduto == '' || produto.skuProduto.length <= 0){
      error.push({ errorCode:6,errorMsg:"skuproduto não encontrado ou incorreto."});
    }
    if(produto.quantidade == undefined || produto.quantidade <= 0){
      error.push({ errorCode:7,errorMsg:"quantidade é 0 ou não encontrado."});
    }
    if(parseFloat(produto.preco) == undefined || parseFloat(produto.preco) <= 0){
      error.push({ errorCode:8,errorMsg:"preco é 0 ou não encontrado."});
    }
    if(produto.total == undefined || parseFloat(produto.total) <= 0 || parseFloat(produto.total) < parseFloat(produto.preco)){
      error.push({ errorCode:9,errorMsg:"total é 0 ou não encontrado."});
    }

    // if(produto.frete == undefined || produto.frete == ''){
    //   if(produto.retiraloja == undefined || produto.retiraloja == ''){
    //     error.push({ errorCode:10,errorMsg:"retira loja não encontrado."});
    //   }
    // }

    // if(produto.retiraloja == undefined || produto.retiraloja == ''){
    //   if(produto.frete == undefined || produto.frete == ''){
    //     error.push({ errorCode:11,errorMsg:"Frete não encontrado."});
    //   }
    // }

    if(produto.link == undefined || produto.link == ''){
      error.push({ errorCode:12,errorMsg:"link não encontrado."});
    }

    return error;
  }

  private getDadosGarantiaEscolhida(garantia:any){
    let garantiaRetorno;
    for(let g of garantia){
      if(g.checked == 'T'){
        garantiaRetorno = g;
      }
    }
    if(garantiaRetorno == undefined){
      garantiaRetorno = '';
    }
    return garantiaRetorno;
  }

  private getDadosMontagemEscolhida(montagem:any){
    let montagemRetorno;
    for(let m of montagem){
      if(m.checked == 'T'){
        montagemRetorno = m;
      }
    }
    if(montagemRetorno == undefined){
      montagemRetorno = '';
    }
    return montagemRetorno;
  }

}
