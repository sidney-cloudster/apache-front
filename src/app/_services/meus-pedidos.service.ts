import { Injectable } from '@angular/core';
import { api } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Http, Headers, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class MeusPedidosService {

  public urlbase = api.urlbase;
  
  private header = new Headers({
    'Authorization':api.key,
    'Content-Type': 'text/html; charset=utf-8'
  });
  
  constructor(private http:Http) { }

  public listaPedidos = (idDadosPedidos:number) : Observable <any> => {
    return this.http.get(api.urlbase+'api/order/'+idDadosPedidos,{ headers: this.header })
      .map((response: Response) => response.json())
      .map(res => res)
      
  }

  public getOrder = (data:string): Observable<any> => {
    return this.http.get(this.urlbase + "api/ordertoken/"+data, { headers: this.header })
      .map((response: Response) => response.json())
      .map(res => res)
  }

}
