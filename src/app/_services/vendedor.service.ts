import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { vendedor } from '../models/vendedor';
import * as CryptoJS from 'crypto-js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { api,vendedorData } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Http, Headers, Response, RequestOptions} from '@angular/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class VendedorService {

  private currentVendedorSubject: BehaviorSubject<vendedor>;
  public currentVendedor: Observable<vendedor>;

  private login = api.urlbase + 'api/loginvendor';
  private endereco = api.urlbase + 'api/lojavendedor';

  private header = new Headers({
    'Authorization':api.key,
    'Content-Type': 'application/json; charset=utf-8'
  });
  private nameLogin:string = vendedorData.name;

  constructor(
    private sCookie:CookieService,
    private http:Http
  ) {
    
    this.currentVendedorSubject = new BehaviorSubject<vendedor>(this.getVendedor());
    this.currentVendedor        = this.currentVendedorSubject.asObservable();


  }

  public getEndereco(cep:any,idvendedor:number){
    return this.http.get(this.endereco+"/"+cep+"/"+idvendedor,{ headers: this.header })
    .map((response: Response) => response.json())
    .map(res => res)
  }

  public loginVendedorApi(data:any){
    return this.http.post(this.login, data, { headers: this.header })
    .map((response: Response) => response.json())
    .map(res => res)
  }
  public getVendedor() {

    if (this.sCookie.get(this.nameLogin)) {
      try {
        var cus     = this.sCookie.get(this.nameLogin);
        var decryp  = CryptoJS.AES.decrypt(cus, vendedorData.keyUser); // DECRYP
        var decryp2 = JSON.parse(decryp.toString(CryptoJS.enc.Utf8));     // DECRYP 2

        if (typeof decryp2 == "string") {
            decryp2 = JSON.parse(decryp2);
        }
        if(this.compareDate(decryp2.expire)){
          this.logout();
        }else{
          return decryp2;
        }
      } catch (error) {
          this.logout();
      }
    } else {
        return false;
    }

  }
  
  public compareDate(dateUser){
    let date = new Date();
    let dataHoje = date.toUTCString();
    let hoje = new Date(dataHoje).valueOf();
    let expiraEm = new Date(dateUser).valueOf(); 
    if (hoje > expiraEm) {
        return true;
    }
  }

  public setCustomer(data: any) {
    let encryp;
    let date = new Date();
    let minutes = 120;
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    data.expire = date;
    encryp = CryptoJS.AES.encrypt(JSON.stringify(JSON.stringify(data)), vendedorData.keyUser).toString(); // ENCRYP
    document.cookie = this.nameLogin+"="+encryp+"; expires="+date.toUTCString();
    this.currentVendedorSubject.next(data); 
  }

  
  public logout() {
    this.sCookie.delete(this.nameLogin);
    this.currentVendedorSubject.next(null);
  }

  public currentVendedorValue(){
    return this.currentVendedorSubject.value;
  }

  public jsonLogin(dados:any){
    var json = `
    {
      "usuario":"`+dados.email+`",
      "senha":"`+dados.password+`"
    }`;
    return json;
  }
  public loginValidation(json:any){
    var j = JSON.parse(json);
    var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    var error = '';
    return error;

  }
}
