import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions} from '@angular/http';
import { api,lojaData } from '../../environments/environment';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
// import { } from

@Injectable({
  providedIn: 'root'
})
export class ConfiguracaoService {

  private endPointInformacoes  = api.urlbase+"api/informacoes";

  public logo;

  private header = new Headers({
    'Authorization':api.key,
    'Content-Type': 'application/json; charset=utf-8'
  });
  constructor(private http:Http) {}

  public getInformacoes = ():Observable <any> => {
    return this.http.get(this.endPointInformacoes,{ headers: this.header })
        .map((response: Response) => response.json())
        .map(res => res)
  }

  public setShopID(idloja:any){
    let encryp   = CryptoJS.AES.encrypt(JSON.stringify(idloja), lojaData.keyIdLoja).toString(); // ENCRYP
    localStorage.setItem('shop',encryp);
  }

  public getShopID(){
    let shop = localStorage.getItem('shop');
    if(shop != ''){
      let decryp   = CryptoJS.AES.decrypt(shop, lojaData.keyIdLoja); // DECRYP
      return JSON.parse(decryp.toString(CryptoJS.enc.Utf8)); // DECRYP 2
    }else{
      return '';
    }
  }
}
