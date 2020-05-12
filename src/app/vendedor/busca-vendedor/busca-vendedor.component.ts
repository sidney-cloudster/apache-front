import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuscaService } from '../../_services/busca.service';
import { DadosService } from 'src/app/_services/dados.service';
@Component({
  selector: 'app-busca-vendedor',
  templateUrl: './busca-vendedor.component.html',
  styleUrls: ['./busca-vendedor.component.css']
})
export class BuscaVendedorComponent implements OnInit {
  
  public textoBusca:String; 
  public produtoLista:any = [];
  public nomeSellerUrl;
  public categoriaSeller;
  public descontoSeller;
  public preco;
  public qtdProdutos = 0;
  public paginaCarregada:boolean = false;
  public itemsPerPage:number = 16; // Produtos por página;
  public p:number = 1;
  public paginaNaoEncontrada:boolean = false;

  constructor(
    private router:ActivatedRoute,
    private sBusca:BuscaService,
    private sDados:DadosService
  ) {
    this.router.params.subscribe(dados => {
      this.paginaNaoEncontrada = false;
      this.textoBusca = dados.texto;
      if(this.textoBusca){
        
      
        this.sBusca.resultadoBusca(this.textoBusca).subscribe((r) =>{
          this.qtdProdutos  = r.products.length;
          if(r.products.length > 0){
            this.produtoLista = r.products;
            this.paginaCarregada = true;
          }
        },
        (error) => {
          this.paginaNaoEncontrada = true;
          this.paginaCarregada = true;
        });
      }
    });
  }
  
  public getLinkArray(urlBase,link:String){
    let u = urlBase.split("/");
    let v = link.split("/");
    let r = [];
    for(let i of u){
      r.push(i);
    }
    for(let l of v){
      r.push(l);
    }
    return r;
  }
  getEstrelaByProduto(qtdEstrela) {
    return this.sDados.getEstrelaAvaliacao(qtdEstrela);
  }
  ngOnInit() {
    
  }

}
