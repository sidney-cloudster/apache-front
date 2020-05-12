import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RequisicoesService } from '../../_services/requisicoes.service';
import { FreteService } from '../../_services/frete.service';
import { CarrinhoCompraService } from '../../_services/carrinho-compra.service';
import { GarantiaService } from '../../_services/garantia.service';
import { DadosService } from '../../_services/dados.service';
import { ProdutoService } from '../../_services/produto.service';
import { UserService } from '../../_services/user.service';
import { CheckoutService } from '../../_services/checkout.service';
import Swal from 'sweetalert2';
import { MontagemService } from '../../_services/montagem.service';
import * as $ from 'jquery';
import { VendedorService } from 'src/app/_services/vendedor.service';
import { configEnvi } from 'src/environments/environment';

@Component({
  selector: 'app-carrinho-compra',
  templateUrl: './carrinho-compra.component.html',
  styleUrls: ['./carrinho-compra.component.css']
})
export class CarrinhoCompraComponent implements OnInit {
  public productLoding:boolean = true;
  public compraDisabled:boolean = false;
  public freteDisabled:boolean = false;
  public btnsDisabled:any  = [".btn-comprar",".btn-frete"];
  public cepFormat;
  public produtosCarrinho:any = [];
  public listaProduto:any     = [];
  public maxCompraA:any       = [];
  public totalSomado:boolean  = false;
  public qtdProduto:number    = 0;
  public cep:String           = '';
  public cepConsultado:any;
  public cepFrete:string      = '';
  // VALORES
  public totalCompra:number   = 0;
  public totalCompraView:number = 0;
  public totalServicos:number = 0;
  public totalFrete:number    = 0;
  public totalProdutos:number = 0;
  
  public parcela:any = {};
  public descontoBoleto:number = 10;
  public boleto:number         = 0;
  public alertaFrete:string = '';
  public infoCep:any        = [];
  public isAbandonoCarrinho:boolean = false;
  public sessionCarrinho:any = '';
  public emailLogin;
  public calculoFrete:any = false;
  public sessaoVendedor:any;
  public sessaoUsuario:any;
  public produtoSemEstoque:any = [];

  public listaFreteVendedor:any = [];
  public listaEnderecoCliente:any = [];

  public enderecoSelecionado:any;
  public enderecos:any = [];
  public paginaInicial: any = ['/'];
  
  public qtdProdutos   = 0;
  public countProdutos = 0;
  constructor(
    private sRequisicao:RequisicoesService,
    private sFrete:FreteService,
    private sCarrinho:CarrinhoCompraService,
    private sGarantia:GarantiaService,
    public sDados:DadosService,
    private sProduto:ProdutoService,
    private route: ActivatedRoute,
    private sUser:UserService,
    private sCheckout:CheckoutService,
    private router:Router,
    private sMontagem:MontagemService,
    private sVendedor:VendedorService,
    public config:configEnvi,
  ) { }

  public getEnderecoVendedor(cep,idvendedor){
    this.listaFreteVendedor = [];
    this.listaEnderecoCliente = [];
    let i = 0;
    if(cep == ''){
      console.log("CEP VAZIO");
    }else if(idvendedor == ''){
      console.log("CÓDIGO DO VENDEDOR VAZIO");
    }else if(this.enderecos.length <= 0){
      if(this.sessaoUsuario){
        this.sUser.getEnderecoDefault(this.sessaoUsuario.cpfCnpj).subscribe(
          endUsuario =>{
            for(let e of endUsuario){
              this.listaEnderecoCliente.push({
                position:i,
                tipo:"cliente",
                endereco:e.endereco,
                numero:e.numero,
                cidade:e.cidade,
                uf:e.estado,
                nome:e.responsavel
              });
              i++;
            }
          },
          e =>{
            console.log(e);
            console.log("ERRO AO BUSCAR OS ENDEREÇOS DO CLIENTE");
          }
        );
        this.sUser.getEnderecoSecundario(this.sessaoUsuario.cpfCnpj).subscribe(
          endUsuario =>{
            for(let e of endUsuario){
              this.listaEnderecoCliente.push({
                position:i,
                tipo:"cliente",
                endereco:e.endereco,
                numero:e.numero,
                cidade:e.cidade,
                uf:e.estado,
                nome:e.responsavel
              });
              i++;
            }
          });
      }

      this.sVendedor.getEndereco(cep.replace("-",""),idvendedor).subscribe(
        endVendedor =>{
          for(let e of endVendedor){
            this.listaFreteVendedor.push({
              position:i,
              tipo:"vendedor",
              endereco:e.Endereco,
              numero:e.Numero,
              cidade:e.Cidade,
              uf:e.UF,
              nome:e.Nome
            });
            i++;
          }
        },
        e =>{
          console.log("ERRO AO BUSCAR OS ENDEREÇOS DO VENDEDOR");
        }
      );
    }
  }

  logout(){
    this.sUser.logout();
    this.router.navigate(['/user','login']);
  }

 
  ngOnInit() {
    $(".loading").fadeIn(0);
    this.cepFormat = this.sDados.cepFormat;
    this.cepConsultado = (this.sFrete.buscaUltimoCEPCalculado())?this.sFrete.buscaUltimoCEPCalculado():"";
    

    if(this.cepConsultado){
      this.cepFrete = this.cepConsultado;
    }
    this.sessaoVendedor = (this.sVendedor.getVendedor())?this.sVendedor.getVendedor():false;
    this.sessaoUsuario  = (this.sUser.getCustomer())?this.sUser.getCustomer():false;
    this.emailLogin     = (this.sessaoUsuario)?this.sessaoUsuario.cusEmail:'';

    if ( this.sessaoVendedor.idVendedor != undefined ) {
      localStorage.setItem("idVendedor", this.sessaoVendedor.idVendedor);
    } else {
      localStorage.setItem("idVendedor", '0');
    }

    if(this.sessaoVendedor){
      if(this.cepFrete != ''){
        this.getEnderecoVendedor(this.cepFrete,this.sessaoVendedor.idVendedor);
      }
      this.paginaInicial = ['/vendedor','produtos'];
    }
    
    this.route.params.subscribe(params => {
      this.sessionCarrinho = params.sessaocarrinho;
      if(params.sessaocarrinho != undefined){
        this.sCarrinho.getCarrinhoBySessao(params.sessaocarrinho).subscribe(r=>{
          this.montaProdutosSessao(r);
          this.isAbandonoCarrinho = true;
        },
        e => {
          Swal.fire(
            'Ops!',
            'Hove uma falha ao recuperar o carrinho abandonado.',
            'error'
          );
          $(".loading").fadeOut(0);
        });
      }else{
        this.getProdutosCarrinho();
      }
    })
 
  }

  private async montaProdutosSessao(produtos:any){
    this.totalCompra = 0;
    let dimensoes,jsonCompra,slug,garantias,jsonCadastroSessao;
    let idRetiraLoja = 0;
    if(this.sCarrinho.removeLocalStorageCadastroSessao() && this.sCarrinho.limparCarrinho()){
      this.sCarrinho.setLocalStorageCadastroSessao(this.sessionCarrinho,this.sessionCarrinho);

      if(produtos.length > 0){
        this.qtdProduto =produtos.length;
        for(let p of produtos){

          dimensoes =  {
            altura      :p.altura,
            largura     :p.largura,
            comprimento :p.comprimento,
            cubage      :p.cubage
          };

          slug        = p.link.split("/");
          garantias   = (p.garantias.length > 0)?this.sGarantia.getGarantiaById(p.garantias,0):'';
          jsonCompra  = this.sCarrinho.getJsonCompra(p.id,p.descricao,p.categoriamkt,p.imagem,p.idseller,p.sellerName,p.gradey,p.gradex,p.skuProduto,p.skuSeller,p.urlFrete,dimensoes,p.quantidade,slug[1],p.maxCompra,'loja','','',garantias,'');
          idRetiraLoja= (p.retiraloja != '')?p.retiraloja.idLoja:0;
          jsonCadastroSessao = this.sCarrinho.getDadosCadastroSessao(p.skuProduto,'0',p.quantidade,idRetiraLoja,this.emailLogin);
          if(!this.sCarrinho.setProdutoCarrinho(jsonCompra,p.quantidade)){
            console.log("ERRO AO INSERIR PRODUTO NO CARRINHO - SESSÃO: ",jsonCompra);
          }else{
            this.sCarrinho.cadastroSessaoCarrinho(jsonCadastroSessao).subscribe(v => {
              if(v.Code == "success"){
                this.sCarrinho.setLocalStorageCadastroSessao(v.session,v.cookie);
              }
            });
          }
        }
        this.getProdutosCarrinho();
      }
    }else{
      alert("ERRO AO REMOVER LOCALSTORAGE SESSÃO");
    };
  }

  private async getProdutosCarrinho(){
    
    let produtos;
    this.totalCompra = 0;
    produtos = this.sCarrinho.getProdutosCarrinho();
    this.isAbandonoCarrinho = false;
    // REMOVE OS PRODUTOS QUE NAO FOR DO VENDEDOR
    if(this.sessaoVendedor){
      this.sCarrinho.removerProdutosVendedor(this.sessaoVendedor.idVendedor);
      $(".loading").fadeOut(0);
    }
    // REMOVE OS PRODUTOS QUE FOI DO VENDEDOR
    if(!this.sessaoVendedor){
      this.sCarrinho.removerProdutos();
    }
    
    if(produtos.length > 0){
      this.produtosCarrinho = this.sCarrinho.getProdutosCarrinho();
      this.qtdProduto       = this.sCarrinho.getQuantidadeProdutosCarrinho();
      this.getPrecoProduto(this.produtosCarrinho);
      let qtd = 0;
      for(let p of this.produtosCarrinho){
        if(p.quantidade > 0){
          await this.sProduto.getEstoqueProduto(p.skuProduto,p.quantidade).subscribe(r =>{
              p.estoque        = r[0].proStock;
              p.arrayMaxCompra = this.getQtdMaximaCompra(p.maxCompra,p.estoque);

              if(this.produtoSemEstoque.length > 0){
                this.removeProdutoSemEstoque(p);
              }
              $(".loading").fadeOut(0);
            },
            e =>{
              this.produtoSemEstoque.push(p);
              $(".loading").fadeOut(0);
              p.estoque = -1;
            })
        }else{
          $(".loading").fadeOut(0);
          p.estoque  = -1;
        }
        qtd++;
      }
      if(this.cepFrete != ''){
        this.calcularFrete(this.cepFrete);
      }
    }else{
      $(".loading").fadeOut(0);
    }
  }
  private getPrecoProduto(produto:any){
    let qtd = 0;
    let qtdTotal = produto.length;
    if(produto.length > 0){
      produto.forEach((vProd:any,k:number) => {
        qtd++;
        this.buscaPrecoProduto(vProd,k,qtd,qtdTotal);
      });
    }
  }

  private buscaPrecoProduto(produto:any,posicao:number,qtd,qtdTotal){
    
    let resultadoPreco;
    this.sProduto.getPrecoProduto(produto.id,produto.skuProduto,produto.quantidade).subscribe(r => {
      resultadoPreco = r[0];
    },
    error => {
      console.log(error,'Falha ao buscar Preço');
    },
    () =>{
      // this.removeCarregandoEfeito(posicao,"produto");
      this.produtosCarrinho[posicao].preco = resultadoPreco.preco;
      this.produtosCarrinho[posicao].total = resultadoPreco.total;
      this.listaProduto    = this.produtosCarrinho;
      this.calcularTotalCompra(0,0,0);
      this.productLoding = false;
      if(qtd == qtdTotal){
        this.undisabled();
      }
    });
  }
  /*
    rProduto:number // valor para ser subtraido do total
    rServico:number // valor para ser subtraido do total
    rFrete  :number // valor para ser subtraido do total
    vFrete  :number // valor para adicionar ao Frete
  */
  private calcularTotalCompra(rProduto,rServico,rFrete,buscaParcela = false){
    let totalProd = 0, totalFret = 0, totalServ = 0, totalPedido = 0;
    let valordesconto = 0;
    this.parcela = {};
    rProduto = parseFloat(rProduto);
    rServico = parseFloat(rServico);
    rFrete   = parseFloat(rFrete);

    if(rProduto > 0){
      totalProd = (totalProd - rProduto);
    }
    if(rServico > 0){
      totalServ = (totalServ - rServico);
    }
    if(rFrete > 0){
      totalFret = (totalFret - rFrete);
    }

    this.produtosCarrinho.forEach((v,k) => {
      totalProd += parseFloat(v.total);
      totalFret += (v.frete != "")?parseFloat(v.frete.shippingCost):0;
      totalServ += this.getValorGarantiaByProduto(v,v.quantidade);
      totalServ += this.getValorMontagemByProduto(v,v.quantidade);
    });

    totalPedido = (totalProd + totalFret) + totalServ;
    this.totalProdutos  = totalProd;
    this.totalFrete     = totalFret;
    this.totalServicos  = totalServ;
    this.totalCompraView= totalPedido;
    valordesconto       = ((totalPedido * this.descontoBoleto) / 100);
    this.boleto         = (totalPedido - valordesconto);    
    
    if(this.countProdutos == (this.produtosCarrinho.length - 1) || buscaParcela === true){
      this.getParcela(totalPedido);
      this.countProdutos  = 0;
      this.countProdutos--;
    }
    this.countProdutos++;
  }
  private getParcela(total:number){
    if(this.sCarrinho.getSessionCarrinho()){
      this.sCarrinho.getParcelamento(this.sCarrinho.getSessionCarrinho(),total).subscribe(
        r=>{
          this.parcela = this.getParcelasSemJuros(r.parcelas);
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

  private getValorGarantiaByProduto(produto:any,quantidade:number){
    let garantia;
    let valor = 0;
    if(garantia = produto.garantias){
      garantia.forEach(p => {
        if(p.checked == "T"){
          valor = parseFloat(p.valor);
        }
      });
    }
    valor = (valor * quantidade);
    return valor;
  }

  private getValorMontagemByProduto(produto:any,quantidade:number){
    let montagem;
    let valor = 0;
    if(montagem = produto.montagem){
      montagem.forEach(p => {
        if(p.checked == "T"){
          valor = parseFloat(p.valor);
        }
      });
    }
    valor = (valor * quantidade);
    return valor;
  }

  private getQtdMaximaCompra(qtd:number,estoque:number){
    let arrayQtd = [];
    let quantidade = 0;
    if(estoque >= qtd){
      quantidade = qtd;
    }else{
      quantidade = estoque;
    }
    for(let i = 1; i <= quantidade; i++){
      arrayQtd.push(i);
    }
    return arrayQtd;
  }
  // **************************** FRONT ******************************
  selecionaMontagem(produto,idservice:any,event,i:number){
    let qtdAnterior      = produto.quantidade;
    let resultMontagem;
    let servicosSubtrair = this.getValorMontagemByProduto(produto,qtdAnterior);
    let jsonCadastroSessao,idServicesRules;
    let valorGarantia    = 0;
    this.totalServicos   = (this.totalServicos - servicosSubtrair);
    this.totalCompraView = (this.totalCompraView - servicosSubtrair);
    let idRetiraLoja     = 0;
    $(".fieldset-montagem[id='"+i+"']").attr("disabled", "disabled");

    setTimeout(()=>{
      $(".fieldset-montagem[id='"+i+"']").removeAttr("disabled");
    },700);

    // NENHUMA MONTAGEM ESCOLHIDA
    if(!event.srcElement.checked){
      idservice = 0;
    }

    if(resultMontagem  = this.sMontagem.getMontagemById(produto.montagem,idservice)){
      produto.montagem = resultMontagem;
      this.sCarrinho.setProdutoCarrinho(produto,produto.quantidade); // ATUALIZA PRODUTO COM NOVA MONTAGEM ESCOLHIDA
      valorGarantia  = 0;
      idServicesRules    = (produto.garantias != '')?this.sGarantia.getIdServiceRules(produto.garantias):0;
      idRetiraLoja       = (produto.retiraloja != '')?produto.retiraloja.idLoja:0;
      jsonCadastroSessao = this.sCarrinho.getDadosCadastroSessao(produto.skuProduto,idServicesRules,produto.quantidade,idRetiraLoja,'');

      this.sCarrinho.cadastroSessaoCarrinho(jsonCadastroSessao).subscribe(v => {
        if(v.Code == "success"){
          this.sCarrinho.setLocalStorageCadastroSessao(v.session,v.cookie);
        }
      });
      resultMontagem.forEach((v,k) => {
        if(idservice == v.idServices){
          valorGarantia = this.getValorGarantiaByProduto(produto,qtdAnterior);
          this.calcularTotalCompra(0,0,0,true);
        }
        if(!v.checked || v.checked != 'T'){
          this.calcularTotalCompra(0,0,0),true;
        }
      });
    }
  }
  selecionaGarantia(produto,idgarantia:any,event,i:number){
    let qtdAnterior      = produto.quantidade;
    let resultGarantia;
    let servicosSubtrair = this.getValorGarantiaByProduto(produto,qtdAnterior);
    let jsonCadastroSessao,idServicesRules;
    let valorGarantia    = 0;
    this.totalServicos   = (this.totalServicos - servicosSubtrair);
    this.totalCompraView = (this.totalCompraView - servicosSubtrair);
    let idRetiraLoja     = 0;
    $(".fieldset-garantia[id='"+i+"']").attr("disabled", "disabled");
    setTimeout(()=>{
      $(".fieldset-garantia[id='"+i+"']").removeAttr("disabled");
    },700);

    if(!event.srcElement.checked){
      
      idgarantia = 0;
    }
    if(resultGarantia  = this.sGarantia.getGarantiaById(produto.garantias,idgarantia)){
      produto.garantias = resultGarantia;
      this.sCarrinho.setProdutoCarrinho(produto,produto.quantidade); // ATUALIZA PRODUTO COM NOVA GARANTIA ESCOLHIDA
      valorGarantia  = 0;
      idServicesRules    = this.sGarantia.getIdServiceRules(produto.garantias);
      idRetiraLoja       = (produto.retiraloja != '')?produto.retiraloja.idLoja:0;
      jsonCadastroSessao = this.sCarrinho.getDadosCadastroSessao(produto.skuProduto,idServicesRules,produto.quantidade,idRetiraLoja,'');

      this.sCarrinho.cadastroSessaoCarrinho(jsonCadastroSessao).subscribe(v => {
        if(v.Code == "success"){
          this.sCarrinho.setLocalStorageCadastroSessao(v.session,v.cookie);
        }
      });
      resultGarantia.forEach((v,k) => {
        if(idgarantia == v.idServices){
          valorGarantia = this.getValorGarantiaByProduto(produto,qtdAnterior);
          this.calcularTotalCompra(0,0,0,true);
        }
      });
    }
  }

  // BOTÃO CALCULAR FRETE
  calcularFrete(cep){
    let calcFrete;
    let qtd = 0;
    let qtdTotal = this.produtosCarrinho.length;
    if(!this.freteDisabled){
      if(cep.length == 9){
        this.disabled();
        this.calculoFrete = true;
        this.cep          = cep.replace("-",'');
        this.totalFrete   = 0;
        this.sRequisicao.getInfoCep(cep).subscribe(
          c=>{
            this.infoCep = c;
            this.sFrete.gravarUltimoCepCalculado(cep);
            
            if(this.sessaoVendedor){
              this.getEnderecoVendedor(cep,this.sessaoVendedor.idVendedor);
              this.cepFrete = cep;
            }
            this.produtosCarrinho.forEach((v,k) => {
              if(v.retiraloja == ''){
                if(calcFrete = this.sFrete.calculaFrete(cep,v)){
                  calcFrete.subscribe(
                    r =>{
                      localStorage.setItem("frete", r.shippingQuotes[0].shippingMethodId);
                      v.frete = r.shippingQuotes[0];
                      this.cepFrete = cep;
                    },
                    e => {
                      console.error("ERRO AO CALCULAR FRETE",e);
                    }).add(()=>{
                      
                      if(qtd == qtdTotal){
                        this.calcularTotalCompra(0,0,0);
                        this.undisabled();
                      }
                    });
                }else{
                  if(qtd == qtdTotal){
                    this.undisabled();
                  }
                  v.frete = false;
                }
              }else{
                this.undisabled();
                v.frete = false;
              }
              qtd++
            });
          },
          e =>{
            // this.removeCarregandoEfeito(0,"localFrete");
            this.infoCep     = [];
            this.alertaFrete = this.sDados.getAlerta("Ops!","O CEP inserido não foi encontrado.",'warning');
            this.produtosCarrinho.forEach((v,k) => {
              v.frete = '';
              this.undisabled();
            });
            setTimeout(()=>{this.alertaFrete = '';},3000);
        });

      }else{
        this.alertaFrete = this.sDados.getAlerta("Ops!","Por favor, insira um CEP para prosseguir.",'warning');
        setTimeout(()=>{this.alertaFrete = '';},3000);
        this.undisabled();
      }
    }
  }
  removeProdutoSemEstoque(produto:any){
    let array = [];
    if(this.produtoSemEstoque.length > 0){
      for(let p of this.produtoSemEstoque){
        if(p.skuProduto != produto.skuProduto && p.id != produto.id){
          array.push(p);
        }
      }
    }
    this.produtoSemEstoque = array;
  }
  // DROPDOWN DE ALTERAR QUANTIDADE
  alterarQuantidade(produto:any,event,posicao:number,qtd = 0){
    let qtdEscolhida      = (event != false)?event.target.value:qtd;
    let qtdAnterior       = produto.quantidade;
    let quantidadeProduto = 0;
    let idServicesRules   = '';
    let idRetiraLoja      = 0;
    let div = document.querySelector(".carrinho-list").childElementCount;

    if(qtdEscolhida <= 0){ // REMOVER PRODUTO
      $(".carrinho-list").find("#item-"+posicao).addClass("div-loading").hide(500);
      if(div > 0){
        for(let i = 0; i < div; i++){
          document.querySelector("#item-"+i).classList.add("div-loading");
        }  
      }
      this.sCarrinho.removeProdutoCarrinho(produto);
      let totalG  = this.getValorGarantiaByProduto(produto,qtdAnterior);
      let totalM  = this.getValorMontagemByProduto(produto,qtdAnterior);
      let totalGM = (totalG + totalM);
      this.calcularTotalCompra(produto.total,totalGM,produto.frete.shippingCost,true);
      let qtd    = this.qtdProduto - produto.quantidade;
      this.qtdProduto = qtd;
      
      if(this.produtoSemEstoque.length > 0){
        this.removeProdutoSemEstoque(produto);
      }
      if(div > 0){
        setTimeout(()=>{
          for(let i = 0; i < div; i++){
            document.querySelector("#item-"+i).classList.remove("div-loading");
          }  
        },1000);
      }
      
      this.getProdutosCarrinho();
      // if(this.cepFrete != ''){
      //   setTimeout(()=>{
      //     this.calcularFrete(this.cepFrete);
      //   },500);
      // }
    }else{
      this.disabled();
      if(qtdEscolhida > produto.maxCompra){ // QTD MAIOR QUE PERMITIDA
        this.getProdutosCarrinho();
        }else{
          $(".carrinho-list").find("#item-"+posicao).addClass("div-loading");
          this.sProduto.getEstoqueProduto(produto.skuProduto,qtdEscolhida).subscribe(() =>{ // BUSCA ESTOQUE
            quantidadeProduto  = parseInt(qtdEscolhida);
            if(this.sCarrinho.setProdutoCarrinho(produto,qtdEscolhida,'carrinho')){
              produto.quantidade = quantidadeProduto;
              idServicesRules    = (produto.garantias.length > 0)?this.sGarantia.getIdServiceRules(produto.garantias):null;
              idRetiraLoja       = (produto.retiraloja != '')?produto.retiraloja.idLoja:0;
              
              this.sCarrinho.cadastroSessaoCarrinho(
                this.sCarrinho.getDadosCadastroSessao(produto.skuProduto,idServicesRules,quantidadeProduto,idRetiraLoja,'')
              ).subscribe(v => {
                if(v.Code == "success"){
                  this.sCarrinho.setLocalStorageCadastroSessao(v.session,v.cookie);
                }
              });
              
              let qtd      = 0;
              let qtdTotal = this.produtosCarrinho.length;
              this.produtosCarrinho.forEach((v,k) => {
                if(produto.id == v.id && v.skuProduto == produto.skuProduto){
                  this.buscaPrecoProduto(v,k,qtd,qtdTotal);
                  qtd++;
                }
              });
              this.qtdProduto = this.sCarrinho.getQuantidadeProdutosCarrinho();
              $(".carrinho-list").find("#item-"+posicao).removeClass("div-loading");
              this.undisabled();
              if(this.cepFrete != ''){
                this.calcularFrete(this.cepFrete);
              }
            }else{
              console.log("FALHA AO INSERIR PRODUTO NO CARRINHO!");
            }
          },
          e =>{
            Swal.fire('Ops!','Este produto não tem estoque.','error');
            this.getProdutosCarrinho();
            this.undisabled();
          });
        }
    }
  }
 public selecionaEndereco(endereco){
    if(endereco != ''){
      this.enderecoSelecionado = {
        endereco:endereco.endereco,
        numero:endereco.numero,
        cidade:endereco.cidade,
        uf:endereco.uf,
        nome:endereco.nome
      };
    }
  }

  public modoVendedor(){
    if(this.sVendedor.getVendedor()){
      return true;
    }
    return false;
  }

  continuarCompra(){
    let produtosErros = '';
    let entregaVendedor = (this.enderecoSelecionado)?this.enderecoSelecionado:'';
    let produtos = [];
    let erroNome = '';
    let retorno;
    let isErro   = 0;
    let vendedor;

    if(this.produtoSemEstoque.length <= 0){
        if(this.modoVendedor()){
          vendedor = this.sVendedor.getVendedor();
          retorno  = this.sCheckout.montaCarrinhoCheckoutVendedor(this.produtosCarrinho,entregaVendedor,vendedor);
        }else{
          retorno  = this.sCheckout.montaCarrinhoCheckout(this.produtosCarrinho);
        }
        if(this.sessaoVendedor && entregaVendedor == ''){
          Swal.fire(
            'Ops!',
            'Selecione um endereço de entrega!',
            'warning'
          );
        }else{
          for(let r of retorno){
            if(r.status == "erro"){
              erroNome = '';
              for(let erro of r.erros){
                erroNome += '<span style="font-size:13px;display:block">'+erro.errorMsg+'</span>';
              }
              produtosErros += `
                <p>
                  - <strong style="font-size:13px">`+r.produtos.descricao+`</strong>
                  `+erroNome+`
                </p>
              `;
              isErro++;
            }else{
              produtos.push(r);
            }
          }
          if(isErro > 0){
            this.swalAlerta(produtosErros,produtos);
          }else{
            if(this.sCheckout.setProdutoCheckout(produtos)){
              this.router.navigate(['/compras/checkout-pagamento/']);
            }else{
              alert("ERRO AO INSERIR ITEM NO CARRINHO-CHECKOUT");
            }
          }
        }
    }else{
      Swal.fire(
        'Ops!',
        'Estoque indisponível. Por favor remova os itens que não possuem estoque.',
        'error'
      );
    }
  }

  swalAlerta(produtosErros,produtos){

    Swal.fire({
      title: 'Ops!',
      icon: 'error',
      html:
        `
          Foi encontrado alguns problemas nos seguintes produtos:
          `+produtosErros+`
          Os produtos acimas não poderão processeguir na compra.
        `,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        'Ok, continuar',
      confirmButtonAriaLabel: 'Ok, continuar',
      cancelButtonText:
        'Cancelar',
      cancelButtonAriaLabel: 'Cancelar'
    }).then((result) => {
      if (result.value) {
       if(this.sCheckout.setProdutoCheckout(produtos)){
        this.router.navigate(['/compras/checkout-pagamento/']);
       }else{
         alert("ERRO AO INSERIR ITEM NO CARRINHO-CHECKOUT");
       }
      }
    });
  }

  public disabled(){
    let elements = this.btnsDisabled;
    for(let e of elements){
      if(document.querySelector(e)){
        document.querySelector(e).setAttribute('disabled','');
      }
    }
    this.compraDisabled = true;
    this.freteDisabled  = true;
  }
  public undisabled(){
    let elements = this.btnsDisabled;
    for(let e of elements){
      if(document.querySelector(e)){
        document.querySelector(e).removeAttribute('disabled');
      }
    }
    this.compraDisabled = false;
    this.freteDisabled  = false;
  }
}
