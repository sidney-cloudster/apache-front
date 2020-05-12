import { Component, OnInit, Input } from '@angular/core';
import { MarketingService } from 'src/app/_services/marketing.service';

@Component({
  selector: 'app-banner-faixa-principal-baixo',
  templateUrl: './banner-faixa-principal-baixo.component.html',
  styleUrls: ['./banner-faixa-principal-baixo.component.css']
})
export class BannerFaixaPrincipalBaixoComponent implements OnInit {

  @Input() inputFaixa01;

  constructor(
    public sMarketingService: MarketingService
  ) { }

  ngOnInit() {
  }

  bannerClick(id:number,url:any){
    this.sMarketingService.clickBanner(id);
  }

}
