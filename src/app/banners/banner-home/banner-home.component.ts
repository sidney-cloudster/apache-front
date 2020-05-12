import { Component, OnInit, Input } from '@angular/core';
import { MarketingService } from '../../_services/marketing.service'
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-banner-home',
  templateUrl: './banner-home.component.html',
  styleUrls: ['./banner-home.component.css']
})
export class BannerHomeComponent implements OnInit {

  @Input() inputBannerHomeCentro;
  @Input() inputResponsive;

  public carrossel:OwlOptions;
  
  constructor(
    public sMarketingService:MarketingService
  ) { }

  ngOnInit() {
    this.carrossel = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      autoplay:true,
      autoplayHoverPause:true,
      autoplayTimeout:8000,
      dots: true,
      navSpeed: 700,
      navText: ['<span class="material-icons">chevron_left</span>', '<span class="material-icons">chevron_right</span>'],
      responsive: {
        0: {
          items: this.inputResponsive[0]
        },
        600: {
          items: this.inputResponsive[1]
        },
        1000: {
          items: this.inputResponsive[2]
        },
        1500: {
          items: this.inputResponsive[3]
        }
      },
      nav: true
    }
  }

  bannerClick(id:number,url:any){
    this.sMarketingService.clickBannerPage(id);
  }

}
