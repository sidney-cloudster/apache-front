import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions} from '@angular/http';
import { api } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaisVendidosService {

  private endPointMaisVendidos   = api.urlbase+"api/maisvendidos";

  private header = new Headers({
    'Authorization':api.key,
    'Content-Type': 'application/json; charset=utf-8'
  });
  constructor(private http:Http) {
    
  }

  public getMaisVendidos(){
    return this.http.get(this.endPointMaisVendidos,{ headers: this.header })
    .map((response: Response) => response.json())
    .map(res => res)
  }
}
