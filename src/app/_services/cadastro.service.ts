import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions} from '@angular/http';
import { api } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CadastroService{

  private endPointCadastroUsuario = api.urlbase+"api/customers";
  private endPointCadastroFone    = api.urlbase+"api/customersphones";

  private header = new Headers({
    'Authorization':api.key,
    'Content-Type': 'application/json; charset=utf-8'
  });

  constructor(private http:Http){
  }

  public cadastrarUsuario = (data:any) : Observable <any> =>{
    return this.http.post(this.endPointCadastroUsuario,data,{ headers: this.header })
      .map((response: Response) => response.json())
      .map(res => res)
  }
  
  public cadastrarUsuarioPhone(data:any){
    return this.http.post(this.endPointCadastroFone,data,{ headers: this.header })
    .map((response: Response) => response.json())
    .map(res => res)
  }
}
