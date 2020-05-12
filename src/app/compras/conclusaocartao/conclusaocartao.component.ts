import { Component, OnInit } from '@angular/core';
import { configEnvi } from 'src/environments/environment';
import { UserService } from 'src/app/_services/user.service';
import { CarrinhoCompraService } from 'src/app/_services/carrinho-compra.service';
import { ConfiguracaoService } from 'src/app/_services/configuracao.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-conclusaocartao',
  templateUrl: './conclusaocartao.component.html',
  styleUrls: ['./conclusaocartao.component.css']
})
export class ConclusaocartaoComponent implements OnInit {

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
  public merchant_id;
  public totalFrete;
  public valorProdutos;
  constructor(
    private sUser: UserService,
    private sCarrinho: CarrinhoCompraService,
    public config: configEnvi,
    private sConfiguracao: ConfiguracaoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.token = params['token'];
    });
    this.sConfiguracao.getInformacoes().subscribe(r => {
      this.merchant_id = r.marketing[0].ebit;
    });
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.token = params['token'];
      this.email = this.sUser.getCustomer().cusEmail;
      this.sCarrinho.getOrder(this.token).subscribe(r => {
        this.valorTotal = r[0].valorTotal;
        this.boletoLink = r[0].pagamentos.link_pagamento;
        this.idPedido = r[0].idPedido;
        this.qtdProdutos = r[0].produtos.length;
        this.arrayProdutos = r[0].produtos;
        this.arrayEndereco = r[0].endereco_entrega.Endereco;
        this.arrayNumero = r[0].endereco_entrega.Numero;
        this.arrayCep = r[0].endereco_entrega.Cep;
        this.arrayCidade = r[0].endereco_entrega.Cidade;
        this.arrayUF = r[0].endereco_entrega.UF;
        this.arrayBairro = r[0].endereco_entrega.Bairro;
        this.arrayComplemento = r[0].endereco_entrega.Complemento;
        this.totalFrete = r[0].produtos[0].valor_frete;
        this.valorProdutos = this.valorTotal - this.totalFrete;
      });
      this.cliente = this.sUser.getCustomer().cusFantasyName;
      this.freteDias = localStorage.getItem("freteDias");
    });

    this.cliente = this.sUser.getCustomer().cusFantasyName;
    this.freteDias = localStorage.getItem("freteDias");
    this.merchant_id = '12345';
  }

}
