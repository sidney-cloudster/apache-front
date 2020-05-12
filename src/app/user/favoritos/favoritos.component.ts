import { Component, OnInit, SimpleChanges, Inject } from '@angular/core';
import { FavoriteService } from '../../_services/favorite.service';
import { UserService } from 'src/app/_services/user.service';
import { ProdutoService } from 'src/app/_services/produto.service';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { WINDOW } from '@ng-toolkit/universal';


@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  public itemsPerPage = 6; // Produtos por página;
  public p: number = 1;
  public customer;
  public favoritos;
  public produtosFavorito;
  public favoritosCarregado:boolean = false;

  constructor(
    @Inject(WINDOW) private window: Window,
    private user: UserService,
    private sFavorite: FavoriteService,
    private produto: ProdutoService, 
    private cookieService: CookieService, 
    private router: Router) {

    this.customer = this.user.currentUserValue;
  }

  ngOnInit() {
    this.cookieService.set('favoritos_count', '0');
    this.produto.listaFavoritos(this.customer.cpfCnpj).subscribe(
      r => {
        this.produtosFavorito = r;
        this.favoritosCarregado = true;
        this.cookieService.set('favoritos_count', r.length);
      },
      (err) => { 
        this.favoritosCarregado = true;
        this.produtosFavorito = '';
      })
      
  }
  
  public listaFavorito(){
    this.produto.listaFavoritos(this.customer.cpfCnpj).subscribe(
      r => {
        this.produtosFavorito = r;
        this.cookieService.set('favoritos_count', r.length);
      }
    )
  }

  public removerFavorito(id: string, nome: string) {
    this.sFavorite.deleteFavorite(id,nome);

  }

  public getLinkArray(urlBase,link:String){
    let v = link.split("/");
    let r = [urlBase];
    for(let l of v){
      r.push(l);
    }
    return r;
  }
  onSubmit() {
    
  }

}
