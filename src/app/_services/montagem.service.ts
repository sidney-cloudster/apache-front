import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions} from '@angular/http';
import { api } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MontagemService {

  constructor(private http:Http) { }
  
  public getMontagemById(montagem:any,idservico:number){
    montagem.forEach(m => {
      if(idservico == m.idServices){
        m.checked = 'T';
      }else{
        delete m.checked;
      }
    });
    return montagem;
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
