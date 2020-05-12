import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produto-box',
  templateUrl: './produto-box.component.html',
  styleUrls: ['./produto-box.component.css']
})
export class ProdutoBoxComponent implements OnInit {

  constructor() { }
  carouselProduto = {
    margin: 0,
    nav: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 1,
        nav: true
      },
      1000: {
        items: 1,
        nav: true,
        loop: false
      },
      1500: {
        items: 1,
        nav: true,
        loop: false
      }
    }
  }
  imagesProduto = [
    {
      image:"../assets/img/295.jpg"
    },
    {
      image:"../assets/img/295b.jpg"
    },
    {
      image:"../assets/img/295c.jpg"
    },
  ]
  ngOnInit() {
  }

}
