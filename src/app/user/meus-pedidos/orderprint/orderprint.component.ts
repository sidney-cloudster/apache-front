import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { CarrinhoCompraService } from 'src/app/_services/carrinho-compra.service';
import { ActivatedRoute } from '@angular/router';
import { MeusPedidosService } from 'src/app/_services/meus-pedidos.service';

@Component({
  selector: 'app-orderprint',
  templateUrl: './orderprint.component.html',
  styleUrls: ['./orderprint.component.css']
})
export class OrderPrintPedidoComponent implements OnInit {

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
  public prazoEntrega;
  public nomeSeller;
  public valorFrete;
  public totalDesconto;
  public valorTotalFinal;
  public valorComFrete;
  public responsavel;
  public formaPagamento;
  public bandeira;
  public parcelas;

  constructor(
    private sUser: UserService,
    private sCarrinho: CarrinhoCompraService,
    private sMeusPedidosService: MeusPedidosService,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get("token");
    this.email = this.sUser.getCustomer().cusEmail;

    this.sMeusPedidosService.getOrder(this.token).subscribe(r => {
      console.log("AARRRAAy: ", r[0])
      
      this.valorTotal       = r[0].valorTotal;
      this.boletoLink       = r[0].pagamentos.link_pagamento;
      this.bandeira         = r[0].pagamentos.bandeira;
      this.parcelas         = r[0].pagamentos.parcelas;
      this.idPedido         = r[0].idPedido;
      this.qtdProdutos      = r[0].produtos[0].itens.length;
      this.arrayProdutos    = r[0].produtos[0].itens;
      this.arrayEndereco    = r[0].endereco_entrega.Endereco;
      this.arrayNumero      = r[0].endereco_entrega.Numero;
      this.arrayCep         = r[0].endereco_entrega.Cep;
      this.arrayCidade      = r[0].endereco_entrega.Cidade;
      this.arrayUF          = r[0].endereco_entrega.UF;
      this.arrayBairro      = r[0].endereco_entrega.Bairro;
      this.arrayComplemento = r[0].endereco_entrega.Complemento;
      this.responsavel      = r[0].endereco_entrega.Responsavel;
      this.prazoEntrega     = r[0].produtos[0].prazo_entrega;
      this.nomeSeller       = r[0].produtos[0].nome_seller;
      this.valorFrete       = r[0].produtos[0].valor_frete;
      this.totalDesconto    = r[0].total_desconto;
      this.valorComFrete    = r[0].valorTotal + r[0].produtos[0].valor_frete;
      this.valorTotalFinal  = (r[0].valorTotal - r[0].total_desconto) + r[0].total_frete;
      this.formaPagamento   = r[0].pagamentos.metodo;
    });
    this.cliente = this.sUser.getCustomer().cusFantasyName;
    this.freteDias = localStorage.getItem("freteDias");
  }
  

}
