import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { CarrinhoCompraService } from 'src/app/_services/carrinho-compra.service';
import { ActivatedRoute } from '@angular/router';

// s
@Component({
  selector: 'app-orderprint',
  templateUrl: './orderprint.component.html',
  styleUrls: ['./orderprint.component.css']
})
export class OrderPrintComponent implements OnInit {

  public email;
  public logo;
  public valorTotal;
  public boletoLink;
  public idPedido;
  public qtdProdutos;
  public arrayProdutos;
  public arrayEndereco;
  public arrayNumero;
  public arrayCep;
  public arrayCidade;
  public arrayUF;
  public arrayBairro;
  public arrayComplemento;
  public imgShop;
  public freteDias;
  public cliente;
  public getOrder;
  public token;
  public totalFrete;
  public dataEntrega;

  constructor(
    private sUser: UserService,
    private sCarrinho: CarrinhoCompraService,
    private route: ActivatedRoute
  ) { }

  valorProdutos;
  diasFrete;

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get("token");
    this.email = this.sUser.getCustomer().cusEmail;
    this.freteDias = localStorage.getItem("freteDias");
    this.sCarrinho.getOrder(this.token).subscribe(r => {
      this.valorTotal   = r[0].valorTotal;
      this.boletoLink   = r[0].pagamentos.link_pagamento;
      this.idPedido     = r[0].idPedido;
      this.arrayProdutos = r[0].produtos;
      this.diasFrete     = r[0].produtos[0].dias;
      this.qtdProdutos  = r[0].produtos[0].itens.length;
      this.dataEntrega = r[0].data_entrega.date;
      this.arrayEndereco = r[0].endereco_entrega.Endereco;
      this.arrayNumero  = r[0].endereco_entrega.Numero;
      this.arrayCep     = r[0].endereco_entrega.Cep;
      this.arrayCidade  = r[0].endereco_entrega.Cidade;
      this.arrayUF      = r[0].endereco_entrega.UF;
      this.arrayBairro  = r[0].endereco_entrega.Bairro;
      this.arrayComplemento = r[0].endereco_entrega.Complemento;
      this.totalFrete = r[0].produtos[0].valor_frete;
      this.valorProdutos = this.valorTotal - this.totalFrete;
    });
    this.cliente = this.sUser.getCustomer().cusFantasyName;

  }
  

}
