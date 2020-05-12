import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CasamentoService } from 'src/app/_services/_casamento/casamento.service';
import { configGeral } from '../../../environments/environment';

@Component({
  selector: 'app-minha-lista',
  templateUrl: './minha-lista.component.html',
  styleUrls: ['../casamento.component.css']
})
export class MinhaListaComponent implements OnInit {

  // Variáveis
  public customer: any; // Usuário
  public count: number = 0;; // Contador de Produtos adicionados na lista
  public produtos:any = [];
  public images = [];
  public config: any = {
    itemsPerPage: configGeral.paginacao.quantidadeItem,
    currentPage: configGeral.paginacao.paginaIniciada,
    totalItems: 0
  };
  public collection = { count: 0, data: [] }
  public searchText;
  public arrayCat: string;
  public arrayPrecos: string;
  public arrayFilter: [];
  public json;
  public id_lista;
  // Construtor
  constructor(
    private sUser: UserService,
    private sCasamento: CasamentoService,
    private sRouter: Router,
    private sCookieService: CookieService, 
    public HttpClient: HttpClient) {
    
  }
  public maxSize: number = 12;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
    previousLabel: '<',
    nextLabel: '>',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };
  // Inicializador
  ngOnInit() {
    this.customer = this.sUser.getCustomer();
    this.id_lista = this.sCookieService.get("id_lista");
    this.sCasamento.getListProducts(this.customer.cpfCnpj).subscribe(r => {
      // this.produtos= r.products;
      this.count = this.produtos.length;
      for (let i = 0; i < r.products.length; i++) {
        this.images.push(r.products[i]);
        this.produtos.push(r.products[i]);
      }

      this.config = {
        itemsPerPage: 12,
        currentPage: 1,
        totalItems: this.produtos.length
      };
    })
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  deleteProduct(id: number, nome: string) {
    /* Swal.fire({
      title: 'Deseja realmente remover o produto ' + nome + ' de sua lista?',
      icon: 'warning',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Sim!',
      cancelButtonText:
        '<i class="fa fa-thumbs-down"></i> Não!',
    }) */
    this.sCasamento.deleteProductFromList(id).subscribe(r => {
      Swal.fire({
        icon: 'success',
        title: 'Removido!',
        text: 'Produto foi removido com sucesso de sua lista!',
      })
    })
  }

  deleteAllProduct(id: number) {
    /* Swal.fire({
      title: 'Deseja realmente remover o produto ' + nome + ' de sua lista?',
      icon: 'warning',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Sim!',
      cancelButtonText:
        '<i class="fa fa-thumbs-down"></i> Não!',
    }) */
    this.sCasamento.deleteAll(id).subscribe(r => {
      Swal.fire({
        icon: 'success',
        title: 'Removido!',
        text: 'Todos os produtos foram removidos da lista!',
      })
      this.sRouter.navigate(['casamento/painel']);
    })
  }

}
