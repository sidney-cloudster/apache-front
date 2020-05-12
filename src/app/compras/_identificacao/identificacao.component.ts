import { Component, OnInit } from '@angular/core';
// import { LoginService } from '../../services/login/login.service';
import { UserService } from '../../_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../_services/login.service';
@Component({
  selector: 'app-identificacao',
  templateUrl: './identificacao.component.html',
  styleUrls: ['./identificacao.component.css']
})
export class IdentificacaoComponent implements OnInit {

  private returnUrl;

  msgRetorno: string;

  constructor(
    private sUser:UserService,
    private route: ActivatedRoute,
    private router:Router,
    private sLogin:LoginService
  ) { }

  ngOnInit() {
    let userLogin:any = this.sUser.getCustomer();
    if(userLogin){
      this.router.navigate(['/compras/checkout-pagamento']);
    }else{
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    
  }

  public login(socialPlatform : string) {
    this.sUser.loginRedeSocial(socialPlatform);
  }
  
  public loginUsuario(formVal:any){    
    var json    = this.sLogin.jsonLogin(formVal); // JSON LOGIN
    var error   = this.sLogin.loginValidation(json);
    var retorno;
    if(error == ""){
      this.sUser.loginSite(json).subscribe(r=>{
        this.sLogin.showAlertMsg("Sucesso. Você esta sendo redirecionado.","success");
        setTimeout(()=>{
          this.router.navigate(['compras/checkout-pagamento']);
        }, 1000);
      },
      e =>{
        console.log(e);
        this.sLogin.showAlertMsg("Ops. Usuario não existe ou esta incorreto.","danger");
      });
      // this.showAlertMsg("Sucesso. Você esta sendo redirecionado.","success");
      
    }else{
      this.sLogin.showAlertMsg(error,"danger");
    }
  }
}
