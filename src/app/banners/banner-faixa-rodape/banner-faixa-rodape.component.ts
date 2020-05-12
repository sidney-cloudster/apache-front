import { Component, OnInit, Input } from '@angular/core';
import { MarketingService } from 'src/app/_services/marketing.service';

@Component({
  selector: 'app-banner-faixa-rodape',
  templateUrl: './banner-faixa-rodape.component.html',
  styleUrls: ['./banner-faixa-rodape.component.css']
})
export class BannerFaixaRodapeComponent implements OnInit {
   
   @Input() inputFaixa02;

   carrosselCategoria = {
    margin: 0,
    nav: true,
    navText: ['<i class="fas fa-angle-left"></i>','<i class="fas fa-angle-right"></i>'],
    responsiveClass: true,
    responsive: {
      0: {
        items: 2,
        nav: ''
      },
      600: {
        items: 3,
        nav: ''
      },
      1000: {
        items: 5,
        nav: true,
        loop: false
      },
      1500: {
        items: 5,
        nav: true,
        loop: false
      }
    }
  }
  constructor(
    private sMarketingService: MarketingService
  ) { }

  ngOnInit() {
  }
  
  bannerClick(id:number,url:any){
    this.sMarketingService.clickBanner(id);
  }

  public getLinkArray(urlBase,link:String){
    let v = link.split("/");
    let r = [urlBase];
    for(let l of v){
      r.push(l);
    }
    return r;
  }
  
}
