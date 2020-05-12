import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions} from '@angular/http';
import { api } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private endPointMenuPrincipal   = api.urlbase+"api/category";
  private endPointMenuCategorias  = api.urlbase+"api/categorialista";
  private endPointHomepage        = api.urlbase+"api/homepage";

  private header = new Headers({
    'Authorization':api.key,
    'Content-Type': 'application/json; charset=utf-8'
  });
  constructor(private http:Http) {
    
  }


  public getMenuPrincipal = (): Observable <any> => {
    return this.http.get(this.endPointMenuPrincipal,{ headers: this.header })
    .map((response: Response) => response.json())
    .map(res => res)
  }

  public getMenuCategorias = () : Observable <any> => {
    return this.http.get(this.endPointMenuCategorias,{ headers: this.header })
    .map((response: Response) => response.json())
    .map(res => res)
  }

  public getHomePageBanners = (): Observable <any> => {
    return this.http.get(this.endPointHomepage,{ headers: this.header })
    .map((response: Response) => response.json())
    .map(res => res)
  }
}
