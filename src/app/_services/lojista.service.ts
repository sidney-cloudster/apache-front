import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions} from '@angular/http';
import { api } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LojistaService {

  private endPointSeller   = api.urlbase+"api/lojista/";

  private header = new Headers({
    'Authorization':api.key,
    'Content-Type': 'application/json; charset=utf-8'
  });
  constructor(private http:Http) {
    
  }

  public getSeller(nomeSeller:string){
    return this.http.get(this.endPointSeller+nomeSeller,{ headers: this.header })
    .map((response: Response) => response.json())
    .map(res => res)
  }
}
