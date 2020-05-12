import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { api } from '../../environments/environment';
// import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class RequisicoesService {
  
  public urlbase = api.urlbase;
  public header = new Headers({
    'Authorization':api.key,
    'Content-Type': 'application/json; charset=utf-8'
  });

  constructor(private http:Http, private httpCliente : HttpClient) { }

  
  // public cadastrarEmailPromocao = (data:any): Observable <any> => {
  //   return this.request("post",this.urlbase+'api/emailnews',data);
  // }

  // public cadastrarUsuario = (data:any): Observable <any> => {  
  //   return this.request("post",this.urlbase+'api/customers',data);
  // }

  // public cadastrarUsuarioPhone = (data:any): Observable <any> => {
  //   return this.request("post",this.urlbase+'api/customersphones',data);
  // }

  // public getMenuPrincipal = (): Observable <any> =>{
  //   return this.request("get",this.urlbase+'api/category');
  // }

  // public getMenuCategorias = (): Observable <any> =>{
  //   return this.request("get",this.urlbase+'api/categorialista');
  // }

  // public getProductListById = (idcategoria:any): Observable <any> =>{
  //   return this.request("get",this.urlbase+'api/productlist/'+idcategoria);
  // }

  // public getProductListCategoriaById = (idcategoria:any): Observable <any> =>{
  //   return this.request("get",this.urlbase+'api/categoriaproduto/'+idcategoria);
  // }

  // public getProductById = (id:any) : Observable <any> =>{
  //   return this.request("get",this.urlbase+'api/product/'+id);
  // }


  // FRETE
  // public consultaFrete = (url:any,data:any) : Observable <any> =>{
  //   return this.request("post",url,data);
  // }

  public getInfoCep = (cep:any) : Observable <any> =>{
    return this.request("get",api.urlbase+'api/ceps/'+cep);
  }

  //LOJISTA
  // public getSeller = (sellerName:any) : Observable <any> =>{
  //   return this.request("get",api.urlbase+'api/lojista/'+sellerName);
  // }

  //BUSCA SITE
  // public autocompleteBusca = (texto:any) : Observable <any> => {
  //   return this.request("get",api.urlbase+'api/autocomplete/'+texto);
  // }

  // public resultadoBusca = (texto:any) : Observable <any> => {
  //   return this.request("get",api.urlbase+'api/busca/'+texto);
  // }


  // public getGarantiaEstendida = (id:number,skuproduto:string,idseller:number) : Observable <any> => {
  //   return this.request("get",api.urlbase+'api/garantia?id='+id+'&sku='+skuproduto+'&idSeller='+idseller);
  // }

  // public getPrecoProduto = (id:number,sku:string,quantidade:number): Observable <any> =>{
  //   return this.request("get",api.urlbase+'api/productprice/'+id+'?sku='+sku+'&quantidade='+quantidade);
  // }

  // public cadastroSessaoCarrinho = (data:any):Observable <any> => {
  //   return this.request("post",api.urlbase+'api/shoppingcartadd',data);
  // }

  public getInformacoes = ():Observable <any> => {
    return this.http.get(api.urlbase+'api/informacoes',{ headers: this.header })
        .map((response: Response) => response.json())
        .map(res => res)
  }

  public request(method:any,url,data = ""){
    if(method != "" && url != ""){
      var met = method.toLowerCase();
      if(met === "post"){
        return this.http.post(url,data,{ headers: this.header })
        .map((response: Response) => response.json())
        .map(res => res)
      }else if(met == "get"){
        return this.http.get(url,{ headers: this.header })
        .map((response: Response) => response.json())
        .map(res => res)
      }
    }
  }
}
