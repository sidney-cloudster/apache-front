import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, Form, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { WINDOW } from '@ng-toolkit/universal';
import { CasamentoService } from 'src/app/_services/_casamento/casamento.service';
declare let $: any;

@Component({
  selector: 'app-enderecos',
  templateUrl: './enderecos.component.html',
  styleUrls: ['./enderecos.component.css']
})
export class EnderecosComponent implements OnInit {
  public checked: string;
  public customer;
  public enderecoPadrao = [];
  public endereco = [];
  public check;
  public enderecoPrincipal:boolean = false;
  public btnsDisabled:any  = [".btn-edit",".btn-add"];
  public idEnderecoEdit:number = 0;
  public editCidade:String = '';
  public editUf:String = '';
  public addCidade:String = '';
  public addUf:String = '';
  public qtdEnderecos:number = 0;
  public listForm = new FormGroup
    (
      {
        cep: new FormControl(''),
        endereco: new FormControl(''),
        numero: new FormControl(''),
        bairro: new FormControl(''),
        complemento: new FormControl(''),
        cidade: new FormControl({value:'',disabled:true}),
        uf: new FormControl({value:'',disabled:true}),
        responsavel: new FormControl(''),
        cpf: new FormControl(this.sUser.getCustomer().cpfCnpj),
        tipo: new FormControl(false),
        telefone:new FormControl('')
      }
    )
  public listEdit = new FormGroup
    (
      {
        idCustomersAddress: new FormControl(''),
        cep: new FormControl(''),
        endereco: new FormControl(''),
        numero: new FormControl(''),
        bairro: new FormControl(''),
        complemento: new FormControl(''),
        cidade: new FormControl({value:'',disabled:true}),
        uf: new FormControl({value:'',disabled:true}),
        responsavel: new FormControl(''),
        cpf: new FormControl(this.sUser.getCustomer().cpfCnpj),
        tipo: new FormControl(''),
        telefone:new FormControl('')
      }
    )

  constructor(
    @Inject(WINDOW) private window: Window,
    private sUser: UserService, 
    private sCasamento: CasamentoService,
    private router: Router,
    private cookieService: CookieService) {
    this.customer = this.sUser.getCustomer();
    this.cookieService.set('idAddress', null);
  }

  ngAfterViewInit() {
    this.disabled();
  }

  buscaEnderecos(){
    this.endereco = [];
    this.sUser.getEnderecoDefault(this.sUser.getCustomer().cpfCnpj).subscribe(r => {
      this.enderecoPrincipal = true;
      for (let endereco of r) {
        this.endereco.push(endereco);
      }
      this.undisabled();
    },
    e =>{
      this.undisabled();
    });

    this.sUser.getEnderecoSecundario(this.sUser.getCustomer().cpfCnpj).subscribe(r => {
      for (let endereco of r) {
        this.endereco.push(endereco);
      }
      this.undisabled();
    },
    e =>{
      this.undisabled();
    });
  }

  ngOnInit() {
    this.customer = this.sUser.getCustomer();
    
    this.buscaEnderecos();
  }

  onSubmit() {
    this.disabled();
    let principal = (this.listForm.controls['tipo'].value)?'R':'C';
    this.listForm.controls['tipo'].setValue(principal);
    if (this.listForm.controls['responsavel'].value == '') {
      document.getElementById('nome_destinatario_').focus();
      Swal.fire({ icon: 'error', title: 'Ops.', text: 'O campo Nome do Destinatário é obrigatório para realizar o cadastro!' })
    } else if (this.listForm.controls['cep'].value == '') {
      document.getElementById('cep_').focus();
      Swal.fire({ icon: 'error', title: 'Ops.', text: 'O campo CEP é obrigatório para realizar o cadastro!' })
    }
    else if (this.listForm.controls['endereco'].value == '') {
      document.getElementById('endereco_').focus();
      Swal.fire({ icon: 'error', title: 'Ops.', text: 'O campo Endereço é obrigatório para realizar o cadastro!' })
    }
    else if (this.listForm.controls['numero'].value == '') {
      document.getElementById('numero_').focus();
      Swal.fire({ icon: 'error', title: 'Ops.', text: 'O campo Número é obrigatório para realizar o cadastro!' })
    }
    else if (this.listForm.controls['bairro'].value == '') {
      document.getElementById('bairro_').focus();
      Swal.fire({ icon: 'error', title: 'Ops.', text: 'O campo Bairro é obrigatório para realizar o cadastro!' })
    }
    else if (this.listForm.controls['cidade'].value == '') {
      document.getElementById('cidade_').focus();
      Swal.fire({ icon: 'error', title: 'Ops.', text: 'O campo Cidade é obrigatório para realizar o cadastro!' })
    }
    else if (this.listForm.controls['uf'].value == '') {
      document.getElementById('estado_').focus();
      Swal.fire({ icon: 'error', title: 'Ops.', text: 'O campo Estado é obrigatório para realizar o cadastro!' })
    } else if(this.enderecoPrincipal && principal == 'R'){
      Swal.fire({ icon: 'error', title: 'Ops.', text: 'Ja existe um endereço como principal.' })
    }else{
      
      if(this.endereco.length <= 2){
        this.sUser.postEndereco(this.getJsonEndereco(this.listForm.value,'add')).subscribe(r => {
          this.endereco = [];
          Swal.fire(r.Label, '', r.Code)
          if (r.Code == 'success') {
            this.undisabled();
            this.buscaEnderecos();
          }
        },
        e =>{
          $('#endereco-adicionar').modal('hide');
          Swal.fire({ icon: 'error', text: 'Desculpe, houve um erro ao cadastrar um novo endereço.' });
          this.undisabled();
        })
      }else{
        Swal.fire({ icon: 'error', title: 'Ops.', text: 'Você atingiu o máximo de 2 endereços.' })
      }
  }
}

autoDataCep(tipo:any) {
  this.disabled();
  let tipoForm:any = (tipo == 'add') ? this.listForm : this.listEdit;
  this.sCasamento.getCepAutoData(tipoForm.value.cep).subscribe(r => {
    r.forEach(cepData => {
      if(tipo == 'add'){
        this.listForm.controls['endereco'].setValue(cepData.cepAddress);
        this.listForm.controls['bairro'].setValue(cepData.cepDistrict);
        this.listForm.controls['cidade'].setValue(cepData.cepNameCity);
        this.listForm.controls['uf'].setValue(cepData.cepUF);
        this.addCidade = cepData.cepNameCity;
        this.addUf = cepData.cepUF;
      }else{
        this.listEdit.controls['endereco'].setValue(cepData.cepAddress);
        this.listEdit.controls['bairro'].setValue(cepData.cepDistrict);
        this.listEdit.controls['cidade'].setValue(cepData.cepNameCity);
        this.listEdit.controls['uf'].setValue(cepData.cepUF);
        this.editCidade = cepData.cepNameCity;
        this.editUf = cepData.cepUF;
      }
    });
    this.undisabled();
  },
  e=>{
    if(tipo == 'add'){
      this.listForm.controls['endereco'].setValue('');
      this.listForm.controls['bairro'].setValue('');
      this.listForm.controls['cidade'].setValue('');
    }else{
      this.listEdit.controls['endereco'].setValue('');
      this.listEdit.controls['bairro'].setValue('');
      this.listEdit.controls['cidade'].setValue('');
    }

    this.undisabled();
  })
}

getEditData(idAddress) {
  let element   = <HTMLInputElement>document.getElementById("default_");
  this.customer = this.sUser.getCustomer();
  this.disabled();
  this.sUser.getAddressSelectById(idAddress).subscribe(r => {
    this.idEnderecoEdit = idAddress;
    r.forEach(data_ => {
      this.listEdit.controls['idCustomersAddress'].setValue(data_.idCustomersAddress);
      this.listEdit.controls['cep'].setValue(data_.cep);
      this.listEdit.controls['endereco'].setValue(data_.endereco);
      this.listEdit.controls['numero'].setValue(data_.numero);
      this.listEdit.controls['complemento'].setValue(data_.complemento);
      this.listEdit.controls['cidade'].setValue(data_.cidade);
      this.listEdit.controls['uf'].setValue(data_.uf);
      this.listEdit.controls['responsavel'].setValue(data_.responsavel);
      this.listEdit.controls['bairro'].setValue(data_.bairro);
      this.editCidade = data_.cidade;
      this.editUf = data_.uf;
      // this.listEdit.controls['tipoed'].setValue(data_.tipo);
      this.check = data_.tipo;
      if(this.check == 'R') {
        element.checked = true;
      } else {
        element.checked = false;
      }
    });
    this.undisabled();
  },
  e=>{
    this.idEnderecoEdit = 0;
  })
}
onUpdate() {
  let principal = (this.listEdit.controls['tipo'].value)?'R':'C';
  this.listEdit.controls['tipo'].setValue(principal);
  this.listEdit.controls['idCustomersAddress'].setValue(this.idEnderecoEdit);
  this.disabled();
  if (this.listEdit.controls['responsavel'].value == '') {
    document.getElementById('nome_destinatario_').focus();
    Swal.fire({ icon: 'error', title: 'Ops.', text: 'O campo Nome do Destinatário é obrigatório para realizar o cadastro!' })
  } else if (this.listEdit.controls['cep'].value == '') {
    document.getElementById('cep_').focus();
    Swal.fire({ icon: 'error', title: 'Ops.', text: 'O campo CEP é obrigatório para realizar o cadastro!' })
  }
  else if (this.listEdit.controls['endereco'].value == '') {
    document.getElementById('endereco_').focus();
    Swal.fire({ icon: 'error', title: 'Ops.', text: 'O campo Endereço é obrigatório para realizar o cadastro!' })
  }
  else if (this.listEdit.controls['numero'].value == '') {
    document.getElementById('numero_').focus();
    Swal.fire({ icon: 'error', title: 'Ops.', text: 'O campo Número é obrigatório para realizar o cadastro!' })
  }
  else if (this.listEdit.controls['bairro'].value == '') {
    document.getElementById('bairro_').focus();
    Swal.fire({ icon: 'error', title: 'Ops.', text: 'O campo Bairro é obrigatório para realizar o cadastro!' })
  }
  else if (this.listEdit.controls['cidade'].value == '') {
    document.getElementById('cidade_').focus();
    Swal.fire({ icon: 'error', title: 'Ops.', text: 'O campo Cidade é obrigatório para realizar o cadastro!' })
  }
  else if (this.listEdit.controls['uf'].value == '') {
    document.getElementById('estado_').focus();
    Swal.fire({ icon: 'error', title: 'Ops.', text: 'O campo Estado é obrigatório para realizar o cadastro!' })
  } else {
    if(this.idEnderecoEdit > 0){      
      this.sUser.putEndereco(this.idEnderecoEdit, this.getJsonEndereco(this.listEdit.value,'edit')).subscribe(r => {
        Swal.fire({ icon: r.Code, text: r.Label });
        setTimeout(function () {
          this.undisabled();
          this.window.location.reload();
        }, 1500)
      },
      e =>{
        $('#endereco-editar').modal('hide');
        Swal.fire({ icon: 'error', text: 'Desculpe, houve um erro ao editar seu endereço.'});
        this.undisabled();
      })
    }
  }
  
}
  public getJsonEndereco(form:any,tipo:any){
    let json = {
      bairro: form.bairro,
      cep: form.cep,
      cidade: (tipo == 'add') ? this.addCidade : this.editCidade,
      complemento: form.complemento,
      cpfCnpj: form.cpfCnpj,
      endereco: form.endereco,
      numero: form.numero,
      responsavel: form.responsavel,
      tipo: form.tipo,
      uf: (tipo == 'add') ? this.addUf : this.editUf,
      cpf:form.cpf
    }
    return json;
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
}
