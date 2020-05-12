import { Injectable } from '@angular/core';
import { api } from 'src/environments/environment';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CasamentoService {

  private saveCasamento     = api.urlbase + "api/casamento";
  private editCasamento     = api.urlbase + "api/casamento";
  private getCep            = api.urlbase + "api/ceps/";
  
  private getWenddingEmails = api.urlbase + "api/casamentoemail";
  private getWenddingConfigUrl = api.urlbase + "api/casamentoconfiguracao/";
  private getProducts       = api.urlbase + "api/buscaprodutocasamento";
  private getListProductsWendding = api.urlbase + "api/minhalistaprodutos/";
  private saveProduct       = api.urlbase + "api/casamentoproduto";
  private deleteProduct     = api.urlbase + "api/casamentoprodutos/";
  private deleteAllProduct  = api.urlbase + "api/casamentoprodutos/all/";
  private listaWendding     = api.urlbase + "api/casamentolista";
  private listaWenddingPage = api.urlbase + "api/casamentolista/";
  private listaProdutos     = api.urlbase + "api/produtoscasamento/";
  private listOrders        = api.urlbase + "api/order/";

  private header = new Headers({
    'Authorization': api.key,
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(private http: Http) { }

  public getOrders = (cpfCnpj: string): Observable<any> => {
    return this.http.get(this.listOrders + cpfCnpj, { headers: this.header })
      .map((response: Response) => response.json())
      .map(res => res)
  }
  public getListaProduto = (): Observable<any> => {
    return this.http.get(this.getProducts, { headers: this.header })
      .map((response: Response) => response.json())
      .map(res => res)
  }
  
  public getCepAutoData = (idCeps: string): Observable<any> => {
    return this.http.get(this.getCep + idCeps, { headers: this.header })
      .map((response: Response) => response.json())
      .map(res => res)
  }

  public postCasamento = (data: any): Observable<any> => {
    return this.http.post(this.saveCasamento, data, { headers: this.header })
      .map((response: Response) => response.json())
      .map(res => res)
  }

  public getWenddingEmailsList = (cpfCnpj: string): Observable<any> => {
    return this.http.get(this.getWenddingEmails + '/' + cpfCnpj, { headers: this.header })
      .map((response: Response) => response.json())
      .map(res => res)
  }

  public deleteWenddingEmails = (id: string): Observable<any> => {
    return this.http.delete(this.getWenddingEmails + '/' + id, { headers: this.header })
      .map((response: Response) => response.json())
      .map(res => res)
  }

  public addWenddingEmails = (data: any): Observable<any> => {
    return this.http.post(this.getWenddingEmails, data, { headers: this.header })
      .map((response: Response) => response.json())
      .map(res => res)
  }

  public getWenddingConfig = (cpfCnpj: string): Observable<any> => {
    return this.http.get(this.getWenddingConfigUrl + cpfCnpj, { headers: this.header })
      .map((response: Response) => response.json())
      .map(res => res)
  }

  public putCasamento = (data: any): Observable<any> => {
    return this.http.put(this.editCasamento, data, { headers: this.header })
      .map((response: Response) => response.json())
      .map(res => res)
  }

  public getListProducts = (cpfCnpj: string): Observable<any> => {
    return this.http.get(this.getListProductsWendding + cpfCnpj, { headers: this.header })
      .map((response: Response) => response.json())
      .map(res => res)
  }

  public getListCat = (): Observable<any> => {
    return this.http.get(this.getProducts, { headers: this.header })
      .map((response: Response) => response.json())
      .map(res => res)
  }

  public saveProductToList = (data: any): Observable<any> => {
    return this.http.post(this.saveProduct, data, { headers: this.header })
      .map((response: Response) => response.json())
      .map(res => res)
  }

  public deleteProductFromList = (id: number): Observable<any> => {
    return this.http.delete(this.deleteProduct+id, { headers: this.header })
      .map((response: Response) => response.json())
      .map(res => res)
  }

  public deleteAll = (id: number): Observable<any> => {
    return this.http.delete(this.deleteAllProduct+id, { headers: this.header })
      .map((response: Response) => response.json())
      .map(res => res)
  }

  public listWendding = (): Observable<any> => {
    return this.http.get(this.listaWendding, { headers: this.header })
      .map((response: Response) => response.json())
      .map(res => res)
  }

  public listWenddingPage = (id: string): Observable<any> => {
    return this.http.get(this.listaWenddingPage+id, { headers: this.header })
      .map((response: Response) => response.json())
      .map(res => res)
  }

  public listProdutosConvidado = (id: string): Observable<any> => {
    return this.http.get(this.listaProdutos+id, { headers: this.header })
      .map((response: Response) => response.json())
      .map(res => res)
  }
}
