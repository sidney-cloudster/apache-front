import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { FormGroup, FormControl, Form } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CasamentoService } from 'src/app/_services/_casamento/casamento.service';
import { InfoCasamentoService } from 'src/app/_services/_casamento/info-casamento.service';

@Component({
  selector: 'app-criar-lista-endereco',
  templateUrl: './criar-lista-endereco.component.html',
  styleUrls: ['../casamento.component.css']
})
export class CriarListaEnderecoComponent implements OnInit {

  public customer;
  public responsavel;
  public cookie: string;
  public cookie_json: string;
  public cookieParse:any;
  public mesmoEndereco:boolean = true;
  public btnsDisabled:any = [".btn-cadastro",,"#radio-sim","#radio-nao"];
  public enderecoSelecionado:boolean = false;
  public listForm = new FormGroup
    ({
      radio_endereco:new FormControl('T'),
      id: new FormControl(''),
      responsavel: new FormControl(this.sUser.getCustomer().cusCompanyName),
      cep: new FormControl(''),
      endereco: new FormControl(''),
      numero: new FormControl(''),
      complemento: new FormControl(''),
      bairro: new FormControl(''),
      cidade: new FormControl(''),
      uf: new FormControl(''),
      cpf: new FormControl(this.cookieService.get('cookie_cpf')),
      tipo: new FormControl('R'),
    })

  constructor(
    private sUser: UserService,
    private sCasamento: CasamentoService,
    private router: Router,
    private cookieService: CookieService,
    private sInfoCasamento:InfoCasamentoService) {
    
  }

  
  ngAfterViewInit() {
    this.disabled();
  }

  public disabled(){
    let elements = this.btnsDisabled;
    for(let e of elements){
      if(document.querySelector(e)){
        document.querySelector(e).setAttribute('disabled','');
      }
    }
  }
  public undisabled(){
    let elements = this.btnsDisabled;
    for(let e of elements){
      if(document.querySelector(e)){
        document.querySelector(e).removeAttribute('disabled');
      }
    }
  }

  ngOnInit() {
    this.customer = this.sUser.getCustomer();
    this.cookie = this.cookieService.get('cookie');
    this.tipoEndereco('T');
  
    if (this.cookie == '') {
      this.cookieService.delete('cookie');
      this.router.navigate(['/casamento/criar-lista']);
    } else {
      this.cookie      = this.cookieService.get('cookie');
      this.cookieParse = JSON.parse(this.cookieService.get('CASAM-NV'));
    }
  }

  public tipoEndereco(tipo:any){
    if(tipo == 'T'){
      this.buscaEnderecoLista();
      this.enderecoSelecionado = true;
    }else{
      this.enderecoSelecionado = false;
      this.listForm.controls.id.setValue('');
      this.listForm.controls.responsavel.setValue('');
      this.listForm.controls.cep.setValue('');
      this.listForm.controls.endereco.setValue('');
      this.listForm.controls.numero.setValue('');
      this.listForm.controls.complemento.setValue('');
      this.listForm.controls.bairro.setValue('');
      this.listForm.controls.cidade.setValue('');
      this.listForm.controls.uf.setValue('');
    }
  }

  buscaEnderecoLista() {
    this.customer = this.sUser.getCustomer();
    let endereco:any;
    this.disabled();
    this.sUser.getEnderecoDefault(this.sUser.getCustomer().cpfCnpj).subscribe(r => {
      this.mesmoEndereco = true;
      endereco = r[0];
      this.listForm.controls['id'].setValue(endereco.id);
      this.listForm.controls['responsavel'].setValue(this.sUser.getCustomer().cusCompanyName);
      this.listForm.controls['cep'].setValue(endereco.cep);
      this.listForm.controls['endereco'].setValue(endereco.endereco);
      this.listForm.controls['numero'].setValue(endereco.numero);
      this.listForm.controls['complemento'].setValue(endereco.complemento);
      this.listForm.controls['bairro'].setValue(endereco.bairro);
      this.listForm.controls['cidade'].setValue(endereco.cidade);
      this.listForm.controls['uf'].setValue(endereco.uf);
      this.undisabled();
    },
    e =>{
      this.undisabled();
    })
  }

  otherAddress() {
    this.customer = this.sUser.getCustomer();
    this.sUser.getEnderecoSecundario(this.sUser.getCustomer().cpfCnpj).subscribe(r => {
      r.forEach(endereco => {
        this.listForm.reset();
        
        // this.listForm.controls['responsavel'].setValue('');
        // this.listForm.get('responsavel').enable();
        // this.listForm.controls['cep'].setValue('');
        // this.listForm.get('cep').enable();
        // this.listForm.controls['endereco'].setValue('');
        // this.listForm.get('endereco').enable();
        // this.listForm.controls['numero'].setValue('');
        // this.listForm.get('numero').enable();
        // this.listForm.controls['complemento'].setValue('');
        // this.listForm.get('complemento').enable();
        // this.listForm.controls['bairro'].setValue('');
        // this.listForm.get('bairro').enable();
        // this.listForm.controls['cidade'].setValue('');
        // this.listForm.get('cidade').enable();
        // this.listForm.controls['uf'].setValue('');
        // this.listForm.get('uf').enable();
      });
      this.undisabled();
    },
    e =>{
      this.undisabled();
    })
  }

  autoDataCep() {
    this.disabled();
    this.sCasamento.getCepAutoData(this.listForm.value.cep).subscribe(r => {
      r.forEach(cepData => {
        this.listForm.controls['endereco'].setValue(cepData.cepAddress);
        this.listForm.controls['bairro'].setValue(cepData.cepDistrict);
        this.listForm.controls['cidade'].setValue(cepData.cepNameCity);
        this.listForm.controls['uf'].setValue(cepData.cepUF);
      });
      this.undisabled();
    },
    e=>{
      this.undisabled();
    })
  }

  public setInfoCasamento(){
    this.disabled();
    this.sCasamento.getWenddingConfig(this.customer.cpfCnpj).subscribe(r => {
      if(r != null || r != undefined || r != ''){
        Swal.fire('Parabéns','Sua lista de casamento foi criada.','success');
        let dados:any = r;
        dados.cpfCnpj = this.customer.cpfCnpj;
        this.sInfoCasamento.setInfoNoivos(dados);
        this.router.navigate(['/casamento','criar-lista-concluido']);
      }
      this.undisabled();
    },
    e=>{
      this.undisabled();
    });
  }
  onSubmit(listForm: Form) {
    this.disabled();
    let form:any = listForm;
    if(form){
      if(form.radio_endereco == 'T'){
        form.tipo = 'R';
        this.cookieParse.idEndereco = form.id;
        this.sCasamento.postCasamento(this.cookieParse).subscribe(r=>{
          this.setInfoCasamento();
          this.undisabled();
        },
        e=>{
          Swal.fire('Ops.','Houve um erro ao tentar criar sua lista de casamento.','error');
          this.undisabled();
        });
      }else if(form.radio_endereco == 'F'){
        form.tipo = 'C';
        this.sUser.postEndereco(form).subscribe(r => {
          this.cookieParse.idEndereco = r.Id;
          if (r.Code == 'success') {
            this.sCasamento.postCasamento(this.cookieParse).subscribe(r=>{
              this.setInfoCasamento();
              this.undisabled();
            },
            e=>{
              Swal.fire('Ops.','Houve um erro ao tentar criar sua lista de casamento.','error');
              this.undisabled();
            });
          } else {
            this.router.navigate(['/casamento/criar-lista']);
          }
        },
        e=>{
          Swal.fire('Ops.','Houve um erro ao tentar criar sua um novo endereço.','error');
          this.undisabled();
        })  
      }
    }
 
    
  }

}
