import { Component, OnInit, Input } from '@angular/core';
import { MarketingService } from 'src/app/_services/marketing.service';

@Component({
  selector: 'app-banner-topo',
  templateUrl: './banner-topo.component.html',
  styleUrls: ['./banner-topo.component.css']
})
export class BannerTopoComponent implements OnInit {

  @Input() inputBannerTopo;

  constructor(public sMarketingService: MarketingService){}

  ngOnInit(){}

  bannerClick(id:number){
    this.sMarketingService.clickBanner(id);
  }

}
