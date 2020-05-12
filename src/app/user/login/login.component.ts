import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { LoginService } from '../../_services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Form, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { VendedorService } from 'src/app/_services/vendedor.service';
import {AuthService } from 'angularx-social-login';
import { configEnvi } from 'src/environments/environment';
import { NgProgress, NgProgressRef} from 'ngx-progressbar';
import { MatSnackBar } from '@angular/material';
import { FavoriteService } from 'src/app/_services/favorite.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  exportAs: 'ngForm'
})
export class LoginComponent implements OnInit {

  public msgRetorno: any = "";
  public returnUrl: string;
  public vendedor:any;
  public hide:boolean = true;
  public progressRef: NgProgressRef;
  public buttonActive:boolean = false;
  public contaFavoritos:any = 0;
  public setFavoritos:any = 0;
  
  listForm = new FormGroup
  ({
    email: new FormControl('',  [Validators.required, Validators.email]),
    senhaLogin: new FormControl('',  [Validators.required, Validators.minLength(6)]),
  });
  
  logincpf = new FormGroup
  ({
    cpf_cnpj: new FormControl(''),
  });

  constructor(
    private sUser:UserService,
    private route: ActivatedRoute,
    private router: Router,
    private sLogin:LoginService,
    private sVendedor:VendedorService,
    private socialAuthService: AuthService,
    public config:configEnvi,
    private NgProgress:NgProgress,
    private _snackBar:MatSnackBar,
    private sFavorite: FavoriteService){
  }

  ngOnInit() {
    this.progressRef = this.NgProgress.ref('loginBar');
    this.sUser.logout(); 
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.vendedor  = this.sVendedor.getVendedor();
  }

  public login(socialPlatform : string) {
    if(!this.buttonActive){
      this.disabled(".btn-continue");
      let social = this.sUser.loginRedeSocial(socialPlatform);
      let json:any;
      this.socialAuthService.signIn(social).then(
        (userData) => {
          json = this.sUser.getJsonUsuario(userData.id,userData.name,userData.name,'I','',userData.email,userData.photoUrl,socialPlatform);
          this.sUser.setCustomer(json);
          this.router.navigate([this.returnUrl]);
          this.undisabled(".btn-continue");
        },
        e=>{
          this.undisabled(".btn-continue");
        }
      );
    }
  }

  toggleShowPass(e){
    let field = document.querySelector('#pass');
    if(field.getAttribute('type') == 'password'){
      field.setAttribute('type','text');
      e.classList.add('view');
    } else {
      field.setAttribute('type','password');
      e.classList.remove('view');
    }
  }

  loginCpf(logincpf: Form){
    if(!this.buttonActive && this.vendedor){
      this.disabled("#login-button");
      let data:any = logincpf;
      let json = {cpf:data.cpf_cnpj,idVendor:this.vendedor.idVendedor}
      this.sUser.loginSiteVendedor(json).subscribe(r =>{
        let vendedor = r[0];
        let json = this.sUser.getJsonUsuario(
          vendedor.cpfCnpj,
          vendedor.cusFantasyName,
          vendedor.cusCompanyName,
          vendedor.cusGenre,
          vendedor.cusProfissionBranch,
          vendedor.cusEmail,
          '',
          'site');
        this.sUser.setCustomer(json);
        if(this.returnUrl != '/'){
          this.router.navigate([this.returnUrl]);
        }else{
          this.router.navigate(['/compras','carrinho-compra']);
        }
        this.undisabled("#login-button");
      },
      e=>{
        Swal.fire({icon: 'error',title: 'Ops...',text: 'Usuario não existe ou esta incorreto!'});
        this.undisabled("#login-button");
      },
      () =>{
        this.undisabled("#login-button");
      });
    }
  }
  onSubmit(listForm: Form){
    if(this.listForm.status == 'VALID'){
      if(!this.buttonActive){
        this.progressRef.start();
        this.disabled(".btn-continue");
        $(".loading").fadeIn(0);
        var json    = this.sLogin.jsonLogin(listForm); // JSON LOGIN
        var error   = this.sLogin.loginValidation(json);
        if(error == ""){
          
          if(this.sUser.checkLogin()){
            this.sUser.logout();
          }

          this.sUser.loginSite(json).subscribe(r=>{
            this.router.navigate([this.returnUrl]);
            let user = r[0];
            let json = this.sUser.getJsonUsuario(
              user.cpfCnpj,
              user.cusFantasyName,
              user.cusCompanyName,
              user.cusGenre,
              user.cusProfissionBranch,
              user.cusEmail,
              '',
              'site');
            this.sUser.setCustomer(json);
            this.progressRef.complete();
            this.openSnackBar('Login efetuado com sucesso!', 'OK');
            this.sFavorite.setFavoritos();
            this.sFavorite.contaFavoritos();
          },
          e => {
            Swal.fire({icon: 'error',title: 'Ops...',text: 'Usuario não existe ou esta incorreto!'});
            this.progressRef.complete();
            this.undisabled(".btn-continue");
          },
          () =>{
            this.progressRef.complete();
            this.undisabled(".btn-continue");
          });
        }else{
          this.progressRef.complete();
          Swal.fire({icon: 'warning',title: 'Ops...',text: 'Preencha os campos corretamentes!'})
          this.undisabled(".btn-continue");
        }
      }
    }
  }
  
  public getLinkArray(link:String){
    let v = link.split("/");
    let r = [];
    let i = 0;
    for(i = 1; i < v.length; i++){
      r.push(v[i]);
    }
    return r;
  }

  public getErro(c:string){
    if(this.listForm.get(c).hasError('required')){
      return 'Este campo é obrigatorio!';
    }
    if(this.listForm.get(c).hasError('email')){
      return 'Insira um e-mail válido!';
    }
    if(this.listForm.get(c).hasError('minlength')){
      let total = this.listForm.get(c).errors.minlength.requiredLength;
      return 'Minímo ' + total + ' caracteres!';
    }
    if(this.listForm.get(c).hasError('pattern')){
      if(this.listForm.get(c).errors.pattern.requiredPattern == "^[a-zA-Z]*$"){
        return 'Insira apenas caracteres!';
      }
    }
  }

  public disabled(element:any){
    document.querySelector(element).setAttribute('disabled','');
    this.buttonActive = true;
  }
  public undisabled(element:any){
    document.querySelector(element).removeAttribute('disabled');
    this.buttonActive = false;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}

