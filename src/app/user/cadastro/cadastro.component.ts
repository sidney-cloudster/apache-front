import { Component, OnInit } from '@angular/core';
import { RequisicoesService } from '../../_services/requisicoes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidationsService } from '../../_services/validations.service';
import { CadastroService } from '../../_services/cadastro.service';
import { FormGroup, FormControl, Form, Validators, AbstractControl} from '@angular/forms';
import { UserPreferences } from 'typescript';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/_services/login.service';
import { configEnvi } from 'src/environments/environment';
import Swal from 'sweetalert2';
import {DateValidator, Validator} from './validator';
import { NgProgress, NgProgressRef} from 'ngx-progressbar';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  exportAs: 'ngForm'
})

export class CadastroComponent implements OnInit {
  progressBar: NgProgressRef;
  msgRetorno: any = "";
  public hide = true;
  public tipocadastro = false; // false = CPF / true = CNPJ
  listForm = new FormGroup
  ({
    'email':new FormControl('', [Validators.required, Validators.email]),
    'senha':new FormControl('', [Validators.required, Validators.minLength(6)]),
    'csenha':new FormControl('', [Validators.required, Validators.minLength(6)]),
    'cpfcnpj':new FormControl({value: '', disabled: false}, [Validators.required, Validator.ValidaCpf]),
    'nomeFisico':new FormControl({value: '', disabled: false}, [Validators.required]),
    'sexo':new FormControl('M', [Validators.required]),
    'nascimento':new FormControl({value: '', disabled: false}, [Validators.required, DateValidator.ptDate]),
    'ofertasfisico':new FormControl({value: '', disabled: false}),
    'razao_social':new FormControl({value: '', disabled: true}, Validators.required),
    'nome_fantasia':new FormControl({value: '', disabled: true}, Validators.required),
    'inscricao_estadual':new FormControl({value: '', disabled: true}, Validators.required),
    'nome':new FormControl({value: '', disabled: true}, Validators.required),
    'ofertasjuridico':new FormControl({value: '', disabled: true})
    
  }, {validators: [this.passwordConfirming]});

  
  constructor(
    private router:Router,
    private valid:ValidationsService,
    private sCadastro:CadastroService,
    private sUser:UserService,
    public config:configEnvi,
    private sLogin:LoginService,
    private NgProgress:NgProgress,
    private _snackBar:MatSnackBar) {}
    

  ngOnInit() {
    this.sUser.logout();
    this.progressBar = this.NgProgress.ref('cadastroBar');
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('senha').value !== c.get('csenha').value) {
      c.get('csenha').setErrors({
        notSame: true
      })
      return {invalid: true};
    }
  }


  public getPassword() {
    return this.listForm.get('senha').value;
  }

  public login(tipo:any){
    this.sUser.loginRedeSocial(tipo);
  }

  detecta(e:any){
    let v = e.target.value;
    v=v.replace(/\D/g,"");
    if (v.length <= 11) { //CPF
      this.tipocadastro = false;
      this.switchTypeRegister('fisica');
      v=v.replace(/(\d{3})(\d)/,"$1.$2")
      v=v.replace(/(\d{3})(\d)/,"$1.$2")
      v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
    } else { //CNPJ
      this.tipocadastro = true;
      this.switchTypeRegister('juridica');
        v=v.replace(/^(\d{2})(\d)/,"$1.$2")
        v=v.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3")
        v=v.replace(/\.(\d{3})(\d)/,".$1/$2")
        v=v.replace(/(\d{4})(\d)/,"$1-$2")
    }
    this.listForm.controls['cpfcnpj'].setValue(v);
  }

  public onSubmit(){    
    let f = this.listForm.value;
      // if(this.listForm.status == "VALID"){
        this.progressBar.start();
        var r = this.valid.registerValidation(f);
        if(r == ""){

          if(this.sUser.checkLogin()){
            this.sUser.logout();
          }

          this.sCadastro.cadastrarUsuario(this.montaJson(f)).subscribe(
            r => {         
             this.showAlertMsgSuccess(r.Label);
             /*LOGIN AO CADASTRAR*/
             this.sLogin.jsonLogin(f);
             var json = `{"user":"`+f.email+`","password":"`+f.senha+`"}`;
              this.sUser.loginSite(json).subscribe(r=>{
                this.router.navigate(['/']);
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
                this.progressBar.complete();
                this.openSnackBar('Conta criada com sucesso','OK')
              },
              e => {
                this.showAlertMsg('Falha ao realizar o login.');
                this.progressBar.complete();
              },
              () =>{
                this.progressBar.complete();
              });
            },
            e => {
              let erro = e._body;
              erro = JSON.parse(erro);
              this.showAlertMsg(erro.Label);
              this.progressBar.complete();
            });
        }else{
          this.showAlertMsg(r);
          this.progressBar.complete();
        }
      // }
    }

  private showAlertMsg(error){  
    // this.msgRetorno = `<div class="alert alert-danger" role="alert">`+error+`</div>`;
    Swal.fire({icon: 'warning',title: 'Ops...',text: error});
  }
  private showAlertMsgSuccess(msg){  
    // this.msgRetorno = `<div class="alert alert-success" role="alert">`+msg+`</div>`;
    Swal.fire({icon: 'success',title: 'Sucesso!',text: msg});

  }
  
  public cadastroRedeSocial(dados:any){
    var json = { 
      "nomefantasia":dados.name,
      "nomecompanhia": dados.name,
      "email": dados.email,
      "cpfcnpj": dados.id,
      "genre": "U",
      "profissao": "",
      "senha": dados.id,		   	
      "nascimento": "01-01-1900"
    }
  }
  /*
    CONVERTER DATA BR -> USA | 01/01/2019 -> 1900-01-01 
  */
  public dataBrToUsa(data:any){
    var date = data;
    date = date.split("/");
    var r    = date[2]+"-"+date[1]+"-"+date[0];
    return r;
  }

  /*
    FORMATA O NÚMERO DE CELULAR TIRANDO ESPAÇOS, PARENTESES.
  */  
  public formatarCelular(numero:any){
    // PADRÃO FORMATA: (43) 1 12345678
    var num,aux,ddd,tel,ret;

    num = numero.replace(/\s/g, '');// remove espaços (43)112345678
    aux = num.split(")");           // resultado : ["(43", "12345-6789"]
    ddd = aux[0].replace("(",'');   // resultado: ["43"]
    tel = aux[1].replace("-",'')    // resultado : ["43123456789"]
    ret = ddd+"-"+tel;
    
    return ret;
  }

  public formataCpfCnpj(cnpjcpf:any){
    var r;
    if(cnpjcpf != ""){
      r = cnpjcpf.replace(/[^\d]/g, "");
      return r;
    }
  }

  public montaJsonPhone(dados:any){
     var json = "";
     var idCustomer;
     var celular;
     if(dados){
      if(dados.conta_tipo == "fisica"){
          idCustomer = this.formataCpfCnpj(dados.cpf);
          // celular = this.formatarCelular(dados.celular);
      }else{
          idCustomer = this.formataCpfCnpj(dados.cnpj);
          // celular = this.formatarCelular(dados.celular_juridico);
      }
      celular = celular.split("-");
      if(celular != "" && idCustomer != ""){
        json = `
              {
                "idcustomersaddress": `+idCustomer+`,
                "phone": "`+celular[1]+`",
                "phoneddd": "`+celular[0]+`"
              }`;          
          return json;
      }else{
          return "falta_de_dados";
          
      }
    }
  }
  /* 
    MONTA JSON PARA CADASTRO DO CLIENTE (CUSTOMERS)
  */
  public montaJson(formVal:any){
    var f = formVal;
    var jsonEnvio;
    let cpfcnpj = f.cpfcnpj.replace(/\D/g,"");
    if(cpfcnpj.length == 14){
      jsonEnvio = `
        { 
          "nomefantasia":"`+f.nome_fantasia+`",
          "nomecompanhia": "`+f.razao_social+`",
          "email": "`+f.email+`",
          "cpfcnpj": "`+cpfcnpj+`",
          "genre": "",
          "profissao": "",
          "senha": "`+f.senha+`",		   	
          "nascimento": "`+this.dataBrToUsa(f.nascimento)+`"
        }
      `;
    }else if(cpfcnpj.length == 11){
      jsonEnvio = `
        { 
          "nomefantasia":"`+f.nomeFisico+`",
          "nomecompanhia": "`+f.nomeFisico+`",
          "email": "`+f.email+`",
          "cpfcnpj": "`+cpfcnpj+`",
          "genre": "`+f.sexo+`",
          "profissao": "",
          "senha": "`+f.senha+`",		   	
          "nascimento": "`+this.dataBrToUsa(f.nascimento)+`"
        }
      `;
    }
    return jsonEnvio;
  }


  
    getErroEmail() {
      if (this.listForm.get('email').hasError('required')) {
        return 'Este campo é obrigatorio!';
      }
      return this.listForm.get('email').hasError('email') ? 'Não é um e-mail válido.' : '';
    }

    getErroPass(){
      if (this.listForm.get('senha').hasError('required')) {
        return 'Este campo é obrigatorio!';
      }
      if(this.listForm.get('senha').hasError('minlength')){
        return 'Minímo 6 caracteres.'
      }
    }

    getErroCpfCnpj(){
      if (this.listForm.get('cpfcnpj').hasError('required')) {
        return 'Este campo é obrigatorio!';
      }
      if(this.listForm.get('cpfcnpj').hasError('cpfInvalido')){
        return 'Digite um CPF válido!';
      }
    }


    getErro(c:string){
      if(this.listForm.get(c).hasError('required')){
        return 'Este campo é obrigatorio!';
      }

      if(this.listForm.get(c).hasError('invalidDate')){
        return 'Insira uma data válida!';
      }
  
      if(this.listForm.get(c).hasError('pattern')){
        if(this.listForm.get(c).errors.pattern.requiredPattern == "^[a-zA-Z]*$"){
          return 'Insira apenas caracteres!';
        }
      }
    }


    getErroPassSame(){
      if (this.listForm.get('csenha').hasError('required')) {
        return 'Este campo é obrigatorio!';
      }
      if(this.listForm.get('csenha').hasError('minlength')){
        return 'Minímo 6 caracteres.'
      }

      if(this.listForm.get('csenha').hasError('notSame')){
        return 'Senhas não coincidem!';
      }

    }

    switchTypeRegister(type:string){

      if(type == 'fisica'){
        this.listForm.controls['sexo'].enable();
        this.listForm.controls['nomeFisico'].enable();
        this.listForm.controls['ofertasfisico'].enable();

        this.listForm.controls['nome'].disable();
        this.listForm.controls['razao_social'].disable()
        this.listForm.controls['ofertasjuridico'].disable();
        this.listForm.controls['nome_fantasia'].disable();

      }else{
        this.listForm.controls['nome'].enable();
        this.listForm.controls['razao_social'].enable()
        this.listForm.controls['ofertasjuridico'].enable();
        this.listForm.controls['nome_fantasia'].enable();
        
        this.listForm.controls['sexo'].disable();
        this.listForm.controls['nomeFisico'].disable();
        this.listForm.controls['ofertasfisico'].disable();
      }
    }

    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
        duration: 2000,
      });
    }
  

}


