import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions} from '@angular/http';
import { api } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BuscaService {

  private endPointAutocomplete   = api.urlbase+"api/autocomplete/";
  private endPointAutocompleteVendedor = api.urlbase+"api/autocompletevendedor/";
  private endPointResultadoBusca = api.urlbase+"api/busca/";

  private header = new Headers({
    'Authorization':api.key,
    'Content-Type': 'application/json; charset=utf-8'
  });

  constructor(private http:Http) { }

  public autocompleteBusca = (texto:any) : Observable <any> => {
    return this.http.get(this.endPointAutocomplete+texto,{ headers: this.header })
      .map((response: Response) => response.json())
      .map(res => res)
  }

  public autocompleteBuscaVendedor = (texto:any) : Observable <any> => {
    return this.http.get(this.endPointAutocompleteVendedor+texto,{ headers: this.header })
      .map((response: Response) => response.json())
      .map(res => res)
  }

  public resultadoBusca = (texto:any) : Observable <any> => {
    return this.http.get(this.endPointResultadoBusca+texto,{ headers: this.header })
      .map((response: Response) => response.json())
      .map(res => res)
  }
}
