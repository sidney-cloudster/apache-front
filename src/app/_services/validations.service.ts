import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {
  public dataHoje = new Date();
  public diaHoje  = this.dataHoje.getDate();
  public mesHoje  = (this.dataHoje.getMonth()+1);
  public anoHoje  = this.dataHoje.getFullYear();
  
  constructor() { }

  /*
    VALIDAR CADASTRO
  */
  public registerValidation(v:any){
    var erroRetorno = "";
    var padrao = /^[A-zÀ-ú '´]+$/;
    
    if(v.email == ""){
      erroRetorno = "Campo email não pode ser vazio!";
    }else if(v.email.length > 100){
      erroRetorno = "O email é muito longo. No máximo 100 caracteres";
    }else if(v.senha == "" || v.csenha == ""){
      erroRetorno = "Campo senha não pode ser vazio.";
    }else if(v.senha != v.csenha){
      erroRetorno = "As senhas não se coincidem.";
    }else if(v.cpfcnpj.length <= 14){
      let valida_nome = v.nomeFisico.match(padrao);
      if(v.cpfcnpj == ""){
        erroRetorno = "O campo CPF não pode ser vazio.";
      }else if(v.cpfcnpj.length > 14 || v.cpfcnpj.length < 14){
        erroRetorno = "O CPF informado é inválido.";
      }else if(v.nomeFisico == ""){
        erroRetorno = "O campo nome não pode ser vazio.";
      }else if(!valida_nome){
        erroRetorno = "O campo nome contem caracteres inválidos.";
      }else if(v.nomeFisico.length > 80){
        erroRetorno = "O nome é muito longo. No máximo 80 caracteres.";
      }else if(v.sexo != "F" && v.sexo != "M"){
        erroRetorno = "Gênero escolhido é inválido.";
      }else if(v.nascimento == ""){
        erroRetorno = "O campo de data de nascimento não pode ser vazio.";
      }else if(v.nascimento != ""){
        var data = v.nascimento.split("/");
        let dia  = (data[0]);
        let mes  = (data[1]);
        let ano  = (data[2]);

        if(dia > 31 || dia <= 0){
          erroRetorno = "O dia escolhido é inválido.";
        }else if(mes > 12 || mes <= 0){
          erroRetorno = "O mês escolhido é inválido.";
        }else if(ano > this.anoHoje ||ano < 1900){
          erroRetorno = "O ano escolhido é inválido.";
        }
      }
    }else if(v.cpfcnpj.length > 14 && v.cpfcnpj.length <= 18){
      if(v.cpfcnpj == ""){
        erroRetorno = "O campo CNPJ não pode ser vazio.";
      }else if(v.cpfcnpj.length > 14 || v.cpfcnpj.length < 18){
        erroRetorno = "O CNPJ é inválido.";
      }else if(v.razao_social == ""){
        erroRetorno = "O campo razão sócial não pode ser vazio.";
      }else if(v.nome_fantasia == ""){
        erroRetorno = "O campo nome fantasia não pode ser vazio.";
      }
    }else{
      erroRetorno = "Selecione corretamente o tipo de conta (Fisica ou Jurídica)";
    }

    return erroRetorno;
  }
}
