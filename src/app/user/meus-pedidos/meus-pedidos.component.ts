import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { MeusPedidosService } from 'src/app/_services/meus-pedidos.service';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
@Component({
  selector: 'app-meus-pedidos',
  templateUrl: './meus-pedidos.component.html',
  styleUrls: ['./meus-pedidos.component.css']
})

export class MeusPedidosComponent implements OnInit {

  itemsPerPage = 5; // Produtos por página;
  p: number = 1;
  public nome;
  public idMeusPedidos:any;
  public contaPedidos: number;
  public ListaPedidos:any;
  public statusPedido:any;
  public paginaCarregada:boolean = false;

  constructor(
    private sUser: UserService,
    private sMeusPedidosService: MeusPedidosService
  ) { 

    this.nome          = this.sUser.getCustomer().cusFantasyName;
    this.idMeusPedidos = this.sUser.getCustomer().cpfCnpj;

    this.sMeusPedidosService.listaPedidos(this.idMeusPedidos).subscribe(r => {
      this.contaPedidos = r.length;
      this.ListaPedidos = r;
      this.paginaCarregada = true;
      setTimeout(() => {
        this.loadingHeight();
      }, 100);
    });

  }

  ngOnInit() {
    for(let i =0; i<this.contaPedidos; i++){
        let listaItem = this.ListaPedidos[i];
    }    

  }
 
  public abrirPedido(el){
    
    // document.querySelectorAll('.mc-box-pedido').forEach(e=>{
    //   if(e.classList.contains('active')){
    //     e.classList.remove('active');
    //     e.querySelectorAll('.mc-info-wrapper .mc-info-product > .info-short-wrapper').forEach(el=>{
    //       let ele = el.parentElement;
    //       let el2 = ele.parentElement;
    //       let el3 = el2.parentElement;
  
    //       ele.style.height = el.clientHeight + 'px';
    //       el3.style.height = el2.clientHeight + 'px';
    //     })
    //   }
    // });

    let box = el.parentElement.parentElement.parentElement;
    let div;
    let div2;
    let div3;
    let wrapper = box.querySelector('.mc-pedido-wrapper').clientHeight;

    if(box.classList.contains('active')){
      box.classList.remove('active');
    } else {
      box.classList.add('active');
    }
 
      box.querySelectorAll('.mc-info-wrapper .mc-info-product > .info-short-wrapper').forEach(el=>{
        div = el.parentElement;
        div2 = div.parentElement;
        div3 = div2.parentElement;

        if(!box.classList.contains('active')){
          div.style.height = el.clientHeight + 'px';
          div3.style.height = div2.clientHeight + 'px';
        } else {
          div.style.height = 'auto';
          let height = div2.clientHeight + wrapper;
          div3.style.height = height + 'px';
        }
      })
 

    // if(document.querySelector('#'+id).classList.contains('active')){ //
    //   document.querySelector('#'+id).classList.remove('active')
    // } else {
    //   document.querySelector('#'+id).classList.add('active'); 
    // }

  }

  public status(processos:any){
    let json = {
      status:[],
      barraStatus:0
    };
    for(let p of processos){
      json.status.push(
        {
          descricao:p.descricao,
          data_criacao:p.data_criacao
        }
        );
    }
    json.barraStatus = this.progressBar(processos[processos.length - 1].idStatus);
    return json;
  }

  public progressBar(percen){
    if(percen == 1){
      return 20; 
    }else if(percen == 2){
      return 40;
    }else if(percen == 3){
      return 60;
    }else if(percen == 4){
      return 80;
    }else if(percen == 5){
      return 100;
    }
  }

  public valorTotalPedido(valorTotal:any, desconto:any, valorFrete:any){
    let valorTotalPedido = (valorTotal - desconto) + valorFrete;
    return valorTotalPedido;
  }

  public abrirPagamento(str:any, link:any){
    let link_pagamento;
    if(str == 'BOLETO'){
      link_pagamento = window.open(link);
    }
  }

  public loadingHeight(){
    let box = document.querySelectorAll('.mc-box-pedido');
    let div;
    let div2;
    let div3;
    document.querySelectorAll('.mc-box-pedido').forEach(e=>{
      e.querySelectorAll('.mc-info-wrapper .mc-info-product > .info-short-wrapper').forEach(el=>{
        div = el.parentElement;
        div2 = div.parentElement;
        div3 = div2.parentElement;
        div.style.height = el.clientHeight + 'px';
        div3.style.height = div2.clientHeight + 'px';
      })
    });

    // box.forEach(e=>{
    //   e.querySelectorAll('.mc-info-wrapper').forEach(el=>{
    //     el.querySelectorAll('.mc-info-product').forEach(elel=>{
    //       console.log(elel);
    //       elel.querySelectorAll('.info-short-wrapper').forEach(element=>{
    //         height = element.clientHeight;
    //         let div = el.parentElement;
    //         div.style.height = height + 'px';
    //       })
    //     })
    //   })
    // })
  }



  
}
