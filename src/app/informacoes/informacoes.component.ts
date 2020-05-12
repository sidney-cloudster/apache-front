import { Component, OnInit } from '@angular/core';
import { RequisicoesService } from '../_services/requisicoes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfiguracaoService } from '../_services/configuracao.service';
import { Title } from '@angular/platform-browser';
import { MarketingService } from '../_services/marketing.service';
@Component({
  selector: 'app-informacoes',
  templateUrl: './informacoes.component.html',
  styleUrls: ['./informacoes.component.css']
})
export class InformacoesComponent implements OnInit {

  private informacoes:any = [];
  public rota;
  constructor(
    private sRequisicao:RequisicoesService,
    private route:ActivatedRoute,
    private sConfiguracao: ConfiguracaoService,
    private title: Title,
    private sMarketingService: MarketingService
  ) { }

  ngOnInit() {   
    this.route.params.subscribe(params => {
      this.rota = params.info;
      var str      = this.rota;
      var str_rota = str.replace(/-/g, "");
      this.sConfiguracao.getInformacoes().subscribe(x=>{
        if(x.informacao.length > 0){
          for(let inf of x.informacao){
            var titulo = inf.titulo;
            var str_format = this.sMarketingService.removeAcento(inf.titulo);
            var str_titulo = this.sMarketingService.removeEspaco(str_format);
            var nome_loja  = this.sMarketingService.primeiraLetraMaiuscula(x.nome_loja);
            if(str_titulo === str_rota){
              this.title.setTitle(titulo + " - " + nome_loja); 
            }
          }
        }  
      });
    });    
    this.sRequisicao.getInformacoes().subscribe( r =>{
      if(r.informacao.length > 0){
        for(let inf of r.informacao){
          this.setInformacoes(inf);
        }
      }
    },
    e =>{
      console.log("Erro ao buscar Informacoes",e);
    })
  }

  verInformacao(id){
    $(".tab-content").find(".tab-pane").removeClass("show active");
    $(".tab-content").find("#info-"+id).addClass("show active");
  }

  private setInformacoes(info:any){

    this.informacoes.push(info);
  }
  getInformacoes(){
    return this.informacoes;
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
