import { Component, OnInit, Input } from '@angular/core';
import { MarketingService } from 'src/app/_services/marketing.service';

@Component({
  selector: 'app-banner-header',
  templateUrl: './banner-header.component.html',
  styleUrls: ['./banner-header.component.css']
})
export class BannerHeaderComponent implements OnInit {

  @Input() inputHeader;
  constructor(
    public sMarketingService: MarketingService
  ) { }

  ngOnInit() {
  }
  
  bannerClick(id:number,url:any){
    this.sMarketingService.clickBanner(id);
  }

}
