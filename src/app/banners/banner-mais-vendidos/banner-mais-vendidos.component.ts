import { Component, OnInit, Input } from '@angular/core';
import { FavoriteService } from '../../_services/favorite.service';
@Component({
  selector: 'app-banner-mais-vendidos',
  templateUrl: './banner-mais-vendidos.component.html',
  styleUrls: ['./banner-mais-vendidos.component.css']
})
export class BannerMaisVendidosComponent implements OnInit {
  /****************************MAIS VENDIDOS***************************/
  public carouselOptionsMaisVendidos = {
    margin: 0,
    nav: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: ''
      },
      600: {
        items: 2,
        nav: ''
      },
      1000: {
        items: 3,
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
  public produto;
  public valorAvista;
  public valorAnterior;
  public nomeProduto;
  public descontoBoleto;
  public parcelaMax;
  public valorParcela;
  public produtoFavorito;

  @Input() dados;
  constructor(private favorito:FavoriteService) {
    
  }
  ngOnInit() {
  }

}
