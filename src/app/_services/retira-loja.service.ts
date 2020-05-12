import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { api } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RetiraLojaService {

  private endPointRetiraLoja  = api.urlbase+"api/lojaregiao/";
  private endPoint = 'https://maps.googleapis.com/maps/api/geocode/';
  private header   = new Headers({
    'Authorization':api.key,
    'Content-Type': 'application/json; charset=utf-8'
  });

  constructor(private http:Http){

  }

  public buscaLojas = (cep:any): Observable <any> => {
    return this.http.get(this.endPointRetiraLoja+cep,{ headers: this.header })
    .map((response: Response) => response.json())
    .map(res => res)
  }

  public buscaMapaEndereco = (endereco:any): Observable <any> => {
    let url = 'json?address='+endereco+'&key=AIzaSyCYXMq93t6zPjYe1rZXg_L7kcpkrYkRCPw'
    return this.http.get(this.endPoint+url)
    .map((response: Response) => response.json())
    .map(res => res)
  }
}
