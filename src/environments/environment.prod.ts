export const environment = {
  production: false,
};

export const carrinho = {
  keyCarrinho: '_carrinho-compra'
}

export const checkout = {
  keyCheckout: '_checkout-compra-carrinho'
}

export const infoCasamento = {
  name:'CAS-INF',
  keyUser: '_info-casamento'
}

export const infoCasamentoConvidado = {
  name:'CAS-INF-CONV',
  keyUser: '_info-casamento-conv'
}

export const userData = {
  name:'USE-L',
  keyUser: '_user-login'
}

export const vendedorData = {
  name:'VEND-L',
  keyUser: '_vendedor-login'
}

export const lojaData = {
  keyIdLoja: '_loja-id'
}

export const configGeral = {
  paginacao:{
    quantidadeItem:18,
    paginaIniciada:1
  }
}

export const api = {
  urlbase: "https://viamarketplace.com.br/",  
  //gazin
  // key: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkV2ZXJ0b24gZGEgU2lsdmEiLCJhZG1pbiI6dHJ1ZSwianRpIjoiMzk0ODI1MDQwZDIxNDc2OWYwNDIyOWVjZGFlOWI4MDJiZGI3NDRiMjk3ODA3ZDQ5ZGM5MmI3MzZmN2RhZTRiOCIsImlhdCI6MTU4Mzc1OTY5NSwiZXhwIjoxNjE1MjA5Mjk1LCJlbWFpbCI6ImV2ZXJ0b25AcHJlY29kZS5jb20uYnIiLCJlbXByZXNhIjoiUHJlY29kZSIsInNjaGVtYSI6ImdhemluIiwiaWRTY2hlbWEiOjMsImlkU2VsbGVyIjozLCJpZFVzZXIiOjF9.EYgQsxRp0gahJx4MU9OdWEzIq/x5ll0nsoPH8fxtkdI=',
  // multiloja
  key: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkV2ZXJ0b24gZGEgU2lsdmEiLCJhZG1pbiI6dHJ1ZSwianRpIjoiNjlmZTljNzAyZDA4ZmY0MDlmNWExODFmZDllNTU5MzVmYjcwY2QxMDkwYWVlOTY4ZjJiNzNkYmJmZTRmNTJlZCIsImlhdCI6MTU4Mzc2MDY1MywiZXhwIjoxNjE1MjEwMjUzLCJlbWFpbCI6ImV2ZXJ0b25AcHJlY29kZS5jb20uYnIiLCJlbXByZXNhIjoiUHJlY29kZSIsInNjaGVtYSI6Im11bHRpbG9qYSIsImlkU2NoZW1hIjo3LCJpZFNlbGxlciI6NCwiaWRVc2VyIjoxfQ==.JKQwHwlHg4NaJrjjoHVPGnjFeTdrq8aym8w3+myXzU4='
}

export class configEnvi{

    public logo:any;
    public titulo:any;
    public descricao:any;
    public hotsites:any;
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
    public menuPrincipal:any;
    public menuCategoria:any;

    public setLogo(logo:any) {
      this.logo = logo;
    }

   public setHeader(titulo:any,descricao:any,hotsites:any){
    this.titulo    = titulo;
    this.descricao = descricao;
    this.hotsites  = hotsites;
  }
  public setMenuPrincipal(menu:any){
    this.menuPrincipal = menu;
  }
  public setMenuCategoria(menu:any){
    this.menuCategoria = menu;
  }
  public setFooter(cnpj:any,cep:any,telefone:any,email:any,endereco:any,estado:any,numero:any,cidade:any,url_site:any,url_imagens:any,email_atendimento:any,facebook:any,instagram:any,youtube:any,twitter:any){
    this.cnpj     = cnpj;
    this.cep      = cep;
    this.telefone = telefone;
    this.email    = email;
    this.endereco = endereco;
    this.estado   = estado;
    this.numero   = numero;
    this.cidade   = cidade;
    this.url_site = url_site;
    this.url_imagens = url_imagens;
    this.email_atendimento = email_atendimento;
    this.facebook = facebook;
    this.instagram= instagram;
    this.youtube  = youtube;
    this.twitter  = twitter;
  }

  // HEADER
  public getTitulo(){return this.titulo}
  public getDescricao(){return this.descricao}
  public getLogo(){return this.logo}
  public getHotsites(){return this.hotsites}
  public getMenuPrincipal(){return this.menuPrincipal}
  public getMenuCategoria(){return this.menuCategoria}
  // FOOTER
  public getCnpj(){return this.cnpj}
  public getCep(){return this.cep}
  public getTelefone(){return this.telefone}
  public getEmail(){return this.email}
  public getEndereco(){return this.endereco}
  public getEstado(){return this.estado}
  public getNumero(){return this.numero}
  public getCidade(){return this.cidade}
  public getUrl_site(){return this.url_site}
  public getUrl_imagens(){return this.url_imagens}
  public getEmail_atendimento(){return this.email_atendimento}
  public getFacebook(){return this.facebook}
  public getInstagram(){return this.instagram}
  public getYoutube(){return this.youtube}
  public getTwitter(){return this.twitter}
}

