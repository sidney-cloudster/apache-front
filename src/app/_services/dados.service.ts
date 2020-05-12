import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { ProdutoService } from './produto.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DadosService {
  public cepFormat = '99999-999';
  public customer;
  
  
  constructor(
    private user: UserService,
    private sProduto: ProdutoService
  ) { 
    this.customer    = this.user.currentUserValue; 
  }

  public getSlug(titleProduct:any){
    var lower = titleProduct.toLowerCase();
    var slug  = lower.replace(/ /g,"-");
    slug.replace(/[\u0300-\u036f]/g, "");
    return slug;
  }

  public getEstrelaAvaliacao(quantidade:any){
    var estrela    = "";
    var maxEstrela = 5;
    for(var i = 1; i <= maxEstrela;i++){
      if(i <= quantidade){
        estrela += '<i class="uip-estrela-1"></i>';
      }else{
        estrela += '<i class="uip-estrela-3"></i>';
      }
    }
    return estrela;
  }
  
  public removerValoresDuplicados(originalArray, prop) {
    var newArray = [];
    var lookupObject  = {};

    for(var i in originalArray) {
       lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
     return newArray;
  }

  public getAlerta(strongMsg,msg,type){
    let html = '';
    html = '<div class="alert alert-'+type+' alert-dismissible fade show" role="alert">';
    html += ' <strong>'+strongMsg+'</strong> '+msg+'';
    html += '</div>';         
    return html;
  }
  
  public dataBrToUsa(data:any){
    let dia,mes,ano,aux = data.split("/");
    if(data.includes("/")){
      aux = data.split("/");
      dia = parseFloat(aux[0]);
      mes = parseFloat(aux[1]);
      ano = parseFloat(aux[2]);
      return ano+"-"+mes+"-"+dia;
    }
  }

  formataPreco(valor){
    let v = valor.split(".");
    return v[0];
  }
  formataPrecoCentavos(valor){
    let v = valor.split(".");
    return v[1];
  }

  public order(array,type){
    if(type == 'maior'){
      for (var i = 1; i < array.length; i++){
        for (var j = 0; j < i; j++){
          if (array[i].valor > array[j].valor) {
            var x    = array[i];
            array[i] = array[j];
            array[j] = x;
          }
        }
      }
    }else{
      for (var i = 1; i < array.length; i++){
        for (var j = 0; j < i; j++){
          if (array[i].valor < array[j].valor) {
            var x    = array[i];
            array[i] = array[j];
            array[j] = x;
          }
        }
      }
    }
    return array;
  }

  objetoIsEmpty(obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop)) {
        return false;
      }
    }
    return JSON.stringify(obj) === JSON.stringify({});
  }

  validHour(hora:any){
    let today = new Date();
    let hoje = {
      hora:today.getHours(),
      minuto:today.getMinutes(),
      segundos:today.getSeconds()
    }
    let horas = 0,
        minuto = 0;
    let aux;
    if(hora.includes(":")){
      aux    = hora.split(":");
      horas  = parseFloat(aux[0]);
      minuto = parseFloat(aux[1]);
    }else{
      horas  = parseFloat(hora[0]+hora[1]);
      minuto = parseFloat(hora[2]+hora[3]);
    }
    console.log(hoje);
    if((horas > 23 || horas < 0) && (horas <= hoje.hora && minuto < hoje.minuto)){
      return false;
    }
    if(minuto > 59 || minuto < 0){
      return false;
    }
    return true;
  }
  validDate(data:any,isAgendamento:boolean = false,hour:any = ''){
    let date = new Date();
    let hoje = {
      dia:date.getDate(),
      mes:(date.getMonth() + 1),
      ano:date.getFullYear()
    }
    let dia = 0,mes = 0,ano = 0;
    let aux;
    
    if(data.includes("/")){
      aux = data.split("/");
      dia = parseFloat(aux[0]);
      mes = parseFloat(aux[1]);
      ano = parseFloat(aux[2]);
    }else if(data.includes("-")){
      aux = data.split("-");
      dia = parseFloat(aux[2]);
      mes = parseFloat(aux[1]);
      ano = parseFloat(aux[0]);
    }else{
      dia = parseFloat(data[0]+data[1]);
      mes = parseFloat(data[2]+data[3]);
      ano = parseFloat(data[4]+data[5]+data[6]+data[7]);
    }

    if(isAgendamento){
      if((ano >= hoje.ano) && ano <= 2100){
        if((dia > 31 || dia <= 0) || ((dia < hoje.dia && mes <= hoje.mes) || (hour != '' && (dia == hoje.dia && mes == hoje.mes) && !this.validHour(hour)))){
          return false
        }
        if((mes > 12 || mes <= 0) || (mes < hoje.mes && ano <= hoje.ano)){
          return false;
        }
      }else{
        return false;
      }
    }else{
      if((dia > 31 || dia <= 0)){
        return false;
      }
      if(mes > 12 || mes <= 0){
        return false;
      }
      if(ano > 2100 || ano <= 1950){
        return false;
      }
    }
    return true;
  }

  validAddress(endereco:any){

  }
  
  isFavorito(id:number){
    let fav;
    if(fav = localStorage.getItem('favoritosId')){
      try {
        let f = JSON.parse(fav);
        let ids = f.favoritosId;
        if(ids.length > 0){
          for(let idFav of ids){
            if(idFav === id){
              return true;
            }
          }
        }
      } catch (error) {
          return false
      }
    }
    return false;
  }
}
