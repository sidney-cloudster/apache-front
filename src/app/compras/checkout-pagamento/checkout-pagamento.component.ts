import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CheckoutService } from '../../_services/checkout.service';
import { ProdutoService } from '../../_services/produto.service';
import { CarrinhoCompraService } from '../../_services/carrinho-compra.service';
import Swal from 'sweetalert2'
import { FormControl, FormGroup, Form } from '@angular/forms';
import { configEnvi } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { WINDOW } from '@ng-toolkit/universal';
import { NgProgress, NgProgressRef } from 'ngx-progressbar';
import { CasamentoService } from 'src/app/_services/_casamento/casamento.service';
import { DadosService } from 'src/app/_services/dados.service';
import { FreteService } from 'src/app/_services/frete.service';
declare let $: any;

@Component({
  selector: 'app-checkout-pagamento',
  templateUrl: './checkout-pagamento.component.html',
  styleUrls: ['./checkout-pagamento.component.css']
})
export class CheckoutPagamentoComponent implements OnInit {
  private progressBar: NgProgressRef;
  public loadingState: boolean;
  public produtos: any;
  public qtdProdutos: any = 0;
  public totalCompra: number = 0;
  public totalCompraDesc: number = 0;
  public totalGarantia: number = 0;
  public totalMontagem: number = 0;
  public totalProdutos: number = 0;
  public totalFrete: number = 0;
  public desconto: number = 0;
  public custumer: any;
  public endereco: any;
  public enderecos: any = [];
  public valorDescontado: any = 0;
  public cupomAplicado: any = '';
  public logo;
  public customer;
  public total;
  public checked;
  public check;
  public feedbackCupom: any = {
    msg: '',
    valor: 0,
    tipo: ''
  }
  jsonCompraCartao: any = {
    tipoPagamento: '',
    cartao: {
      numeroCartao: '',
      nomeImpresso: '',
      validade: '',
      cvv: '',
      numeroParcelas: ''
    },
    cliente: {
      nome: '',
      telefone: '',
      endereco: {
        endereco: '',
        numero: '',
        bairro: '',
        cidade: '',
        UF: '',
        CEP: ''
      }
    },
    compra: {
      valorTotalProdutos: 0,
      valorTotalServicos: 0,
      valorTotalFrete: 0,
      valorTotalCompra: 0
    },
    produtos: [],
  };
  public cupomAdicionado: any = {
    cupom: '',
    data: []
  }
  public cupomAtivo: boolean = false;
  public arrayEndereco: any = [];
  public cepSelected;
  public enderecoSelected;
  public numeroSelected;
  public estadoSelected;
  public bairroSelected;
  public cidadeSelected;
  public consumer;
  public responsavelSelected;
  public complementoSelected;
  public btnsDisabled:any = [".btn-pagar",".aplicar-cupom","#pgto-boleto",".btn-add",".btn-edit"];
  public pgtoBtn:boolean = false;
  public editCidade:any;
  public editUf:any;
  public addCidade:string = '';
  public addUf:string = '';

  public parcela = {
    parcela:'',
    valor:''
  };
  public todasParcelas = [];
  public idEnderecoEdit:number = 0;
  public enderecoEntrega = {
    status:"pendente",
    dados:{responsavel:'',endereco:'',numero:'',complemento:'',bairro:'',cidade:'',estado:'',cep:''}
  }

  public idenderecoPadrao:number = 0;

  public listForm = new FormGroup({
    address_email: new FormControl(''),
    name_person: new FormControl(''),
    lastName_person: new FormControl(''),
    type_taxDocument: new FormControl('CPF'),
    number_taxDocument: new FormControl(''),
    type_identityDocument: new FormControl(''),
    number_identityDocument: new FormControl(''),
    issuer_identityDocument: new FormControl(''),
    issueDate_identityDocument: new FormControl(''),
    birthDate: new FormControl(''),
    countryCode_phone: new FormControl(''),
    areaCode_phone: new FormControl(''),
    number_phone: new FormControl(''),
    street_address: new FormControl(''),
    streetNumber_address: new FormControl(''),
    district_address: new FormControl(''),
    zipCode_address: new FormControl(''),
    city_address: new FormControl(''),
    state_address: new FormControl(''),
    country_address: new FormControl(''),
    type: new FormControl('MERCHANT'),
    transparentAccount: new FormControl(true),
    frete: new FormControl(0),
    freteJson: new FormControl(localStorage.getItem("frete")),
    titulo: new FormControl(localStorage.getItem("titulo")),
    idAddress: new FormControl(""),
    idPartner: new FormControl(localStorage.getItem("idParceiro")),
    idVendedor: new FormControl(localStorage.getItem("idVendedor")),
    freteDias: new FormControl(0),
    idService: new FormControl(""),
    idCupom: new FormControl(''),
    cupomValue: new FormControl(''),
    totalServices: new FormControl(localStorage.getItem("totalServicos")),
  });

  public listFormCC = new FormGroup({
    numero: new FormControl(''),
    nome: new FormControl(''),
    validade: new FormControl(''),
    cvv: new FormControl(''),
    parcelas: new FormControl(''),
    frete: new FormControl(0),
    freteDias: new FormControl(0),
    idPartner: new FormControl(localStorage.getItem("idParceiro")),
    idVendedor: new FormControl(localStorage.getItem("idVendedor")),
    idCupom: new FormControl(''),
    cupomValue: new FormControl(''),
    totalServices: new FormControl(localStorage.getItem("totalServicos")),
  });

  public listEdit = new FormGroup(
    {
      idCustomersAddress: new FormControl(''),
      cep: new FormControl(''),
      endereco: new FormControl(''),
      numero: new FormControl(''),
      bairro: new FormControl(''),
      complemento: new FormControl(''),
      cidade: new FormControl({value:'',disabled:true}),
      uf: new FormControl({value:'',disabled:true}),
      responsavel: new FormControl(''),
      cpf: new FormControl(this.sUser.getCustomer().cpfCnpj),
      tipo: new FormControl(''),
      telefone:new FormControl('')
    }
  );

  public listFormAddress = new FormGroup    (
    {
      cep: new FormControl(''),
      endereco: new FormControl(''),
      numero: new FormControl(''),
      bairro: new FormControl(''),
      complemento: new FormControl(''),
      cidade: new FormControl({value:'',disabled:true}),
      uf: new FormControl({value:'',disabled:true}),
      responsavel: new FormControl(''),
      cpf: new FormControl(this.sUser.getCustomer().cpfCnpj),
      tipo: new FormControl(false),
      telefone:new FormControl('')
    }
  );

  public cupomDesconto = new FormGroup({
    cupom: new FormControl('')
  });

  constructor(
    private sUser: UserService,
    private router: Router,
    private sProduto: ProdutoService,
    private sCheckout: CheckoutService,
    private sCarrinho: CarrinhoCompraService,
    private sCasamento: CasamentoService,
    public config: configEnvi,
    @Inject(WINDOW) private window: Window, 
    private user: UserService, 
    private cookieService: CookieService,
    private NgProgressBar:NgProgress,
    public sDados:DadosService,
    private sFrete:FreteService) {
    this.customer = this.user.getCustomer();
    // this.cookieService.set('idAddress', null);
  }
  ngAfterViewInit() {
    this.disabled();
  }
  ngOnInit() {
    
    document.getElementById('errorPayment').hidden = true;
    
    this.setProdutos(this.sCheckout.getProdutosCheckout());
    if (this.getProdutos().length <= 0) {
      this.router.navigate(['/compras', 'carrinho-compra']);
    }

    this.progressBar = this.NgProgressBar.ref('loadingCheckout');
    this.getEndereco();
    
  }


  public resetTotal(){
    this.qtdProdutos = 0;
    this.totalCompra = 0;
    this.totalCompraDesc = 0;
    this.totalGarantia = 0;
    this.totalMontagem = 0;
    this.totalProdutos = 0;
    this.totalFrete = 0;
    this.desconto = 0;
  }

  public getEndereco(){
    
    this.sUser.getEnderecoDefault(this.sUser.getCustomer().cpfCnpj).subscribe(r => {
      this.enderecoEntrega = {
        status:"ok",
        dados:r[0]
      }
      this.idenderecoPadrao = r[0].id;
      this.listForm.controls["idAddress"].setValue(r[0].id);
      this.listFormAddress.controls["tipo"].setValue("C");
      this.getProdutosCheckout();
    },
    e =>{
      this.enderecoEntrega = {
        status:"error",
        dados:{responsavel:'',endereco:'',numero:'',complemento:'',bairro:'',cidade:'',estado:'',cep:''}
      }
      this.idenderecoPadrao = 0;
      this.getProdutosCheckout();
    })

    this.sUser.getAllAddress(this.sUser.getCustomer().cpfCnpj).subscribe(r => {
      this.arrayEndereco = r;
      
    });
  }

  private getParcela(total:number){
    if(this.sCarrinho.getSessionCarrinho()){
      this.sCarrinho.getParcelamento(this.sCarrinho.getSessionCarrinho(),total).subscribe(
        r=>{
          this.parcela = this.getParcelasSemJuros(r.parcelas);
          this.todasParcelas = r.parcelas;
        }
      );
    }
  }

  private getParcelasSemJuros(parcelas:any){
    if(parcelas.length > 0){
      for(let i = parcelas.length - 1;i >= 0 ;i--){
        if(parcelas[i].taxa == ""){
          return parcelas[i];
        }
      }
    }
    return [];
  }

  public changeId(id) {
    let form:any;
    form = this.listForm.value;
    if(id != form.idAddress || form.idAddress == null){
      this.sUser.getAddressSelectById(id).subscribe(r => {
        this.enderecoEntrega = {
          status:"ok",
          dados:r[0]
        }
        this.idenderecoPadrao = r[0].id;
        this.listForm.controls["idAddress"].setValue(this.idenderecoPadrao);
        this.getProdutosCheckout();
      },
      e =>{
        this.enderecoEntrega = {
          status:"error",
          dados:{responsavel:'',endereco:'',numero:'',complemento:'',bairro:'',cidade:'',estado:'',cep:''}
        }
        this.idenderecoPadrao = 0;
      },
      () =>{
        $('#endereco-modal').modal('hide');
      })
    }
  }

  public ativarCupom(frm: Form) {
    if (!this.cupomAtivo) {
      this.disabled();
      let json: any = frm;
      let produtosCheckout = this.sCheckout.getProdutosCheckout();
      let totalCompra: any = this.getTotalCompra();
      let cliente: any = this.sUser.getCustomer();
      let cpfcnpj: any = (cliente) ? cliente.cpfCnpj : '';
      let percentDesconto: any = 0;
      let qtdProdutoDesc: any = 0;
      let dados: any = [];
      // document.querySelector(".aplicar-cupom").innerHTML = 'Carregando...';
      this.cupomAtivo = true;
      if (json.cupom != '') {
        this.sCheckout.getCupomDesconto(json.cupom, cpfcnpj).subscribe(r => {
          this.listForm.controls['idCupom'].setValue(r[0].id);
          this.listForm.controls['cupomValue'].setValue(r[0].valor_desconto);
          if (r.length > 0) {
            this.cupomAplicado = json.cupom;
            // CUPOM APLICADO EM CIMA DO CARRINHO DE COMPRA
            if (r.length == 1 && r[0].sku == null) {

              if (r[0].tipo_desconto == 'v') { // v = VALOR
                if (totalCompra >= r[0].valor_minimo) { // APLICA O CUPOM
                  this.setTotalDesconto(parseFloat(r[0].valor_desconto));
                  this.feedbackCupom = 'Cupom de R$ ' + r[0].valor_desconto + ' adicionado.';
                  this.setFeedBackCupom('Cupom aplicado de', +r[0].valor_desconto, 'v');
                  dados.push({
                    valor: r[0].valor_desconto,
                    tipo: r[0].tipo_desconto,
                    produtos: ''
                  });
                  this.cupomAtivo = true;
                }
              } else if (r[0].tipo_desconto == 'p') { // p = PORCENTAGEM
                let valorDesc = 0;
                let totalProd = 0;
                let totalDesc = 0;
                percentDesconto = (r[0].valor_desconto / 100);
                valorDesc = (this.getTotalProdutos() * percentDesconto); // VALOR PARA APLICAR O DESCONTO
                totalProd = (this.getTotalProdutos() - valorDesc); // DESCONTA O VALOR NO TOTAL DO PRODUTO
                totalDesc = (totalDesc + valorDesc); // GERA UM TOTAL DESCONTO
                this.setTotalDesconto(totalDesc);
                this.setFeedBackCupom('Cupom aplicado de', +r[0].valor_desconto, 'p');
                dados.push({
                  valor: r[0].valor_desconto,
                  tipo: r[0].tipo_desconto,
                  produtos: ''
                });
                this.cupomAtivo = true;
              }
            } else {
              // CUPOM APLICADO EM CIMA DE CADA PRODUTO DO CARRINHO
              let valorDesc = 0;
              let totalProd = 0;
              let totalDesc = 0;

              for (let descontos of r) {
                if (produtosCheckout.length > 0) {
                  for (let p of produtosCheckout) {
                    if (p.produtos.seller.skuProduto == descontos.sku) {
                      if (descontos.tipo_desconto == 'p') {
                        percentDesconto = (descontos.valor_desconto / 100);
                        valorDesc = (p.produtos.total * percentDesconto); // VALOR PARA APLICAR O DESCONTO
                        totalProd = (p.produtos.total - valorDesc); // DESCONTA O VALOR NO TOTAL DO PRODUTO
                        totalDesc = (totalDesc + valorDesc); // GERA UM TOTAL DESCONTO
                        this.setFeedBackCupom('Cupom aplicado de', descontos.valor_desconto, 'p');
                        dados.push({
                          valor: descontos.valor_desconto,
                          tipo: descontos.tipo_desconto,
                          produtos: p.produtos
                        });
                        this.cupomAtivo = true;
                      } else if (descontos.tipo_desconto == 'v') {
                        if (p.produtos.total >= descontos.valor_minimo) { // APLICA O CUPOM
                          valorDesc = (descontos.valor_desconto * p.produtos.quantidade); // VALOR PARA APLICAR O DESCONTO
                          totalProd = (p.produtos.total - valorDesc); // DESCONTA O VALOR NO TOTAL DO PRODUTO
                          totalDesc = (totalDesc + valorDesc); // GERA UM TOTAL DESCONTO
                          this.setFeedBackCupom('Cupom aplicado de', descontos.valor_desconto, 'v');
                          dados.push({
                            valor: descontos.valor_desconto,
                            tipo: descontos.tipo_desconto,
                            produtos: p.produtos
                          });
                          this.cupomAtivo = true;
                        }
                      }
                      qtdProdutoDesc++; //QTD DE PRODUTOS QUE O DESCONTO FOI APLICADO
                    }
                  }
                }
              }
              this.setTotalDesconto(totalDesc);
            }
            this.cupomAdicionado = {
              cupom: json.cupom,
              data: dados
            }
            this.undisabled();
          }
        },
          e => {
            this.setFeedBackCupom('Cupom inválido', 0, 'i');
            setTimeout(() => {
              this.removeCupom();
            }, 5000);
            document.querySelector(".aplicar-cupom").innerHTML = 'Aplicar';
            this.cupomDesconto.controls.cupom.setValue('');
          });
      } else {
        this.setFeedBackCupom('Preencha o campo.', 0, 'i');
        setTimeout(() => {
          this.removeCupom();
        }, 5000);
      }
    }
  }

  public removeCupom() {
    this.resetValues();
    this.getProdutosCheckout();
    this.cupomAplicado = '';
    this.cupomAtivo = false;
    this.cupomAdicionado = {
      cupom: '',
      data: []
    }
    this.setFeedBackCupom('', 0, '');
  }

  setFeedBackCupom(msg: any, valor: any, tipo: any) {
    this.feedbackCupom = {
      msg: msg,
      valor: valor,
      tipo: tipo
    }
  }
  getFeedBackCupom() {
    return this.feedbackCupom;
  }
  public paymentBoleto(listForm: Form) {
    document.getElementById('errorPayment').hidden = true;
    if(this.pgtoBtn === true){
      this.disabled();
      this.sUser.getEnderecoDefault(this.sUser.getCustomer().cpfCnpj).subscribe(r => {
        this.loadingState = true;
        this.progressBar.start();
        this.enderecos = r;
        this.listForm.controls['address_email'].setValue(this.sUser.getCustomer().cusEmail);
        this.listForm.controls['name_person'].setValue(this.sUser.getCustomer().cusFantasyName);
        this.listForm.controls['lastName_person'].setValue(this.sUser.getCustomer().cusCompanyName);
        this.listForm.controls['number_taxDocument'].setValue(this.sUser.getCustomer().cpfCnpj);
        this.listForm.controls['birthDate'].setValue('1990-01-01');
        this.listForm.controls['countryCode_phone'].setValue("55");
        this.listForm.controls['areaCode_phone'].setValue("44");
        this.listForm.controls['number_phone'].setValue("965213244");
        this.listForm.controls['street_address'].setValue(r[0].endereco);
        this.listForm.controls['streetNumber_address'].setValue(r[0].numero);
        this.listForm.controls['district_address'].setValue(r[0].bairro);
        this.listForm.controls['zipCode_address'].setValue(r[0].cep);
        this.listForm.controls['city_address'].setValue(r[0].cidade);
        this.listForm.controls['state_address'].setValue(r[0].uf);
        let produtos:any;
        this.setProdutos(this.sCheckout.getProdutosCheckout());
        this.setTotalCompra(0);
        produtos = this.getProdutos();
        this.listForm.controls['country_address'].setValue("BRA");
        this.consumer = this.listForm.value;
        this.total    = { ["total"]: this.totalCompra };
        if (produtos.length > 0) {
          $(".itens-carrinho").find("#listaCarrinho").fadeOut(0, () => {
            $(".itens-carrinho").find("#carrinhoLoading").fadeIn(700);
          });
        }
        produtos.forEach((v, k) => {
          if( v.produtos.frete.deliveryTime != null ) {
            this.listForm.controls["freteDias"].setValue(v.produtos.frete.deliveryTime);
          } else {
            this.listForm.controls["freteDias"].setValue(0);
          }
        });
        
        var $frete = new Array();
        for (let $i = 0; $i < produtos.length; $i++) {
          if ( produtos[$i].produtos.frete != false ) {
            $frete.push({ frete: produtos[$i].produtos.frete.shippingCost });
            var numbers = $frete.map(i => i.frete);
            var sum = numbers.reduce((a, b) => a + b, 0);
            this.listForm.controls["frete"].setValue(sum.toFixed(2));
          } else {
            this.listForm.controls["frete"].setValue(0);
          }
        }
        
        this.listForm.controls['country_address'].setValue("BRA");
        this.consumer = this.listForm.value;
        this.total    = { ["total"]: this.totalCompra }
        this.sCarrinho.checkUser(this.listForm.value).subscribe(r => {
          let token_cart = JSON.parse(localStorage.getItem("session_cart"));
          this.sCarrinho.createOrder(token_cart, this.listForm.value, this.listFormCC.value).subscribe(r => {
            Swal.fire({
              icon: 'success',
              title: 'Parabéns...',
              text: 'Pedido realizado com sucesso!!!'
            });
            this.progressBar.complete();
            this.loadingState = false;
            this.router.navigate(['/compras/finalizacao_boleto/' + token_cart["session"]]);
            localStorage.removeItem("session_cart");
            localStorage.removeItem("product_cart");
            localStorage.removeItem("checkout-compra");
            this.undisabled();
          },
          e =>{
            // ERRO AO FINALIZAR A COMPRA
            this.loadingState = false;
            this.progressBar.complete();
            document.getElementById('errorPayment').hidden = false;
            this.undisabled();
          });
        });
        
      });
    }
  }

  public paymentCreditCard(listFormCC: Form) {
    document.getElementById('errorPayment').hidden = true;
    if(this.pgtoBtn === true){
      this.disabled();
      this.sUser.getEnderecoDefault(this.sUser.getCustomer().cpfCnpj).subscribe(r => {
        this.loadingState = true;
        this.progressBar.start();
        this.enderecos = r;
        this.listForm.controls['address_email'].setValue(this.sUser.getCustomer().cusEmail);
        this.listForm.controls['name_person'].setValue(this.sUser.getCustomer().cusFantasyName);
        this.listForm.controls['lastName_person'].setValue(this.sUser.getCustomer().cusCompanyName);
        this.listForm.controls['number_taxDocument'].setValue(this.sUser.getCustomer().cpfCnpj);
        this.listForm.controls['birthDate'].setValue('1990-01-01');
        this.listForm.controls['countryCode_phone'].setValue("55");
        this.listForm.controls['areaCode_phone'].setValue("44");
        this.listForm.controls['number_phone'].setValue("965213244");
        this.listForm.controls['street_address'].setValue(r[0].endereco);
        this.listForm.controls['streetNumber_address'].setValue(r[0].numero);
        this.listForm.controls['district_address'].setValue(r[0].bairro);
        this.listForm.controls['zipCode_address'].setValue(r[0].cep);
        this.listForm.controls['city_address'].setValue(r[0].cidade);
        this.listForm.controls['state_address'].setValue(r[0].uf);
        let valorPedido: number = 0;
        let produtos, valGarantia = 0;
        this.setProdutos(this.sCheckout.getProdutosCheckout());

        this.setTotalCompra(0);

        produtos = this.getProdutos();
        if (produtos.length > 0) {
          $(".itens-carrinho").find("#listaCarrinho").fadeOut(0, () => {
            $(".itens-carrinho").find("#carrinhoLoading").fadeIn(700);
          });
        }
          var $frete = new Array();
          for (let $i = 0; $i < produtos.length; $i++) {
            $frete.push({ frete: produtos[$i].produtos.frete.shippingCost });
            var numbers = $frete.map(i => i.frete);
            var sum = numbers.reduce((a, b) => a + b, 0);
          }
          produtos.forEach((v, k) => {
            if( v.produtos.frete.deliveryTime != null ) {
              this.listForm.controls["freteDias"].setValue(v.produtos.frete.deliveryTime);
            } else {
              this.listForm.controls["freteDias"].setValue(0);
            }
          });
          if ( isNaN(this.totalFrete) ) {
            this.listForm.controls["frete"].setValue(0.00);
          } else {
            this.listForm.controls["frete"].setValue(sum.toFixed(2));
          }
          this.listForm.controls['country_address'].setValue("BRA");
          this.customer = this.listForm.value;
          this.total = {
            ["total"]: this.totalCompra,
          }
          this.sCarrinho.checkUser(this.listForm.value).subscribe(r => {
            let token_cart = JSON.parse(localStorage.getItem("session_cart"));
            this.sCarrinho.createOrderCreditCard(token_cart, this.listForm.value, this.listFormCC.value).subscribe(r => {
              Swal.fire({
                icon: 'success',
                title: 'Parabéns...',
                text: 'Pedido realizado com sucesso!!!'
              });
              this.loadingState = false;
              this.progressBar.complete();
              this.router.navigate(['/compras/finalizacao_cartao/' + token_cart["session"]]);
              localStorage.removeItem("session_cart");
              localStorage.removeItem("product_cart");
              localStorage.removeItem("checkout-compra");
              this.undisabled();
            },
            e =>{
              // ERRO AO FINALIZAR A COMPRA
              this.loadingState = false;
              this.progressBar.complete();
              document.getElementById('errorPayment').hidden = false;
              this.undisabled();
            });
          },
          e=>{
            // ERRO AO VALIDAR USUARIO
            this.undisabled();
          });
        });
    }
  }

  private setProdutos(produtos: any) {
    this.produtos = produtos
  }
  private setQtdProdutos(qtdProdutos: any) {
    this.qtdProdutos += parseInt(qtdProdutos);
  }
  private setTotalCompra(totalCompra: any) {
    if (totalCompra > 0) {
      this.totalCompra += totalCompra
    } else {
      this.totalCompra = 0;
    }
  }
  private setTotalGarantia(totalGarantia: any) {
    this.totalGarantia += totalGarantia;
  }
  private setTotalMontagem(totalMontagem: any) {
    this.totalMontagem += totalMontagem;
  }
  private setTotalProdutos(totalProdutos: any) {
    this.totalProdutos += totalProdutos
  }
  private setTotalFrete(totalFrete: any) {
    this.totalFrete += totalFrete
  }
  private setTotalDesconto(desconto: any) {
    if (desconto > 0) {
      this.desconto += desconto
    } else {
      this.desconto = 0;
    }
  }
  getProdutos() {
    return this.produtos;
  }
  getQtdProdutos() {
    return this.qtdProdutos;
  }
  getTotalCompra() {
    this.totalCompra = (((this.getTotalProdutos() - this.getTotalDesconto()) + this.getTotalGarantia()) + this.getTotalFrete() + this.getTotalMontagem())
    return this.totalCompra;
  }
  getTotalGarantia() {
    return this.totalGarantia;
  }
  getTotalMontagem() {
    return this.totalMontagem;
  }
  getTotalProdutos() {
    return this.totalProdutos;
  }
  getTotalFrete() {
    return this.totalFrete;
  }
  getTotalDesconto() {
    return this.desconto;
  }

  getProdutosCheckout() {
    let valorPedido: number = 0,
      produtos,
      valGarantia = 0,
      valMontagem = 0,
      totalProdutos = 0,
      valFrete = 0,
      qtd = 0;
    this.setProdutos(this.sCheckout.getProdutosCheckout());
    this.setTotalCompra(0);
    produtos = this.getProdutos();
    this.resetTotal();
    if (produtos.length > 0) {
      $(".itens-carrinho").find("#listaCarrinho").fadeOut(0, () => {
        $(".itens-carrinho").find("#carrinhoLoading").fadeIn(700);
      });
      try {
        produtos.forEach((v, k) => {
          this.sProduto.getPrecoProduto(v.produtos.id, v.produtos.seller.skuProduto, v.produtos.quantidade).subscribe(
            r => {
              valGarantia = (v.produtos.garantia != '') ? (parseFloat(v.produtos.garantia.valor) * v.produtos.quantidade) : 0;
              valMontagem = (v.produtos.montagem != '') ? (parseFloat(v.produtos.montagem.valor) * v.produtos.quantidade) : 0;

              totalProdutos = parseFloat(r[0].total);
              v.produtos.total = totalProdutos;
              
              valorPedido = ((v.produtos.total + valGarantia) + valFrete) + valMontagem;
              this.setTotalProdutos(totalProdutos);
              this.setTotalGarantia(valGarantia);
              this.setTotalMontagem(valMontagem);
              this.setQtdProdutos(v.produtos.quantidade);

              if(this.enderecoEntrega.dados.cep != ''){
                this.sFrete.calculaFrete(this.enderecoEntrega.dados.cep,v.produtos).subscribe(
                  r =>{
                    v.frete = r.shippingQuotes[0];
                    valFrete = (v.frete != '') ? v.frete.shippingCost : 0;
                    this.setTotalFrete(valFrete);
                  },
                  e => {
                    console.error("ERRO AO CALCULAR FRETE",e);
                  });
              }
            },
            e => {
              alert("Falha ao Buscar Preço do Produto");
            },
            () => {
              qtd++;
              if(produtos.length === qtd){
                this.getParcela(this.getTotalCompra());
                this.undisabled();
              }
              $(".itens-carrinho").find("#carrinhoLoading").fadeOut(0, () => {
                $(".itens-carrinho").find("#listaCarrinho").fadeIn(700);
              });
            });

        });
      } catch (e) {
      }
    }
  }
  public resetValues() {
    this.produtos = 0;
    this.qtdProdutos = 0;
    this.totalCompra = 0;
    this.totalGarantia = 0;
    this.totalMontagem = 0;
    this.totalProdutos = 0;
    this.totalFrete = 0;
    this.setTotalDesconto(0);
  }
  getPrecoGarantia(garantia: any) {
    let valor = 0;
    if (garantia != '' || garantia.length > 0) {
      garantia.forEach((v, k) => {
        if (v.checked == 'T') {
          valor = parseFloat(v.valor);
        }
      });
    }
    return valor;
  }

  finalizarCompraBoleto() {

  }
  showSwalAlert(titulo, msg, tipo) {
    Swal.fire(
      titulo,
      msg,
      tipo
    )
  }
  finalizarCompraCartao(cartao: string, nome: string, validade: string, cvv: string, parcelas: string) {
    let erro = false;
    cartao = cartao.replace(/^\s+|\s+$/g, "");
    this.custumer = this.sUser.getCustomer();
    /*
      VALIDAR VALOR DO PRODUTO, PRODUTO, FRETE, ESTOQUE..
    */
    if (cartao == '' || cartao.length > 19 || cartao == undefined) {
      this.showSwalAlert('Ops!', 'Número do cartão inválido.', 'warning')
      erro = true;
    }
    if (nome == '' || nome.length >= 25) {
      this.showSwalAlert('Ops!', 'O nome impresso no cartão é inválido.', 'warning');
      erro = true;
    }
    if (validade == '' || (validade.length < 7 || validade.length > 7)) {
      this.showSwalAlert('Ops!', 'A data de validade do cartão é inválido.', 'warning');
      erro = true;
    }
    if (cvv == '' || (cvv.length > 3 || cvv.length < 3)) {
      this.showSwalAlert('Ops!', 'O CVV inserido é inválido.', 'warning');
      erro = true;
    }
    if (parcelas == '' || (parseFloat(parcelas) <= 0 || parseFloat(parcelas) > 12)) {
      this.showSwalAlert('Ops!', 'O número de parcelas é inválido.', 'warning');
      erro = true;
    }

    if (!erro) {
      this.jsonCompraCartao = {
        tipoPagamento: 'cartao',
        cartao: {
          numeroCartao: cartao.replace(/ /g, ''),
          nomeImpresso: nome,
          validade: validade,
          cvv: cvv,
          numeroParcelas: parseFloat(parcelas)
        },
        boleto: {

        },
        cliente: {
          nome: '',
          telefone: '',
          endereco: {
            endereco: '',
            numero: '',
            bairro: '',
            cidade: '',
            UF: '',
            CEP: ''
          }
        },
        compra: {
          valorTotalProdutos: this.getTotalProdutos(),
          valorTotalServicos: this.getTotalGarantia(),
          valorTotalFrete: this.getTotalFrete(),
          valorTotalCompra: this.getTotalCompra()
        },
        produtos: this.getProdutos()
      };
    }
  }

  onSubmit() {
    if (this.listFormAddress.controls['responsavel'].value == '') {
      document.getElementById('nome_destinatario_').focus();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'O campo Nome do Destinatário é obrigatório para realizar o cadastro!',
      })
    } else if (this.listFormAddress.controls['cep'].value == '') {
      document.getElementById('cep_').focus();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'O campo CEP é obrigatório para realizar o cadastro!',
      })
    }
    else if (this.listFormAddress.controls['endereco'].value == '') {
      document.getElementById('endereco_').focus();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'O campo Endereço é obrigatório para realizar o cadastro!',
      })
    }
    else if (this.listFormAddress.controls['numero'].value == '') {
      document.getElementById('numero_').focus();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'O campo Número é obrigatório para realizar o cadastro!',
      })
    }
    else if (this.listFormAddress.controls['bairro'].value == '') {
      document.getElementById('bairro_').focus();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'O campo Bairro é obrigatório para realizar o cadastro!',
      })
    }
    else if (this.listFormAddress.controls['cidade'].value == '') {
      document.getElementById('cidade_').focus();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'O campo Cidade é obrigatório para realizar o cadastro!',
      })
    }
    else if (this.listFormAddress.controls['uf'].value == '') {
      document.getElementById('estado_').focus();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'O campo Estado é obrigatório para realizar o cadastro!',
      })
    } else {
      this.endereco = [];
      this.sUser.postEndereco(this.getJsonEndereco(this.listFormAddress.value,'add')).subscribe(r => {
        Swal.fire(r.Label, '', r.Code)
        if (r.Code == 'success') {
          $('#endereco-adicionar').modal('hide');
          this.getEndereco();
        }
      },
      e =>{
        $('#endereco-adicionar').modal('hide');
        Swal.fire({ icon: 'error', text: 'Desculpe, houve um erro ao cadastrar um novo endereço.' });
        this.undisabled();
      })
    }
  }

  setResidencial() {
    let element = <HTMLInputElement>document.getElementById("default_");
    if (element.checked) {
  
      this.consumer = this.user.getCustomer();
      this.sUser.getEnderecoDefault(this.user.getCustomer().cpfCnpj).subscribe(r => {
        if (r.length > 0) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Já existe um endereço padrão cadastrado!'
          });
          element.checked = false;
        } else {
          element.checked = true;
          this.listFormAddress.controls['tipo'].setValue('R');
          this.listEdit.controls['tipo'].setValue('R');
        }
      }, (err) => {
        this.listFormAddress.controls['tipo'].setValue('R');
        this.listEdit.controls['tipo'].setValue('R');
      })
  
    } else {
  
      this.listFormAddress.controls['tipo'].setValue('C');
      this.listEdit.controls['tipo'].setValue('C');
    }
  }

  getEditData(idAddress) {
    let element   = <HTMLInputElement>document.getElementById("default_");
    this.customer = this.sUser.getCustomer();
    this.disabled();
    this.sUser.getAddressSelectById(idAddress).subscribe(r => {
      this.idEnderecoEdit = idAddress;
      r.forEach(data_ => {
        this.listEdit.controls['idCustomersAddress'].setValue(data_.idCustomersAddress);
        this.listEdit.controls['cep'].setValue(data_.cep);
        this.listEdit.controls['endereco'].setValue(data_.endereco);
        this.listEdit.controls['numero'].setValue(data_.numero);
        this.listEdit.controls['complemento'].setValue(data_.complemento);
        this.listEdit.controls['cidade'].setValue(data_.cidade);
        this.listEdit.controls['uf'].setValue(data_.uf);
        this.listEdit.controls['responsavel'].setValue(data_.responsavel);
        this.listEdit.controls['bairro'].setValue(data_.bairro);
        this.editCidade = data_.cidade;
        this.editUf = data_.uf;
        this.check = data_.tipo;
        if(this.check == 'R') {
          element.checked = true;
        } else {
          element.checked = false;
        }
      });
      this.undisabled();
    },
    e=>{
      this.idEnderecoEdit = 0;
    })
  }

  onUpdate() {
    this.listEdit.controls['idCustomersAddress'].setValue(this.idEnderecoEdit);
    this.disabled();
    if (this.listEdit.controls['responsavel'].value == '') {
      document.getElementById('nome_destinatario_').focus();
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'O campo Nome do Destinatário é obrigatório para realizar o cadastro!' })
    } else if (this.listEdit.controls['cep'].value == '') {
      document.getElementById('cep_').focus();
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'O campo CEP é obrigatório para realizar o cadastro!' })
    }
    else if (this.listEdit.controls['endereco'].value == '') {
      document.getElementById('endereco_').focus();
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'O campo Endereço é obrigatório para realizar o cadastro!' })
    }
    else if (this.listEdit.controls['numero'].value == '') {
      document.getElementById('numero_').focus();
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'O campo Número é obrigatório para realizar o cadastro!' })
    }
    else if (this.listEdit.controls['bairro'].value == '') {
      document.getElementById('bairro_').focus();
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'O campo Bairro é obrigatório para realizar o cadastro!' })
    }
    else if (this.listEdit.controls['cidade'].value == '') {
      document.getElementById('cidade_').focus();
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'O campo Cidade é obrigatório para realizar o cadastro!' })
    }
    else if (this.listEdit.controls['uf'].value == '') {
      document.getElementById('estado_').focus();
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'O campo Estado é obrigatório para realizar o cadastro!' })
    } else {
      if(this.idEnderecoEdit > 0){
        console.log(this.getJsonEndereco(this.listEdit.value,'edit'));
        this.sUser.putEndereco(this.idEnderecoEdit, this.getJsonEndereco(this.listEdit.value,'edit')).subscribe(r => {
          this.cookieService.delete('idAddress');
          Swal.fire({ icon: r.Code, text: r.Label });
          setTimeout(function () {
            this.undisabled();
            $('#endereco-editar').modal('hide');
          }, 1500)
        },
        e =>{
          Swal.fire({ icon: 'error', text: 'Desculpe, houve um erro ao atualizar seu endereço.' });
          $('#endereco-editar').modal('hide');
          this.undisabled();
        })
      }
    }
    
  }
  public disabled(){
    let elements = this.btnsDisabled;
    for(let e of elements){
      if(document.querySelector(e)){
        document.querySelector(e).setAttribute('disabled','');
      }
    }
    this.pgtoBtn = true;
  }
  public undisabled(){
    let elements = this.btnsDisabled;
    for(let e of elements){
      if(document.querySelector(e)){
        document.querySelector(e).removeAttribute('disabled');
      }
    }
    this.pgtoBtn = true;
  }

  autoDataCep(tipo:any) {
    this.disabled();
    let tipoForm:any = (tipo == 'add') ? this.listFormAddress : this.listEdit;
    this.sCasamento.getCepAutoData(tipoForm.value.cep).subscribe(r => {
      r.forEach(cepData => {
        if(tipo == 'add'){
          this.listFormAddress.controls['endereco'].setValue(cepData.cepAddress);
          this.listFormAddress.controls['bairro'].setValue(cepData.cepDistrict);
          this.listFormAddress.controls['cidade'].setValue(cepData.cepNameCity);
          this.listFormAddress.controls['uf'].setValue(cepData.cepUF);
          this.addCidade = cepData.cepNameCity;
          this.addUf = cepData.cepUF;
        }else{
          this.listEdit.controls['endereco'].setValue(cepData.cepAddress);
          this.listEdit.controls['bairro'].setValue(cepData.cepDistrict);
          this.listEdit.controls['cidade'].setValue(cepData.cepNameCity);
          this.listEdit.controls['uf'].setValue(cepData.cepUF);
          this.editCidade = cepData.cepNameCity;
          this.editUf = cepData.cepUF;
        }
      });
      this.undisabled();
    },
    e=>{
      if(tipo == 'add'){
        this.listFormAddress.controls['endereco'].setValue('');
        this.listFormAddress.controls['bairro'].setValue('');
        this.listFormAddress.controls['cidade'].setValue('');
      }else{
        this.listEdit.controls['endereco'].setValue('');
        this.listEdit.controls['bairro'].setValue('');
        this.listEdit.controls['cidade'].setValue('');
      }
  
      this.undisabled();
    })
  }

  public getJsonEndereco(form:any,tipo:any){
    let json = {
      bairro: form.bairro,
      cep: form.cep,
      cidade: (tipo == 'add') ? this.addCidade : this.editCidade,
      complemento: form.complemento,
      endereco: form.endereco,
      numero: form.numero,
      responsavel: form.responsavel,
      tipo: (form.tipo) ? 'R' : 'C',
      uf: (tipo == 'add') ? this.addUf : this.editUf,
      cpf:form.cpf
    }
    return json;
  }
}
