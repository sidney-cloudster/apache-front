import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-menu-user',
  templateUrl: './menu-user.component.html',
  styleUrls: ['./menu-user.component.css']
})
export class MenuUserComponent implements OnInit {

  @Input() paginaAtual;
  public customer;
  public compras = [
    {
      menu:'Meus pedidos',
      link:['/user','meus-pedidos']
    },
    {
      menu:'Favoritos',
      link:['/user','favoritos']
    }
  ]
  public configuracoes = [
    {
      menu:'Minha Conta',
      link:['/user','minha-conta']
    },
    {
      menu:'Endereços',
      link:['/user','enderecos']
    }
  ]
  public atendimento = [
    {
      menu:'Atendimentos',
      link:['/user','atendimentos']
    },
    {
      menu:'Chat',
      link:['/user','chat']
    }
  ]
  constructor(
    private sUser:UserService
  ) {
    this.customer = this.sUser.getCustomer();
  }

  ngOnInit() {
    this.clickRemoveOverflow();
  }
  
  public openDropDown(pagina:any){
    let c;
    for(let m of this.compras){
      if(m.link[1] == pagina){
        c = 'compras'
      }
    }
    for(let m of this.configuracoes){
      if(m.link[1] == pagina){
        c = 'configuracoes'
      }
    }
    for(let m of this.atendimento){
      if(m.link[1] == pagina){
        c = 'atendimento'
      }
    }
    return c;
  }

  public checkPage(link,pagina){
    for(let m of this.compras){
      if(m.link[1] == link[1] && m.link[1] == pagina){
        return true
      }
    }
    for(let m of this.configuracoes){
      if(m.link[1] == link[1] && m.link[1] == pagina){
        return true
      }
    }
    for(let m of this.atendimento){
      if(m.link[1] == link[1] && m.link[1] == pagina){
        return true
      }
    }
  }

  public openMenu(e){
    let element = e.parentElement;
    if(element.classList.contains('active')){
      element.classList.remove('active')
    } else {
      element.classList.add('active')
    }
  }

  openSide(){
    let side = document.querySelector('#sidebar-minhaconta');
    side.classList.add('active');
    this.openOverlay();
    document.body.style.overflow = 'hidden';
  }

  closeSide(){
    let side = document.querySelector('#sidebar-minhaconta');
    side.classList.remove('active');
    this.closeOverlay();
    document.body.style.overflow = 'auto';
  }

  overlayClick(){
    let side = document.querySelector('#sidebar-minhaconta');
    if(side.classList.contains('active')){
      this.closeSide();
    }
  }

  openOverlay(){
    document.querySelector('.overlay-body').classList.add('active');
  }

  closeOverlay(){
    document.querySelector('.overlay-body').classList.remove('active');
  }

  public clickRemoveOverflow(){
    document.querySelectorAll('.sdm-link').forEach(e=>{
      e.addEventListener('click',()=>{
        this.closeSide();
      })
    })
  }

}
