import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { GoogleLoginProvider, FacebookLoginProvider} from 'angularx-social-login';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { api,userData,infoCasamento } from '../../environments/environment';
import { Http, Headers, Response } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })

export class UserService {

    private editEndereco      = api.urlbase + "api/customersaddress";
    private endpointLogin     = api.urlbase + 'api/login';
    private endpointLoginVend = api.urlbase + 'api/userloginvendor';
    private getAll            = api.urlbase + "api/customersaddress/all/";
    private getEnderecoSelect = api.urlbase + "api/customersaddress/";
    private saveEndereco      = api.urlbase + "api/customersaddress";
    private endPoint          = api.urlbase + "api/buscaendereco/";

    private header = new Headers({
      'Authorization':api.key,
      'Content-Type': 'application/json; charset=utf-8'
    });

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private nameLogin:string = userData.name;
    private nameInfo:string  = infoCasamento.name;

    constructor(private http: Http,private router: Router, private sCookie:CookieService) {
        this.currentUserSubject = new BehaviorSubject<User>(this.getCustomer());
        this.currentUser = this.currentUserSubject.asObservable();
        
    }

    // GET ENDEREÇO PADRÃO
    public getEnderecoDefault = (cpfCnpj: string): Observable<any> => {
        return this.http.get(this.endPoint + cpfCnpj + '/R', { headers: this.header })
          .map((response: Response) => response.json())
          .map(res => res)
    }
    // GET ENDEREÇOS SECUNDARIOS
    public getEnderecoSecundario = (cpfCnpj: string): Observable<any> => {
        return this.http.get(this.endPoint + cpfCnpj + '/C', { headers: this.header })
          .map((response: Response) => response.json())
          .map(res => res)
    }
    // GET TODOS OS ENDEREÇOS
    public getAllAddress = (cpfCnpj: string): Observable<any> => {
        return this.http.get(this.getAll + cpfCnpj, { headers: this.header })
          .map((response: Response) => response.json())
          .map(res => res)
    }
    // ATUALIZA ENDEREÇO
    public putEndereco = (idAddress: number, data: any): Observable<any> => {
        return this.http.put(this.editEndereco + '/' + idAddress, data, { headers: this.header })
          .map((response: Response) => response.json())
          .map(res => res)
    }
    // BUSCA ENDEREÇO POR ID
    public getAddressSelectById = (idAddress: string): Observable<any> => {
        return this.http.get(this.getEnderecoSelect + idAddress, { headers: this.header })
        .map((response: Response) => response.json())
        .map(res => res)
    }
    // CRIAR NOVO ENDEREÇO
    public postEndereco = (data: any): Observable<any> => {
        return this.http.post(this.saveEndereco, data, { headers: this.header })
          .map((response: Response) => response.json())
          .map(res => res)
    }
    // LOGIN NO SITE
    public loginSite(data:any){
        return this.http.post(this.endpointLogin, data, { headers: this.header })
        .map((response: Response) => response.json())
        .map(res => res)
    }
    // LOGIN SITE VENDEDOR
    public loginSiteVendedor(data:any){
        return this.http.post(this.endpointLoginVend, data, { headers: this.header })
        .map((response: Response) => response.json())
        .map(res => res)
    }

    // GET DADOS USUARIO DESCRIPTOGRAFADO
    public getCustomer() {
        if (this.sCookie.get(this.nameLogin)) {
            try {
                var cus = this.sCookie.get(this.nameLogin);
                let decryp,decryp2;
                decryp = CryptoJS.AES.decrypt(cus, userData.keyUser)
                decryp2 = JSON.parse(decryp.toString(CryptoJS.enc.Utf8));     // DECRYP 2
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

    // COMPARA A DATA DO COOKIE COM A DO USUARIO
    public compareDate(dateUser){
        let date = new Date();
        let dataHoje = date.toUTCString();
        let hoje = new Date(dataHoje).valueOf();
        let expiraEm = new Date(dateUser).valueOf(); 
        if (hoje > expiraEm) {
            return true;
        }
    }
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public getJsonUsuario(cpfcnpj,nome,nomefantasia,gen,profissao,email,photo = '',plataform){
        let json = {
            cpfCnpj: cpfcnpj,
            cusFantasyName: nome,
            cusCompanyName: nomefantasia,
            cusGenre: gen,
            cusProfissionBranch: profissao,
            cusEmail: email,
            plataform:plataform
        }
        return json;
    }
    // SETA NO COOKIE OS DADOS DO USUARIO
    public setCustomer(data: any) {
        let encryp;
        this.logout();
        var date = new Date();
        var minutes = 60;
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        data.expire = date;
        encryp = CryptoJS.AES.encrypt(JSON.stringify(JSON.stringify(data)), userData.keyUser).toString(); // ENCRYP
        document.cookie = this.nameLogin+"="+encryp+"; expires="+date.toUTCString();
        this.currentUserSubject.next(data); 
    }

    // LOGOUT
    public logout() {
        // console.log(this.nameLogin);
        // try {
            this.sCookie.delete(this.nameLogin);
            this.sCookie.delete(this.nameInfo);
            this.currentUserSubject.next(null);    
        // } catch (error) {

        // }
    }

    // LOGIN REDE SOCIAL
    public loginRedeSocial(socialPlatform: string) {
        let socialPlatformProvider;
        if (socialPlatform == "facebook") {
            socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        } else if (socialPlatform == "google") {
            socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        }
        return socialPlatformProvider;
    }

    // VERIFICA LOGIN
    public checkLogin() {
        if ((this.sCookie.get(this.nameLogin)) != null && (this.sCookie.get(this.nameLogin) !== "")) {
            return true;
        } else {
            return false;
        }
    }
    
}