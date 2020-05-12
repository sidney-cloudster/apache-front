import { Component, OnInit, Input } from '@angular/core';
import { VendedorService } from '../../_services/vendedor.service';
import { LoginService } from '../../_services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { timeout } from 'q';
import { NgxSpinnerService } from "ngx-spinner";
import { NgForm, FormGroup, FormControl, Form } from '@angular/forms';
import Swal from 'sweetalert2';
import { configEnvi } from 'src/environments/environment';
import { CarrinhoCompraService } from 'src/app/_services/carrinho-compra.service';
@Component({
  selector: 'app-loja-login',
  templateUrl: './loja-login.component.html',
  styleUrls: ['./loja-login.component.css']
})
export class LojaLoginComponent implements OnInit {

  public msgRetorno: any = "";
  public returnUrl: string;
  public buttonActive:boolean = false;

  constructor(
    private sVendedor:VendedorService,
    private route: ActivatedRoute,
    private router: Router,
    public config:configEnvi,
    private sCarrinho:CarrinhoCompraService){
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    if(this.sVendedor.getVendedor()){
      
      console.log(this.returnUrl);
      if(this.returnUrl != '/'){
        this.router.navigate([this.returnUrl]);
      }else{
        this.router.navigate(['/vendedor','produtos']);
      }
    }else{
      this.sVendedor.logout();
    }
  }
  listForm = new FormGroup
  ({
    email: new FormControl(''),
    password:new FormControl('')    
  });
  
  onSubmit(listForm: Form){
    if(!this.buttonActive){
      this.disabled("#login-button");
      $(".loading").fadeIn(0);
      var json    = this.sVendedor.jsonLogin(listForm); // JSON LOGIN
      var error   = this.sVendedor.loginValidation(json);

      if(error == ""){
        this.sVendedor.loginVendedorApi(json).subscribe(r=>{
          this.sVendedor.setCustomer(r.Dados);
          // REMOVE OS PRODUTOS QUE NAO FOR DO VENDEDOR
          this.sCarrinho.removerProdutosVendedor(r.Dados.idVendedor);
          if(this.returnUrl != '/'){
            this.router.navigate([this.returnUrl]);
          }else{
            this.router.navigate(['/vendedor','produtos']);
          }
        },
        e => {
          $(".loading").fadeOut(0);
          Swal.fire({
            icon: 'error',
            title: 'Ops...',
            text: 'Usuario não existe ou esta incorreto!',
          });
          this.undisabled("#login-button")
        },
        () =>{
          $(".loading").fadeOut(0);
          this.undisabled("#login-button")
        });
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
}
