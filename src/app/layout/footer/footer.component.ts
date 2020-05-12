import { Component, OnInit, Input } from '@angular/core';
import { MarketingService } from 'src/app/_services/marketing.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input() cnpj;
  @Input() cep;
  @Input() telefone;
  @Input() email;
  @Input() endereco;
  @Input() estado;
  @Input() numero;
  @Input() cidade;
  @Input() url_site;
  @Input() url_imagens;
  @Input() email_atendimento;
  @Input() facebook;
  @Input() instagram;
  @Input() youtube;
  @Input() twitter;

  public seloEbit;
  public merchant_id:any;
  public html: string;
  public overlay;

  constructor(
    private sMarketingService:MarketingService
  ) { 
    this.merchant_id = '123456s';
    
  }

  ngOnInit() {

    this.seloEbit = this.sMarketingService.seloEbitRodape(this.merchant_id);

    this.overlay = document.querySelector('.overlay');
    this.getFooterClick();
  }

  public openFooter(el){
    let footer =  document.querySelector('.footer-middle');
    if(footer.classList.contains('expand')){
      footer.classList.remove('expand');
      el.classList.remove('expand');
      el.setAttribute('expandend', 'mais informações');
    } else {
      footer.classList.add('expand');
      el.classList.add('expand');
      el.setAttribute('expandend', 'menos informações');
    }
  }
  
  public showOverlay(){
    this.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  public removeOverlay(){
    this.overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  public closeFooterMobileAll(){
    document.querySelectorAll('.categoria-footer li').forEach(element => {
      element.classList.remove('active');
    });
    this.removeOverlay();
    window.scrollTo(0, 0);
    document.body.style.overflow = 'auto';
  }

  public getFooterClick(){
    document.querySelectorAll('.footer-link a').forEach(element => {
      element.addEventListener('click', ()=>{
        this.closeFooterMobileAll();
      })
    });
  }

  public openFooterMobile(){
    document.querySelector('.mobile-footer-side').classList.add('active');
    this.showOverlay();
  }

  public closeFooterMobile(){
    document.querySelector('.mobile-footer-side').classList.remove('active');
    this.removeOverlay();
  }

  public footerInformacoes(){
    if(document.querySelector('.footer-informacoes').classList.contains('active')){
      document.querySelector('.footer-informacoes').classList.remove('active');
    } else {
      document.querySelector('.footer-informacoes').classList.add('active');
    }
  }

  public footerDuvidas(){
    if(document.querySelector('.footer-duvidas').classList.contains('active')){
      document.querySelector('.footer-duvidas').classList.remove('active');
    } else {
      document.querySelector('.footer-duvidas').classList.add('active');
    }
  }

  public footerInstitucional(){
    if(document.querySelector('.footer-institucional').classList.contains('active')){
      document.querySelector('.footer-institucional').classList.remove('active');
    } else {
      document.querySelector('.footer-institucional').classList.add('active');
    }
  }

}
