import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Headers, Response, RequestOptions} from '@angular/http';
import { api } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FreteService {

  private localStorageFrete   = 'product_frete';
  private endPointFrete       = api.urlbase+"api/productlist/";
  private header = new Headers({
    'Authorization':api.key,
    'Content-Type': 'application/json; charset=utf-8'
  });

  constructor(private http:Http){

  }


  public gravarUltimoCepCalculado(frete:any){
    let jsonText;
    let a;
    jsonText = {frete:frete};
    localStorage.setItem(this.localStorageFrete,JSON.stringify(jsonText));
  }

  public buscaUltimoCEPCalculado(){
    let cep = localStorage.getItem(this.localStorageFrete);
    let cepTxt;
    if(cep){
      cepTxt = JSON.parse(cep);
      return cepTxt.frete;
    }else{
      return false;
    }
  }

  public calculaFrete = (cep:any,produto:any): Observable <any> => {
    var result;
    var json  = this.JsonCalculoFrete(cep,produto);    
    if(cep.length >= 8 && cep.length <= 9){
      if(produto.urlFrete){
        
        result  = this.http.post(produto.urlFrete,json,{ headers: this.header })
        .map((response: Response) => response.json())
        .map(res => res)
      }else{
        result = false;
      }
    }else{
      $(".invalid-feedback").fadeIn();
      setTimeout(function(){
        $(".invalid-feedback").fadeOut();
      },3000);
    }
    return result;
  }

  private JsonCalculoFrete(cep,dados){
    var jsonEnvio;
    jsonEnvio = {
      destinationZip:cep,
      volumes:[
        {
          sku:dados.skuProduto,
          quantity:dados.quantidade,
          price:dados.preco,
          height:dados.altura,
          length:dados.comprimento,
          width:dados.largura,
          weight:dados.cubage,
        }
      ]
    }    
    return jsonEnvio;
    
  }
}
