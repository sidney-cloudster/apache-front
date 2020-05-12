import { Component, OnInit } from '@angular/core';
import { configEnvi } from 'src/environments/environment';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  
  public titulo:any;
  public descricao:any;
  public cnpj:any;
  public cep:any;
  public telefone:any;
  public email:any;
  public endereco:any;
  public estado:any;
  public numero:any;
  public cidade:any;
  public url_site:any;
  public url_imagens:any;
  public email_atendimento:any;
  public facebook:any;
  public instagram:any;
  public youtube:any;
  public twitter:any;
  public logo:any;
  public hotsites:any;

  constructor(private sConfig:configEnvi) { }

  ngOnInit() {
    this.titulo    = this.sConfig.getTitulo();
    this.descricao = this.sConfig.getDescricao();
    this.logo      = this.sConfig.getLogo();
    this.hotsites  = this.sConfig.getHotsites();
    this.cnpj      = this.sConfig.getCnpj();
    this.cep       = this.sConfig.getCep();
    this.telefone  = this.sConfig.getTelefone();
    this.email     = this.sConfig.getEmail();
    this.endereco  = this.sConfig.getEndereco();
    this.estado    = this.sConfig.getEstado();
    this.numero    = this.sConfig.getNumero();
    this.cidade    = this.sConfig.getCidade();
    this.url_site  = this.sConfig.getUrl_site();
    this.url_imagens  = this.sConfig.getUrl_imagens();
    this.email_atendimento = this.sConfig.getEmail_atendimento();
    this.facebook  = this.sConfig.getFacebook();
    this.instagram = this.sConfig.getInstagram();
    this.youtube   = this.sConfig.getYoutube();
    this.twitter   = this.sConfig.getTwitter();
  }
}
