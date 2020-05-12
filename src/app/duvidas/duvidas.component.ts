import { Component, OnInit } from '@angular/core';
import { RequisicoesService } from '../_services/requisicoes.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-duvidas',
  templateUrl: './duvidas.component.html',
  styleUrls: ['./duvidas.component.css']
})
export class DuvidasComponent implements OnInit {
  private duvida:any = [];
  public rota;
  none: string;
  constructor(
    private sRequisicao:RequisicoesService,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.rota = params.duvida;
    });    
    this.sRequisicao.getInformacoes().subscribe( r =>{
      if(r.faq.length > 0){
        for(let faq of r.faq){
          this.setFaq(faq);
        }
      }
    },
    e =>{
      console.log("Erro ao buscar Informacoes",e);
    })
  }
  verInformacao(id){
    // console.log(id);
    // console.log($(".collapse").find("#duvida-"+id));
    $(".collapse").fadeOut(0);
    $("#duvida-"+id).slideDown("show");
    
    
  }

  private setFaq(info:any){

    this.duvida.push(info);
  }
  getFaq(){
    return this.duvida;
  }

  /*
    Entrada ex: Formas de Pagamento
    Saida   ex: formas-de-pagamento
  */
  getTituloHTML(info){
    let palavra:any = '';
    let com_acento = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
    let sem_acento = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
    let novastr="";
    for(let i = 0; i < info.length; i++){
      palavra += info[i].replace(" ","-");
    }
    
    palavra = palavra.toLowerCase();

    for(let i = 0; i < palavra.length; i++) {
      let troca = false;
      for (let a = 0; a < com_acento.length; a++) {
        if (palavra.substr(i,1)==com_acento.substr(a,1)) {
          novastr+=sem_acento.substr(a,1);
          troca=true;
          break;
        }
      }
      if (troca==false) {
        novastr+=palavra.substr(i,1);
      }
    }
    return novastr;

  }
}
