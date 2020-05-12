import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import { api } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private endPointCategoriaProduto    = api.urlbase+"api/categoriaproduto/";
  private endPointProdutosDaCategoria = api.urlbase+"api/categoriainicial/";

  private header = new Headers({
    'Authorization':api.key,
    'Content-Type': 'application/json; charset=utf-8'
  });

  constructor(private http:Http){

  }

  public getCategoriaById = (idCategoria:any) : Observable <any> =>{
    return this.http.get(this.endPointCategoriaProduto+idCategoria,{ headers: this.header })
      .map((response: Response) => response.json())
      .map(res => res)
  }

  public getProdutosCategoriaById = (idCategoria:any) : Observable <any> =>{
    return this.http.get(this.endPointProdutosDaCategoria+idCategoria,{ headers: this.header })
      .map((response: Response) => response.json())
      .map(res => res)
  }
}
