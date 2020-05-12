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
    //urlbase: "http://192.168.25.22:8888/",
  //key: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkV2ZXJ0b24gZGEgU2lsdmEiLCJhZG1pbiI6dHJ1ZSwianRpIjoiODRmYjU2NjMtZjM0ZC00NDZkLWJlZjMtYzIyN2U5OWJmMmM3IiwiaWF0IjoxNTc4OTM1NTk3LCJleHAiOjE2MTAzODUxOTcsImVtYWlsIjoiZXZlcnRvbkBwcmVjb2RlLmNvbS5iciIsImVtcHJlc2EiOiJQcmVjb2RlIiwic2NoZW1hIjoiZ2F6aW4iLCJpZFNjaGVtYSI6MywiaWRVc2VyIjo5fQ==.GOj1qMQ2RmpCz7iHas4pRWw0TeZNdn6m1aZ0RpRyNA0='
  urlbase: "http://192.168.0.13/api/public/",  
  //gazin
  key: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkV2ZXJ0b24gZGEgU2lsdmEiLCJhZG1pbiI6dHJ1ZSwianRpIjoiMzk0ODI1MDQwZDIxNDc2OWYwNDIyOWVjZGFlOWI4MDJiZGI3NDRiMjk3ODA3ZDQ5ZGM5MmI3MzZmN2RhZTRiOCIsImlhdCI6MTU4Mzc1OTY5NSwiZXhwIjoxNjE1MjA5Mjk1LCJlbWFpbCI6ImV2ZXJ0b25AcHJlY29kZS5jb20uYnIiLCJlbXByZXNhIjoiUHJlY29kZSIsInNjaGVtYSI6ImdhemluIiwiaWRTY2hlbWEiOjMsImlkU2VsbGVyIjozLCJpZFVzZXIiOjF9.EYgQsxRp0gahJx4MU9OdWEzIq/x5ll0nsoPH8fxtkdI='
  //multiloja
  //key: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkV2ZXJ0b24gZGEgU2lsdmEiLCJhZG1pbiI6dHJ1ZSwianRpIjoiNjlmZTljNzAyZDA4ZmY0MDlmNWExODFmZDllNTU5MzVmYjcwY2QxMDkwYWVlOTY4ZjJiNzNkYmJmZTRmNTJlZCIsImlhdCI6MTU4Mzc2MDY1MywiZXhwIjoxNjE1MjEwMjUzLCJlbWFpbCI6ImV2ZXJ0b25AcHJlY29kZS5jb20uYnIiLCJlbXByZXNhIjoiUHJlY29kZSIsInNjaGVtYSI6Im11bHRpbG9qYSIsImlkU2NoZW1hIjo3LCJpZFNlbGxlciI6NCwiaWRVc2VyIjoxfQ==.JKQwHwlHg4NaJrjjoHVPGnjFeTdrq8aym8w3+myXzU4='

  // urlbase: "http://192.168.25.22:8888/", 
  // key: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkV2ZXJ0b24gZGEgU2lsdmEiLCJhZG1pbiI6dHJ1ZSwianRpIjoiODRmYjU2NjMtZjM0ZC00NDZkLWJlZjMtYzIyN2U5OWJmMmM3IiwiaWF0IjoxNTc4OTM1NTk3LCJleHAiOjE2MTAzODUxOTcsImVtYWlsIjoiZXZlcnRvbkBwcmVjb2RlLmNvbS5iciIsImVtcHJlc2EiOiJQcmVjb2RlIiwic2NoZW1hIjoiZ2F6aW4iLCJpZFNjaGVtYSI6MywiaWRVc2VyIjo5fQ==.GOj1qMQ2RmpCz7iHas4pRWw0TeZNdn6m1aZ0RpRyNA0='


  // urlbase: "http://192.168.25.22:8888/",
  // key: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkV2ZXJ0b24gZGEgU2lsdmEiLCJhZG1pbiI6dHJ1ZSwianRpIjoiODRmYjU2NjMtZjM0ZC00NDZkLWJlZjMtYzIyN2U5OWJmMmM3IiwiaWF0IjoxNTc4OTM1NTk3LCJleHAiOjE2MTAzODUxOTcsImVtYWlsIjoiZXZlcnRvbkBwcmVjb2RlLmNvbS5iciIsImVtcHJlc2EiOiJQcmVjb2RlIiwic2NoZW1hIjoiZ2F6aW4iLCJpZFNjaGVtYSI6MywiaWRVc2VyIjo5fQ==.GOj1qMQ2RmpCz7iHas4pRWw0TeZNdn6m1aZ0RpRyNA0='
}


// export const cor = {
//   keyCor: "_cor-site",
//   primaria: "#3399ff",
//   secundaria: "#2d87e0",
//   price_color: "#1bb600",
//   nav_color: "#2d87e0",
//   background: "#FFFFFF"
// }


export class configEnvi{

  public logo:any;

  public setLogo(logo:any) {
    this.logo = logo;
  }
  public getLogo(){
    return this.logo
  }
}
