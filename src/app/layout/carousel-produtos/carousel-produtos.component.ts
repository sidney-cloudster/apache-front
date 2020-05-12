import { Component, OnInit,Input } from '@angular/core';
import { DadosService } from '../../_services/dados.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { UserService } from 'src/app/_services/user.service';
import { ProdutoService } from 'src/app/_services/produto.service';
import Swal from 'sweetalert2';
import {NgProgress, NgProgressRef} from 'ngx-progressbar';
import { MatSnackBar } from '@angular/material';
import { FavoriteService } from 'src/app/_services/favorite.service';

@Component({
  selector: 'app-carousel-produtos',
  templateUrl: './carousel-produtos.component.html',
  styleUrls: ['./carousel-produtos.component.css']
})
export class CarouselProdutosComponent implements OnInit {

  @Input() inputTitulo:any;
  @Input() inputProdutos:any;
  @Input() inputItem;
  @Input() inputQuantidadeItens:any;
  progressBar: NgProgressRef;


  carouselConfig: OwlOptions;
  constructor(
    private sDados:DadosService,
    private sUser:UserService,
    private sProduto:ProdutoService,
    private NgProgress: NgProgress,
    private _snackBar:MatSnackBar,
    private sFavorito: FavoriteService
    ) {
    
  }

  getIconesEstrela(qtdEstrelas){
    return this.sDados.getEstrelaAvaliacao(qtdEstrelas);
  }
  ngOnInit() {
    this.progressBar = this.NgProgress.ref('carrousselProgressBar')
    this.carouselConfig = {
      loop: false,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      autoWidth: true,
      navText: ['<span class="material-icons">chevron_left</span>', '<span class="material-icons">chevron_right</span>'],
      responsive: {
        0: {
          items: this.inputQuantidadeItens[0],
          margin: 6
        },
        600: {
          items: this.inputQuantidadeItens[1],
          margin: 6
        },
        780: {
          items: this.inputQuantidadeItens[2],
          margin: 6
        },
        1000: {
          items: this.inputQuantidadeItens[3],
          margin: 4
        },
        1500: {
          items: this.inputQuantidadeItens[4],
        }
      },
      nav: true
    }
  }

  adicionarFavoritos(id:number){
    return this.sFavorito.addFavorito(id);
  }

  verificaFavorito(id:number){
    return this.sDados.isFavorito(id);
  }

   // ADICIONA PRODUTO AOS FAVORITOS
   addFavorito(id) {
    this.progressBar.start();
    this.sUser.checkLogin();
    let user = this.sUser.getCustomer();
    let json = { 'cpfCnpj': user.cpfCnpj, 'id': id };
    if(user.plataform == 'site' && (user.cpfCnpj.length == 11 || user.cpfCnpj.length == 14)){
      this.sProduto.adicionarFavorito(json).subscribe(l => {
        if(l.Code == "success"){
          // Swal.fire("","Produto adicionado aos favoritos.","success");
          this._snackBar.open('Produto adicionado aos favoritos!', 'OK', {duration: 2000});
          this.progressBar.complete();
        }
      },
      e =>{
        Swal.fire("Ops!","Houve um erro ao tentar adicionar o produto aos favoritos.","error");
      });
    }else if(user.plataform == 'facebook' || user.plataform == 'google'){
      Swal.fire("Ops!","Para adicionar aos favoritos você precisa cadastrar seu CPF ou CNPJ.","warning");
    }
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
