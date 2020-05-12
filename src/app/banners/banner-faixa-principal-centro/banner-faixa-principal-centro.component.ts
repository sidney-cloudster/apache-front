import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner-faixa-principal-centro',
  templateUrl: './banner-faixa-principal-centro.component.html',
  styleUrls: ['./banner-faixa-principal-centro.component.css']
})
export class BannerFaixaPrincipalCentroComponent implements OnInit {
  
  public imagemBanner = '../assets/img/banner-faixa-topo.gif';
  public bannerAtivo  = "T" // T = sim, F = nao
  public altText = 'Câmeras e Acessorios Cannon';
  public title   = 'Câmeras e Acessorios Cannon';
  public link    = '/user/minha-conta';
  constructor() { }

  ngOnInit() {
  }

}
