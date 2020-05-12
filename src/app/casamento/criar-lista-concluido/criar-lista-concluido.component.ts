import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CasamentoService } from 'src/app/_services/_casamento/casamento.service';

@Component({
  selector: 'app-criar-lista-concluido',
  templateUrl: './criar-lista-concluido.component.html',
  styleUrls: ['../casamento.component.css']
})
export class CriarListaConcluidoComponent implements OnInit {

  private cookie: string;

  constructor(
    private user: UserService,
    private sCasamento: CasamentoService,
    private router: Router, 
    private cookieService: CookieService )
  {
    
  }

  ngOnInit()
  {
    this.cookie = this.cookieService.get('cookie');
    console.log(this.cookie);
    if (this.cookie == '') {
      this.cookieService.delete('cookie');
      this.router.navigate(['/casamento/criar-lista']);
    } else {
      this.cookieService.delete('cookie');
      this.cookieService.delete('cookie_cpf');
      this.cookieService.delete('cookie_json');
    }
  }

}
