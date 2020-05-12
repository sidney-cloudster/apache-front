import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { api } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {


  private endPointProduto         = api.urlbase+"api/product/";
  private endPointListaProduto    = api.urlbase+"api/productlist/";
  private addFavorito             = api.urlbase+"api/favoritosadicionar";
  private listFavorito            = api.urlbase+"api/favoritoslistar/";
  private removeFavorito          = api.urlbase+"api/favoritos/";

  private header = new Headers({
    'Authorization':api.key,
    'Content-Type': 'application/json; charset=utf-8'
  });

  constructor(private http:Http){

  }

  public getProduto = (idProduto:number): Observable <any> => {
    return this.http.get(this.endPointProduto+idProduto,{ headers: this.header })
    .map((response: Response) => response.json())
    .map(res => res)
  }

  public getProductListById = (idCategoria:any) : Observable <any> =>{
    return this.http.get(this.endPointListaProduto+idCategoria,{ headers: this.header })
      .map((response: Response) => response.json())
      .map(res => res)
  }

  public getPrecoProduto = (id:number,sku:string,quantidade:number): Observable <any> =>{
    
    return this.http.get(api.urlbase+'api/productprice/'+id+'?sku='+sku+'&quantidade='+quantidade,{ headers: this.header })
        .map((response: Response) => response.json())
        .map(res => res)
  }
  
  public getEstoqueProduto = (sku:string,quantidade:number): Observable <any> =>{
    
    return this.http.get(api.urlbase+'api/productstock/'+sku+'?quantidade='+quantidade,{ headers: this.header })
        .map((response: Response) => response.json())
        .map(res => res)
  }
  

  public getDescricaoGrade(gradexy:any,idgrade:number,tipograde:string){
    let descricao:string = '';
    gradexy.forEach((v,k) => {
      switch (tipograde) {
        case 'x':
          if(v.idGradeX == idgrade){
            descricao = v.descricao;
          }
          break;    
        default:
          if(v.idGradeY == idgrade){
            descricao = v.descricao;
          }
        break;
      }
    });
    console.log("descricao",descricao);
    return descricao;
  }

  public getLinkArray(urlBase:any,link:String){
    let v = link.split("/");
    let r = [urlBase];
    for(let l of v){
      r.push(l);
    }
    return r;
  }


  public getDadosGrade(grade,idgrade,tipo){
    let gradeReturn;
    if(tipo == "y"){
      gradeReturn = grade.filter(e => {
        return e.idGradeY == idgrade;
      }); 
    }else{
      gradeReturn = grade.filter(e => {
        return e.idGradeX == idgrade;
      }); 
    }
    return gradeReturn;
  }

  
  public getTituloGrade(grade,idgrade,tipo){
    let gradeTitulo;
    if(tipo == "y"){
      gradeTitulo = grade.filter(e => {
        return e.idGradeY == idgrade;
      }); 
    }else{
      gradeTitulo = grade.filter(e => {
        return e.idGradeX == idgrade;
      }); 
    }
    return gradeTitulo[0].titulo;
  }

  // PRECO
  public buscaMelhorPrecoSeller(sellers:any){
    let menorvalor;
    const sellersOrder = sellers.sort((a,b) => a.preco - b.preco).map((resultado, index, array) => resultado);
  
    menorvalor = sellersOrder[0].preco;
    return menorvalor;
  }

  // PRICE
  public buscaMelhorPriceSeller(sellers:any){
    let menorvalor;
    const sellersOrder = sellers.sort((a,b) => a.price - b.price).map((resultado, index, array) => resultado);
    console.log(sellers);
    menorvalor = sellersOrder[0].price;
    return menorvalor;
  }

  public adicionarFavorito = (data:any): Observable <any> => {
    return this.http.post(this.addFavorito,data,{ headers: this.header })
        .map((response: Response) => response.json())
        .map(res => res)
  }

  public listaFavoritos = (cpfCnpj:string): Observable <any> => {
    return this.http.get(this.listFavorito+cpfCnpj,{ headers: this.header })
        .map((response: Response) => response.json())
        .map(res => res)
  }

  public deletarFavorito = (id:string): Observable <any> => {
    return this.http.delete(this.removeFavorito+id,{ headers: this.header })
        .map((response: Response) => response.json())
        .map(res => res)
  }

}
