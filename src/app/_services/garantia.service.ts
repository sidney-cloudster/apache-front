import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions} from '@angular/http';
import { api } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GarantiaService {

  private endPointGarantia   = api.urlbase+"api/garantia";

  private header = new Headers({
    'Authorization':api.key,
    'Content-Type': 'application/json; charset=utf-8'
  });

  constructor(private http:Http) { }
  
  public getGarantiaEstendida = (id:number,skuproduto:string,idseller:number) : Observable <any> => {
    return this.http.get(this.endPointGarantia+'?id='+id+'&sku='+skuproduto+'&idSeller='+idseller,{ headers: this.header })
        .map((response: Response) => response.json())
        .map(res => res)
  }

  public getGarantiaById(garantiaObj:any,idservico:number){
    garantiaObj.forEach(g => {
      if(idservico == g.idServices){
        g.checked = 'T';
      }else{
        delete g.checked;
      }
    });
    return garantiaObj;
  }

  public getIdServiceRules(garantiaObj:any){
    let idRules;
    garantiaObj.forEach(g => {
      if(g.checked == "T"){
        idRules = g.idServiceRules;
      }
    });
    return idRules;
  }
}
