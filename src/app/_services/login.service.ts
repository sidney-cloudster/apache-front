import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  msgRetorno;

  constructor() { }

  public showAlertMsg(error,alert){  
    this.msgRetorno = `<div class="alert alert-`+alert+`" role="alert">`+error+`</div>`;
  }

  public jsonLogin(dados:any){
    var json = `
    {
      "user":"`+dados.email+`",
      "password":"`+dados.senhaLogin+`"
    }`;
    return json;
  }
  public loginValidation(json:any){
    var j = JSON.parse(json);
    var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    var error = '';
    if(j.user == ""){
      error = "Campo usuario não pode ser vazio.";
    }else if(j.password == ""){
      error = "Campo senha não pode ser vazio.";
    }else if(!regexp.test(j.user)){
      error = "Email é inválido.";
    }else{
      if(j.user.length > 100){
        error = "Campo E-mail é muito longo.";
      }else if(j.password.length > 80){
        error = "Campo Senha é muito longo.";
      }
    }
    
    return error;

  }
}
