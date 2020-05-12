import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DadosService } from '../../_services/dados.service';
import { VendedorService } from '../../_services/vendedor.service';
import { LojistaService } from '../../_services/lojista.service';
import {configGeral}  from '../../../environments/environment';
import { FavoriteService } from 'src/app/_services/favorite.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  public itemsPerPage = configGeral.paginacao.quantidadeItem;
  public p: number = configGeral.paginacao.paginaIniciada;
  nomeSellerUrl: string;
  public naoEncontrado;
  public dadosSeller:any;
  public produtosSeller:string;
  public nomeSeller:string;
  public categoriaSeller:string;
  public descontoSeller:string;
  
  public sellername;
  public parametros;
  public array;
  public link;
  public nomeLoja:string;
  public produtos:any = [];
  public categoriaView  = [];
  public filtrosAplicadosView;
  public produtoView;
  public filtrosView = [];
  public produto = [];
  public paginaCarregada:boolean = false;
  public tiposFiltros = [
    { referencia:'c', descricao:'Categoria'},
    { referencia:'d', descricao:'Descontos'},
    { referencia:'e', descricao:'Avaliação'},
    { referencia:'p', descricao:'Preço'},
    { referencia:'o', descricao:'Ordenação'}
  ]
  public estrelaAvaliacao = [
    {ref : 'e',nome: '5 Estrelas',qtdEstrela : 5},
    {ref : 'e',nome: '4 Estrelas',qtdEstrela : 4},
    {ref : 'e',nome: '3 Estrelas',qtdEstrela : 3},
    {ref : 'e',nome: '2 Estrelas',qtdEstrela : 2},
    {ref : 'e',nome: '1 Estrelas',qtdEstrela : 1},
  ]
  public ordernacaoPreco = [
    {ref : 'o',nome: 'Maior valor'},
    {ref : 'o',nome: 'Menor valor'}
  ]
  public rota:any;
  public rotaBase:any;
  public vendedor;
    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private sDados: DadosService,
      private sLojista:LojistaService,
      private sVendedor:VendedorService,
      private sFavorito: FavoriteService) {
      this.vendedor = this.sVendedor.getVendedor();
    }
    ngOnInit() {
      this.route.params.subscribe(params => {      
        // if(params.sellername.length > 0){
          this.sLojista.getSeller('gazin').subscribe(
            (r) => {

            this.parametros = params;
            this.sellername = 'gazin';
            this.rotaBase   = ['/vendedor','produtos'];
            this.nomeLoja   = r.nomeLoja;
  
            this.link = [];
            this.produto = [];
            this.filtrosView = [];
            
            if(params.ref1 && params.ref1 != ''){
              this.link.push(""+params.ref1+"/"+params.val1+"");
            }
            if(params.ref2 && params.ref2 != ''){
              this.link.push(""+params.ref2+"/"+params.val2+"");
            }
            if(params.ref3 && params.ref3 != ''){
              this.link.push(""+params.ref3+"/"+params.val3+"");
            }
            if(params.ref4 && params.ref4 != ''){
              this.link.push(""+params.ref4+"/"+params.val4+"");
            }
            if(params.ref5 && params.ref5 != ''){
              this.link.push(""+params.ref5+"/"+params.val5+"");
            }
            
              if (r.produtos.length > 0) {
                r.produtos.forEach((v, k) => {
                  this.produto.push(v);
                });
              }
              if(r.categorias.length > 0){
                this.categoriaView = [];
                for(let categoria of r.categorias){ 
                  this.categoriaView.push(categoria);
                  for(let subcategoria of categoria.subcategoria){
                    this.filtrosView.push({tipo:'subcategoria',ref:'c',descricao:subcategoria.categoria,valor:this.trataValor(subcategoria.categoria),id:categoria.idCategoria})
                  }
                }
              }
              if(r.desconto.length > 0){
                for(let desconto of r.desconto){ 
                  this.filtrosView.push({tipo:'desconto',ref:'d',descricao:desconto.descricao,valor:desconto.percentual_minimo+'-'+desconto.percentual_maximo})
                }
              }
              if(r.preco.length > 0){
                for(let preco of r.preco){ 
                  this.filtrosView.push({tipo:'preco',ref:'p',descricao:preco.valor,valor:preco.inicial+'-'+preco.final})
                }
              }
              for(let op of this.ordernacaoPreco){ 
                this.filtrosView.push({tipo:'ordenar',ref:'o',descricao:op.nome,valor:this.trataValor(op.nome)});
              }
              for(let estrela of this.estrelaAvaliacao){
                this.filtrosView.push({tipo:'estrela',ref:'e',descricao:estrela.nome,valor:this.trataValor(estrela.nome)})
              }
              this.setNomeLoja(r.nomeLoja);
            },
            e => {
              // ERRO AO BUSCAR SELLER
            },
            () => {
              
              this.filtrosAplicadosView = this.getFiltroView();
              this.produtoView          = this.produto;
              this.setCheckFiltrosAplicados();
              let p_valor;
              let i = 0;
              let filtroPush     = [];
              let categoriaPush  = [];
              let produtoFiltro = [];
  
              if(this.filtrosAplicadosView.length > 0){
                let filtroCategoriaAcumulado = this.filtroAcumulado(this.filtrosAplicadosView,'c');
                for(let fa of this.filtrosAplicadosView){
                  //PRODUTO
                  if(fa.referencia == 'p'){
                    filtroPush = [];
                    if(produtoFiltro.length > 0){
                      for(let p of produtoFiltro){
                        p_valor = fa.valor.split("-");
                        if(
                          (parseFloat(p.preco_promocional) >= 0 && parseFloat(p.preco_promocional) >= parseFloat(p_valor[0]) && parseFloat(p.preco_promocional) <= parseFloat(p_valor[1]))
                          ||
                          (parseFloat(p.preco) <= 0 && parseFloat(p.preco) >= parseFloat(p_valor[0]) && parseFloat(p.preco) <= parseFloat(p_valor[1]))){
                            filtroPush.push(p);
                        }
                      }
                    }else{
                      for(let p of this.produto){
                        p_valor = fa.valor.split("-");
                        if(
                          (parseFloat(p.preco_promocional) >= 0 && parseFloat(p.preco_promocional) >= parseFloat(p_valor[0]) && parseFloat(p.preco_promocional) <= parseFloat(p_valor[1]))
                          ||
                          (parseFloat(p.preco) <= 0 && parseFloat(p.preco) >= parseFloat(p_valor[0]) && parseFloat(p.preco) <= parseFloat(p_valor[1]))){
                          produtoFiltro.push(p);
                        }
                      }
                    }
                    
                  }
                  //CATEGORIA
                  if(fa.referencia == 'c'){
                    if(produtoFiltro.length > 0){  
                      if(filtroCategoriaAcumulado > 1){
                        for(let p of this.produto){
                          if(this.trataValor(p.subcategoria) == fa.valor){
                            filtroPush.push(p);
                          }
                        }
                      }else{
                        for(let pf of produtoFiltro){
                          if(this.trataValor(pf.subcategoria) == fa.valor){
                            filtroPush.push(pf);
                          }
                        }
                      }
                    }else{
                      if(filtroCategoriaAcumulado > 1){
                        for(let p of this.produto){
                          if(this.trataValor(p.subcategoria) == fa.valor){
                            filtroPush.push(p);
                          }
                        }
                      }else{
                        for(let p of this.produto){
                          if(this.trataValor(p.subcategoria) == fa.valor){
                            produtoFiltro.push(p);
                          }
                        }
                      }
                    }
                  }
      
                  if(fa.referencia == 'd'){
                    filtroPush = [];
                    if(produtoFiltro.length > 0){
                      for(let pf of produtoFiltro){
                        p_valor = fa.valor.split("-");
                        if(parseFloat(pf.percentual) >= parseFloat(p_valor[0]) && parseFloat(pf.percentual) <= parseFloat(p_valor[1])){
                          filtroPush.push(pf);
                        }
                      }
                    }else{
                      for(let p of this.produto){
                        p_valor = fa.valor.split("-");
                        if(parseFloat(p.percentual) >= parseFloat(p_valor[0]) && parseFloat(p.percentual) <= parseFloat(p_valor[1])){
                          produtoFiltro.push(p);
                        }
                      }
                    }
                  }
                  if(fa.referencia == 'e'){
                    let l = 0;
                    filtroPush = [];
                    if(produtoFiltro.length > 0){
                      for(let pf of produtoFiltro){
                        p_valor = fa.valor.split("-");
                        if(parseFloat(pf.estrelas) == parseFloat(p_valor[0])){
                          filtroPush.push(pf);
                        }
                      }
                    }else{
                      for(let p of this.produto){
                        p_valor = fa.valor.split("-");
                        if(parseFloat(p.estrelas) == parseFloat(p_valor[0])){
                          produtoFiltro.push(p);
                        }
                      }
                    }
                  }
                  
                if(fa.referencia == 'o'){
                  let paramFiltro;
                  filtroPush = [];
                  let val = [];
                  let ava = [];
    
    
                  let filtroPor = (produtoFiltro.length > 0)?produtoFiltro:this.produto;
    
                  for(let p of filtroPor){
                    val.push({"valor":parseFloat(p.preco_promocional),"id":p.id});
                    ava.push({"valor":p.estrelas,"id":p.id});
                  }
    
                  if(fa.valor == "maior-valor"){
                    val = this.sDados.order(val,'maior');
                  }else if(fa.valor == "menor-valor"){
                    val = this.sDados.order(val,'menor');
                  }else if(fa.valor == "mais-avaliados"){
                    val = this.sDados.order(ava,'maior');
                  }
    
                  if(produtoFiltro.length > 0){
                    for(let v of val){
                      filtroPush.push(this.getProductById(v,produtoFiltro,fa));
                    }
                  }else{
                    for(let v of val){
                      produtoFiltro.push(this.getProductById(v,this.produto,fa));
                    }
                  }
    
                }
  
                  if(filtroPush.length > 0 && i > 0 || categoriaPush.length > 0 && i > 0){
                    if(categoriaPush.length > 0){
                      produtoFiltro = categoriaPush;
                    }else{
                      produtoFiltro = filtroPush;
                    }
                  }else{
                    if(produtoFiltro.length > 0 && i > 0){
                      produtoFiltro = [];
                    }else{
                      produtoFiltro = produtoFiltro;
                    }
                  }
                  i++;
                }
                if(filtroPush.length > 0 ){
                  this.produtoView = filtroPush;
                  this.paginaCarregada = true;
                }else{
                  this.produtoView = produtoFiltro;
                  this.paginaCarregada = true;
                }
              }else{
                this.produtoView = this.produto;
                this.paginaCarregada = true;
              }
            });
            
      });
  
      
    }
    public filtrar(referencia,valor){
      valor = this.trataValor(valor);
      let valoresFiltro;
      if(this.link.length > 0){
        if(this.existeReferencia(this.link,referencia)){
          if(referencia == 'c'){
            valoresFiltro = this.getLinkByReferencia(this.link,referencia);
            if(this.in_array(valoresFiltro,valor)){
              valoresFiltro.splice(valoresFiltro.indexOf(valor), 1 );
              let novo = [];
              if(valoresFiltro.length > 0){
                for(let i = 0; i < this.link.length; i++){
                  if(this.link[i][0] == referencia){
                    this.link[i] = referencia+"/"+this.arrayToString(valoresFiltro,",");
                  }
                }
              }else{
                for(let i = 0; i < this.link.length; i++){
                  if(this.link[i][0] != referencia){
                    novo.push(this.link[i]);
                  }
                }
                this.link = novo;
              }
            }else{
              for(let i = 0; i < this.link.length; i++){
                if(this.link[i][0] == referencia){
                  this.link[i] += ','+valor;
                }
              }
            }
          }else{
            valoresFiltro = this.getLinkByReferencia(this.link,referencia);
            let novo = [];
            if(this.in_array(valoresFiltro,valor)){
              for(let i = 0; i < this.link.length; i++){
                if(this.link[i][0] != referencia){
                  novo.push(this.link[i]);
                }
              }
              this.link = novo;
            }else{
              for(let i = 0; i < this.link.length; i++){
                if(this.link[i][0] == referencia){
                  this.link[i] = referencia+"/"+valor;
                }
              }
            }
          }
        }else{
          this.link.push(referencia+"/"+valor);
        }
  
      }else{
        this.link.push(referencia+"/"+valor);
      }
  
      this.redirectUser(this.link.sort())
      
    }
  
    public trataValor(valor){
      return valor.toLowerCase().replace(','," ").replace(/\s/g, "-");
    }
  
    public getValorMascara(ref,valor){
      for(let fv of this.filtrosView){
        if(fv.ref == ref && valor == fv.valor){
          return fv.descricao;
        }
      }
    }
    public getTipoFiltro(ref){
      let tipo:any
      this.tiposFiltros.forEach(v =>{
        if(ref == v.referencia){
          tipo = v.descricao
        }
      });
  
      return tipo;
    }
    public getFiltroView(){
      let b,v;
      let obj = [];
      if(this.link.length > 0){
        for(let l of this.link){
          b = l.split("/");
          v = b[1].split(",");
          for(let filtros of v){
            obj.push({
              referencia:b[0],
              valor:filtros,
              valorMascara:this.getValorMascara(b[0],filtros),
              categoria:this.getTipoFiltro(b[0])
            });
          }
        }
      }
      return obj;
    }
  
    public abreDropDownFiltro(categoria){
      for(let fv of this.filtrosView){
        if(fv.ref == 'c'){
          if(categoria.idCategoria == fv.id && fv.checked){
            return true;
          }
        }
      }
      return false;
    }
    public filtroAcumulado(filtro,ref){
      let cont = 0;
      for(let f of filtro){
        if(ref == f.referencia){
          cont++;
        }
      }
      return cont;
    }
  
    public setCheckFiltrosAplicados(){
      for(let fa of this.filtrosAplicadosView){
        for(let i = 0; i < this.filtrosView.length;i++){
          if(fa.referencia == this.filtrosView[i].ref && fa.valor == this.filtrosView[i].valor){
            this.filtrosView[i].checked = true;
          }
        }
      }
    }
  
    // MÉTODO RESPONSAVEL POR FAZER O CHECK [V] NO FILTRO QUE ESTA APLICADO
    public verificaCheck(ref){
      for(let i = 0; i < this.filtrosView.length;i++){
       if(this.filtrosView[i].ref == ref){
         if(this.filtrosView[i].checked){
           return true;
         }
       }
      }
      return false;
    }
  
    getEstrelaByProduto(qtdEstrela){
      return this.sDados.getEstrelaAvaliacao(qtdEstrela);
    }
    public getEstrelaAvaliacao(qtd){
      return this.sDados.getEstrelaAvaliacao(qtd);
    }
  
  
    public in_array(arrayFiltros,valorProcura){    
      let tamanho = arrayFiltros.length;
      let i = 0;
      for(i = 0; i < tamanho; i++){
        if(arrayFiltros[i] == valorProcura){
          return true
        }
      }
      return false;
    }
    public arrayToString(array,separador){
      let i = 0;
      let tamanaho = array.length;
      let string = '';
      if(tamanaho > 0){
        for(i = 0; i < tamanaho; i++){
          string += array[i]+separador;
        }
      }
      return string.substr(0, string.length -1);
    }
  
    public redirectUser(link){
      let separaBarra;
      if(link.length > 0){
        for(let i = 0; i < link.length; i++){
          separaBarra = link[i].split("/");
          this.rotaBase.push(separaBarra[0],separaBarra[1]);
        }
      }
      this.router.navigate(this.rotaBase);
    }
  
  
    public getLinkArray(urlBase,link:String){
      let b = urlBase.split("/");
      let v = link.split("/");
      let r = (b.length > 0)?b:[urlBase];
      for(let l of v){
        r.push(l);
      }
      return r;
    }
    
    public existeReferencia(links,ref){
      let separaBarra;
      for(let i = 0; i < links.length; i++){
        separaBarra = links[i].split("/");
        if(separaBarra[0] == ref){
          return true;
        }
      }
      return false;
    }
  
    getProductById(value,productArray,fa){
      let paramFiltro;
      for(let p of productArray){
        paramFiltro = parseFloat(p.preco_promocional);
        if(fa.valor == "mais-avaliados"){
          paramFiltro = p.estrelas;
        }
        if(value.valor == paramFiltro && value.id == p.id){
         return p;
        }
      }
    }
    public getLinkByReferencia(link,ref){
      let b,v,resultado;
      for(let i = 0; i < link.length; i++){
        b = link[i].split("/");
        if(b[0] == ref){
          for(let y = 0; y < b.length;y++){
            v = b[y].split(",");
            resultado = v;
          }
        }
      }
      return resultado;
    }
  
    // RETORNA PRA PAGINA 
    public removerTodos(){
      this.router.navigate(this.rotaBase);
    }
  
    private setNomeLoja(nomeLoja:any){
      this.nomeLoja = nomeLoja;
    }
  
    getNomeLoja(){
      return this.nomeLoja;
    }

    adicionarFavoritos(id:number){
      return this.sFavorito.addFavorito(id);
    }
  
    verificaFavorito(id:number){
      return this.sDados.isFavorito(id);
    }

}