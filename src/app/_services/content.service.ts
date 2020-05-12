import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions} from '@angular/http';
import { api } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private endPointInformacoes  = api.urlbase+"api/informacoes";

  private header = new Headers({
    'Authorization':api.key,
    'Content-Type': 'application/json; charset=utf-8'
  });
  constructor(private http:Http) {
    
  }


  public getInformacoes = ():Observable <any> => {
    return this.http.get(this.endPointInformacoes,{ headers: this.header })
        .map((response: Response) => response.json())
        .map(res => res)
  }
}
