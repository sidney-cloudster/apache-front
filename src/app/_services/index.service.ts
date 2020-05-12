import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions} from '@angular/http';
import { api } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IndexService {
  private endPointHomepage   = api.urlbase+"api/homepage";

  private header = new Headers({
    'Authorization':api.key,
    'Content-Type': 'application/json; charset=utf-8'
  });
  constructor(
    private http:Http
  ) { }


  public getHomePage(){
    return this.http.get(this.endPointHomepage,{ headers: this.header })
    .map((response: Response) => response.json())
    .map(res => res)
  }
}
