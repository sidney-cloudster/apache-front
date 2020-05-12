import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CasamentoService } from 'src/app/_services/_casamento/casamento.service';

@Component({
  selector: 'app-adicionar-produtos',
  templateUrl: './adicionar-produtos.component.html',
  styleUrls: ['../casamento.component.css']
})
export class AdicionarProdutosComponent implements OnInit {

  private consumer;
  public array;
  public images = [];
  public config: any;
  public collection = { count: 0, data: [] }
  public searchText;
  public arrayCat: string;
  public arrayPrecos: string;
  public arrayFilter: [];
  public json;
  public array_range;
  public loading = false;
  public paginaCarregada:boolean = false;
  public naoEncontrado:string = '';
  constructor(
    private sUser: UserService,
    private sCasamento: CasamentoService,
    public HttpClient: HttpClient) {
    this.consumer = this.sUser.getCustomer();
  }

  public maxSize: number = 12;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
    previousLabel: '',
    nextLabel: '',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };

  ngOnInit() {
    this.paginaCarregada = false;
    this.consumer = this.sUser.getCustomer();
    this.sCasamento.getListaProduto().subscribe(r => {
      this.array = r.products;
      for (let index = 0; index < this.array.length; index++) {
        this.images.push(this.array[index]);
        this.collection.data.push(this.array[index]);
        this.collection.count = this.array.length;
      }

      this.config = {
        itemsPerPage: 12,
        currentPage: 1,
        totalItems: this.collection.count
      };
      this.paginaCarregada = true;
      this.naoEncontrado   = '';
    },
    e=>{
      this.paginaCarregada = true;
      this.naoEncontrado   = 'Nao encontrado';
    })

    this.sCasamento.getListCat().subscribe(c => {
      this.arrayCat = c.categorias;
      this.arrayPrecos = c.faixa_precos;
    })

  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  viewCat(cat: string) {
    this.searchText = cat;
  }

  rangePrice(inicial: string, final: string) {
    this.searchText = '';
    this.arrayFilter = [];
    this.collection.data = [];
    var span = document.getElementById("rangePreco");
    span.textContent = "R$ " + inicial + " até " + "R$ " + final;
    this.sCasamento.getListaProduto().subscribe(r => {
      this.array = r.products;
      for (let index = 0; index < this.array.length; index++) {
        if (this.array[index].preco >= inicial && this.array[index].preco <= final) {
          this.array_range = this.array[index];
          this.collection.data.push(this.array[index]);
          this.collection.count = this.array_range.length;
          this.config = {
            itemsPerPage: 12,
            currentPage: 1,
            totalItems: this.collection.count
          };
        }
      }
    })
  }

  saveProduct(sku: string) {
    this.json = {
      'sku': sku,
      'cpf': this.sUser.getCustomer().cpfCnpj
    }
    this.sCasamento.saveProductToList(this.json).subscribe(r => {
      Swal.fire({
        icon: 'success',
        title: 'Oba...',
        text: 'Produto adicionado na sua lista de casamento!',
      })
    }, (err) => { console.log(err) });
  }

}
