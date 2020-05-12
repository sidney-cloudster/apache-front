export const environment = {
  production: false,
};

export const carrinho = {
  keyCarrinho: '_carrinho-compra'
}

export const checkout = {
  keyCheckout: '_checkout-compra-carrinho'
}

export const userData = {
  keyUser: '_user-login'
}

export const vendedorData = {
  keyUser: '_vendedor-login'
}

export const lojaData = {
  keyIdLoja: '_loja-id'
}


export const api = {
  urlbase: "http://26.196.30.130:8888/",  
  //gazin
  key: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkV2ZXJ0b24gZGEgU2lsdmEiLCJhZG1pbiI6dHJ1ZSwianRpIjoiMzk0ODI1MDQwZDIxNDc2OWYwNDIyOWVjZGFlOWI4MDJiZGI3NDRiMjk3ODA3ZDQ5ZGM5MmI3MzZmN2RhZTRiOCIsImlhdCI6MTU4Mzc1OTY5NSwiZXhwIjoxNjE1MjA5Mjk1LCJlbWFpbCI6ImV2ZXJ0b25AcHJlY29kZS5jb20uYnIiLCJlbXByZXNhIjoiUHJlY29kZSIsInNjaGVtYSI6ImdhemluIiwiaWRTY2hlbWEiOjMsImlkU2VsbGVyIjozLCJpZFVzZXIiOjF9.EYgQsxRp0gahJx4MU9OdWEzIq/x5ll0nsoPH8fxtkdI=',
  // multiloja
  //key: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkV2ZXJ0b24gZGEgU2lsdmEiLCJhZG1pbiI6dHJ1ZSwianRpIjoiNjlmZTljNzAyZDA4ZmY0MDlmNWExODFmZDllNTU5MzVmYjcwY2QxMDkwYWVlOTY4ZjJiNzNkYmJmZTRmNTJlZCIsImlhdCI6MTU4Mzc2MDY1MywiZXhwIjoxNjE1MjEwMjUzLCJlbWFpbCI6ImV2ZXJ0b25AcHJlY29kZS5jb20uYnIiLCJlbXByZXNhIjoiUHJlY29kZSIsInNjaGVtYSI6Im11bHRpbG9qYSIsImlkU2NoZW1hIjo3LCJpZFNlbGxlciI6NCwiaWRVc2VyIjoxfQ==.JKQwHwlHg4NaJrjjoHVPGnjFeTdrq8aym8w3+myXzU4='
}

export class configEnvi{

  public logo:any;

  public setLogo(logo:any) {
    this.logo = logo;
  }
  public getLogo(){
    return this.logo
  }
}
