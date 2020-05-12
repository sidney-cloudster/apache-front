import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { infoCasamento, infoCasamentoConvidado } from '../../../environments/environment';

import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class InfoCasamentoService {
  
  private nameInfo:string     = infoCasamento.name;
  private keyCasamento:string = infoCasamento.keyUser;

  private nameInfoConv:string = infoCasamentoConvidado.name
  private keyCasamentoConv:string = infoCasamentoConvidado.keyUser

  constructor(
    private sCookie:CookieService) {

  }

  public setInfoNoivos(data: any) {
    let encryp;
    this.sCookie.delete(this.nameInfo);
    encryp = CryptoJS.AES.encrypt(JSON.stringify(JSON.stringify(data)), this.keyCasamento).toString(); // ENCRYP
    this.sCookie.set(this.nameInfo,encryp);
  }

  
  public getInfoNoivos() {
    if (this.sCookie.get(this.nameInfo)) {
        try {
            var cus = this.sCookie.get(this.nameInfo);
            let decryp,decryp2;
            decryp = CryptoJS.AES.decrypt(cus, this.keyCasamento)
            decryp2 = JSON.parse(decryp.toString(CryptoJS.enc.Utf8));     // DECRYP 2
            if (typeof decryp2 == "string") {
                decryp2 = JSON.parse(decryp2);
            }
            return decryp2;
        } catch (error) {
            
        }
    } else {
        return false;
    }
  }

  public setInfoNoivosConvidado(data: any) {
    let encryp;
    this.sCookie.delete(this.nameInfoConv);
    encryp = CryptoJS.AES.encrypt(JSON.stringify(JSON.stringify(data)), this.keyCasamentoConv).toString(); // ENCRYP
    this.sCookie.set(this.nameInfoConv,encryp);
  }

  public getInfoNoivosConvidado() {
    if (this.sCookie.get(this.nameInfoConv)) {
        try {
            var cus = this.sCookie.get(this.nameInfoConv);
            let decryp,decryp2;
            decryp = CryptoJS.AES.decrypt(cus, this.keyCasamentoConv)
            decryp2 = JSON.parse(decryp.toString(CryptoJS.enc.Utf8));     // DECRYP 2
            if (typeof decryp2 == "string") {
                decryp2 = JSON.parse(decryp2);
            }
            return decryp2;
        } catch (error) {
            
        }
    } else {
        return false;
    }
  }

}
