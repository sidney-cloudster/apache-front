import { Component, OnInit, Input } from '@angular/core';
import { MarketingService } from 'src/app/_services/marketing.service';

@Component({
  selector: 'app-banner-faixa-principal',
  templateUrl: './banner-faixa-principal.component.html',
  styleUrls: ['./banner-faixa-principal.component.css']
})
export class BannerFaixaPrincipalComponent implements OnInit {

  @Input() inputFaixaPrincipal;
  constructor(
    public sMarketingService: MarketingService
  ) { }

  ngOnInit() {
  }

  bannerClick(id:number,url:any){
    this.sMarketingService.clickBanner(id);
  }
}
