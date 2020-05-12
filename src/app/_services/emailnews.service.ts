import { Injectable } from '@angular/core';
import { RequisicoesService } from './requisicoes.service';
import { Http, Headers, Response, RequestOptions} from '@angular/http';
import { api } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmailnewsService {

  private url    = api.urlbase+"api/emailnews";
  private header = new Headers({
    'Authorization':api.key,
    'Content-Type': 'application/json; charset=utf-8'
  });

  constructor(private sRequisicoes:RequisicoesService,
    private http:Http){
    this.header = this.sRequisicoes.header;
  }

  public cadastrarEmailPromocao(data){
    return this.http.post(this.url,data,{ headers: this.header })
    .map((response: Response) => response.json())
    .map(res => res)
  }
}
