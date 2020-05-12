import { Component, OnInit } from '@angular/core';
import { IndexService } from '../_services/index.service';
import { Title, Meta } from '@angular/platform-browser';
import { MarketingService } from '../_services/marketing.service';
import { ConfiguracaoService } from '../_services/configuracao.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public paginaCarregada: boolean = false;

  // BANNERS
  public topo:any;
  public central:any;
  public centralResponsive:any = [1,1,1,1]
  public faixaprincipal:any;
  public faixa1:any;
  public faixa2:any;
  public faixa3:any;
  public faixa4:any;
  public faixa5:any;

  // ITEM_1
  public item_pre1_titulo:any;
  public item_pre1_produtos:any;
  public item_pre1_tipo:any;
  public item_pre1Responsive:any = [2,3,3,5,5];

  // ITEM_2
  public item_pre2_titulo:any;
  public item_pre2_produtos:any;
  public item_pre2_tipo:any;
  public item_pre2Responsive:any = [2,3,3,5,5];
  constructor(
    private sIndex:IndexService,
    private meta: Meta,
    public sMarketingService: MarketingService) { 

      this.sIndex.getHomePage().subscribe(r=>{
        const tags = [
          { name: 'description', content: r.metatag},
          { name: 'keywords',    content: r.keyword},
        ];        
        tags.forEach(tag => this.meta.updateTag(tag));
        
        var imagem_banner:any;  
        if(r.banner.central[0] !== "" && r.banner.central[0] !== undefined) {
          imagem_banner = r.banner.central[0].image;    
        }else{
          imagem_banner = "Imagem não cadastrada!";
        }
        this.sMarketingService.openGraph(r.banner.central[0].descricao,imagem_banner);   

        if(r.banner != ''){
          this.setTopo(r.banner.topo);
          this.setCentral(r.banner.central);
          this.setFaixaprincipal(r.banner.faixaprincipal);
          this.setFaixa1(r.banner.faixa1);
          this.setFaixa2(r.banner.faixa2);
          this.setFaixa3(r.banner.faixa3);
          this.setFaixa4(r.banner.faixa4);
          this.setFaixa5(r.banner.faixa5);
          this.paginaCarregada = true;
        }
        if(r.componentes != ''){
          this.setItempre1(r.componentes.item_pre1);
          this.setItempre2(r.componentes.item_pre2);
        }
      },
      e=>{
  
      })
    }
  private setTopo(topo:any){this.topo = topo;}
  private setCentral(central:any){this.central = central;}
  private setFaixaprincipal(faixaprincipal:any){this.faixaprincipal = faixaprincipal;}
  private setFaixa1(faixa1:any){this.faixa1 = faixa1;}
  private setFaixa2(faixa2:any){this.faixa2 = faixa2;}
  private setFaixa3(faixa3:any){this.faixa3 = faixa3;}
  private setFaixa4(faixa4:any){this.faixa4 = faixa4;}
  private setFaixa5(faixa5:any){this.faixa5 = faixa5;}

  private setItempre1(item_pre1:any){
    this.item_pre1_titulo   = item_pre1.titulo;
    this.item_pre1_produtos = item_pre1.products;
    this.item_pre1_tipo     = item_pre1.tipo;    
  }
  private setItempre2(item_pre2:any){
    this.item_pre2_titulo   = item_pre2.titulo;
    this.item_pre2_produtos = item_pre2.products;
    this.item_pre2_tipo     = item_pre2.tipo;
  }
  public getTopo(){return this.topo;}
  public getCentral(){return this.central;}
  public getFaixaprincipal(){return this.faixaprincipal;}
  public getFaixa1(){return this.faixa1;}
  public getFaixa2(){return this.faixa2;}
  public getFaixa3(){return this.faixa3;}
  public getFaixa4(){return this.faixa4;}
  public getFaixa5(){return this.faixa5;}

  ngOnInit() {}
}