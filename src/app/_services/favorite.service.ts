import { Injectable, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { ProdutoService } from './produto.service';
import { UserService } from './user.service';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { NgProgressRef, NgProgress } from 'ngx-progressbar';
@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  public customer;
  public isFavorite:boolean = false;
  public produto;
  private localStorageSessao  = 'favoritosId';
  progressBar: NgProgressRef;
  public qtdFavorito:any = 0;

  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: any, 
    private toastr:ToastrService,
    private sProduto:ProdutoService,
    private sUser:UserService,
    private cookieService: CookieService,
    private NgProgress: NgProgress ) {
      this.customer = this.sUser.getCustomer();
      this.progressBar = this.NgProgress.ref('categoriaBar');
    }


  public setFavoritos(){
    var i;
    var idListaFavoritos:any = [];
    var verificaLogin        = this.sUser.checkLogin();
    this.customer            = this.sUser.currentUserValue; 

    if(verificaLogin == true){
      let json;
      json = {
        cpf: this.customer.cpfCnpj,
        favoritosId:[]
      };

      this.sProduto.listaFavoritos(this.customer.cpfCnpj).subscribe(
        r => {
          if (r.length > 0){
            for (i = 0; i < r.length; i++) {
              idListaFavoritos.push(r[i].id);
            }
            json.favoritosId = idListaFavoritos;
            localStorage.setItem(this.localStorageSessao,JSON.stringify(json));      
          }
        }
      )
    }
  }

  public contaFavoritos(){
    var verificaLogin = this.sUser.checkLogin();
    var contaFavoritos:any;
    contaFavoritos = localStorage.getItem('favoritosId');

    if((verificaLogin == true) && (contaFavoritos !== null)){
      contaFavoritos = JSON.parse(localStorage.getItem('favoritosId'));
      contaFavoritos = contaFavoritos['favoritosId'].length;

      if(contaFavoritos > 0 ){
        this.qtdFavorito = contaFavoritos;
      }else{
        this.qtdFavorito = 0;
      } 
    }else{
      this.qtdFavorito = 0;
    }
    return this.qtdFavorito;
  }

  public addFavorito(id) {
    this.progressBar.start();
    var verificaLogin = this.sUser.checkLogin();
    var i;
    var contaFavoritos = 0;
    let json = { 'cpfCnpj': this.sUser.getCustomer().cpfCnpj, 'id': id };
    this.progressBar.start();
    
    
    if(verificaLogin == true){

      this.sProduto.listaFavoritos(this.customer.cpfCnpj).subscribe(
        r => {
          if (r.length > 0){
            for (i = 0; i < r.length; i++) {
              if(r[i].id == id){
                contaFavoritos += 1;
              }
            }
          }
        
          if(contaFavoritos == 0){
            this.sProduto.adicionarFavorito(json).subscribe(l =>
              this.sProduto.getProduto(id).subscribe(r => {
                Swal.fire({
                  icon: 'success',
                  title: 'Adicionado!!!',
                  text: r[0].nome + ' adicionado aos seus favoritos!'
                });
                this.progressBar.complete();
              })
            )
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops!!!',
              text: 'Produto já foi adicionado aos seus favoritoss!'
            });
          }
      },
      e => {
        console.log("Não tem Favoritos add!")
        }
      )
    } else{
      Swal.fire({
          icon: 'error',
          title: 'Oops!!!',
          text: 'Faça o login para adicionar o produto aos seus favoritos!'
      });
        // this.router.navigate(['/user/login']);
    }
  }

  public deleteFavorite(id,nome){
    this.sProduto.deletarFavorito(id).subscribe(
      r => {
        Swal.fire({
          icon: 'success',
          title: 'Removido.',
          text: 'O produto ' + nome + ' foi removido dos seus favoritos.',
          showConfirmButton: false,
        })
        setTimeout(function () {
          this.window.location.reload();
        }, 1500)
      }
    )
    
  }
}
