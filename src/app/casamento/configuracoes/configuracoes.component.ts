import { Component, OnInit} from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormControl, Form} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { CasamentoService } from 'src/app/_services/_casamento/casamento.service';
import { InfoCasamentoService } from 'src/app/_services/_casamento/info-casamento.service';
import { DadosService } from 'src/app/_services/dados.service';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['../casamento.component.css'],
})

export class ConfiguracoesComponent implements OnInit {

  private customer;
  public imageSrc: string;
  public array;
  public mensagem: string = '';
  public error: string;
  public dragAreaClass: string;
  public infoCasamento:any;
  public btnsDisabled:any = ['.btn-cadastro'];
  public btnDisabled:boolean = false;
  public listForm = new FormGroup
    (
      {
        id: new FormControl(''),
        cpf: new FormControl(''),
        nomeNoivo: new FormControl(''),
        nomeNoiva: new FormControl(''),
        dataEvento: new FormControl(''),
        horarioEvento: new FormControl(''),
        mensagemNoivos: new FormControl(''),
        localEvento: new FormControl(''),
        estadoEvento: new FormControl(''),
        cidadeEvento: new FormControl(''),
        imagemNoivos: new FormControl(''),
        idEndereco: new FormControl(''),
        dia: new FormControl(''),
        mes: new FormControl(''),
        ano: new FormControl(''),
      }
    )
  constructor(
    private sUser: UserService,
    private sCasamento: CasamentoService,
    private sCookieService: CookieService,
    private sInfoCasamento:InfoCasamentoService,
    public HttpClient: HttpClient,
    private sDados:DadosService) {
    this.customer = this.sUser.getCustomer();
  }

  ngOnInit() {
    if (localStorage.getItem('imagem') != null) {
      this.imageSrc = localStorage.getItem('imagem');
    } else {
      this.imageSrc = '';
    }

    this.customer = this.sUser.getCustomer();
    this.getDadosCasamento();
  }

  public getDadosCasamento(){
    this.infoCasamento = this.sInfoCasamento.getInfoNoivos();this.customer
    this.listForm.controls['id'].setValue(this.infoCasamento.id);
    this.listForm.controls['cpf'].setValue(this.sUser.getCustomer().cpfCnpj);
    this.listForm.controls['nomeNoivo'].setValue(this.infoCasamento.nomeNoivo);
    this.listForm.controls['nomeNoiva'].setValue(this.infoCasamento.nomeNoiva);
    this.listForm.controls['dataEvento'].setValue(this.infoCasamento.datacasamento);
    this.listForm.controls['mensagemNoivos'].setValue(this.infoCasamento.mensagem);
    this.listForm.controls['localEvento'].setValue(this.infoCasamento.local);
    this.listForm.controls['horarioEvento'].setValue(this.infoCasamento.horariocasamento);
    this.listForm.controls['estadoEvento'].setValue(this.infoCasamento.estado);
    this.listForm.controls['cidadeEvento'].setValue(this.infoCasamento.cidade);
    this.listForm.controls['imagemNoivos'].setValue(this.infoCasamento.foto);
    this.listForm.controls['idEndereco'].setValue(this.infoCasamento.idEndereco);
  }

  onSubmit(listForm: Form) {
    if(!this.btnDisabled){
      let data = this.listForm.controls['dataEvento'].value;
      let json = {
        id: this.listForm.controls['id'].value,
        cpf: this.listForm.controls['cpf'].value,
        nomeNoivo: this.listForm.controls['nomeNoivo'].value,
        nomeNoiva: this.listForm.controls['nomeNoiva'].value,
        dataEvento: this.sDados.dataBrToUsa(data),
        mensagemNoivos: this.listForm.controls['mensagemNoivos'].value,
        localEvento: this.listForm.controls['localEvento'].value,
        horarioEvento: this.listForm.controls['horarioEvento'].value,
        estadoEvento: this.listForm.controls['estadoEvento'].value,
        cidadeEvento: this.listForm.controls['cidadeEvento'].value,
        imagemNoivos: this.listForm.controls['imagemNoivos'].value,
        idEndereco: this.listForm.controls['idEndereco'].value
      }
      if (this.listForm.controls['dataEvento'].value == '') {
          document.getElementById('data').focus();
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'O campo Data do Evento é obrigatório para realizar o cadastro!',
          })
        }else if (!this.sDados.validDate(this.listForm.controls['dataEvento'].value,true,this.listForm.controls['horarioEvento'].value)) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Insira uma data valida!',
          })
        }else if (this.listForm.controls['horarioEvento'].value == '') {
          document.getElementById('horario').focus();
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'O campo Horário do Evento é obrigatório para realizar o cadastro!',
          })
        }
        else if (this.listForm.controls['nomeNoivo'].value == '') {
          document.getElementById('nome_noivo').focus();
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'O campo Nome do Noivo é obrigatório para realizar o cadastro!',
          })
        }
        else if (this.listForm.controls['nomeNoiva'].value == '') {
          document.getElementById('nome_noivo_dois').focus();
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'O campo Nome da Noiva é obrigatório para realizar o cadastro!',
          })
        }
        else if (this.listForm.controls['cpf'].value == '') {
          document.getElementById('data').focus();
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'O campo CPF é obrigatório para realizar o cadastro!',
          })
        }
        else if (this.listForm.controls['localEvento'].value == '') {
          document.getElementById('local_evento').focus();
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'O campo Local do Evento é obrigatório para realizar o cadastro!',
          })
        }
        else if (this.listForm.controls['estadoEvento'].value == '' || this.listForm.controls['estadoEvento'].value == null) {
          document.getElementById('estado').focus();
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'O campo Estado do Evento é obrigatório para realizar o cadastro!',
          })
        }
        else if (this.listForm.controls['cidadeEvento'].value == '') {
          document.getElementById('cidade').focus();
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'O campo Cidade do Evento é obrigatório para realizar o cadastro!',
          })
        }else if(this.listForm.controls['mensagemNoivos'].value.length > 200){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'O campo Mensagem não pode exceder 200 caracteres!',
          })
        } else {
        this.customer = this.sUser.getCustomer();
        this.disabled();
        this.sCasamento.putCasamento(json).subscribe(r => {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso!!!',
            text: 'Casamento foi atualizado com sucesso!',
          });
          this.sCasamento.getWenddingConfig(this.customer.cpfCnpj).subscribe(r => {
            if(r != null || r != undefined || r != ''){
              let dados:any = r;
              dados.cpfCnpj = this.customer.cpfCnpj;
              this.sInfoCasamento.setInfoNoivos(dados);
              this.getDadosCasamento();
              this.undisabled();
            }else{

            }
          }, error => {

          })
        })
      }
    }
  }

  onFileChange(event: any) {
    let files: FileList = event.target.files;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageSrc = event.target.result;        
        if (files.length > 1){
          this.error = "Only one file at time allow";
        }else {
          this.error = "";          
          localStorage.setItem('imagem', event.target.result);
        }
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  public disabled(){
    let elements = this.btnsDisabled;
    for(let e of elements){
      if(document.querySelector(e)){
        document.querySelector(e).setAttribute('disabled','');
      }
    }
    this.btnDisabled = true;
  }
  public undisabled(){
    let elements = this.btnsDisabled;
    for(let e of elements){
      if(document.querySelector(e)){
        document.querySelector(e).removeAttribute('disabled');
      }
    }
    this.btnDisabled = false;
  }

}
