import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { FormGroup, FormControl, Form, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Md5 } from 'ts-md5/dist/md5';
import { DadosService } from 'src/app/_services/dados.service';
import { CasamentoService } from 'src/app/_services/_casamento/casamento.service';
import { InfoCasamentoService } from 'src/app/_services/_casamento/info-casamento.service';

@Component({
  selector: 'app-criar-lista',
  templateUrl: './criar-lista.component.html',
  styleUrls: ['../casamento.component.css']
})

export class CriarListaComponent implements OnInit {

  private customer;
  public mensagem:any = '';

  listForm = new FormGroup
    ({
      dataEvento: new FormControl('', [Validators.required, Validators.email]),
      horarioEvento: new FormControl('', [Validators.required]),
      nomeNoivo: new FormControl(this.user.getCustomer().cusCompanyName, [Validators.required]),
      nomeNoiva: new FormControl('', [Validators.required]),
      cpf: new FormControl(this.user.getCustomer().cpfCnpj, [Validators.required]),
      localEvento: new FormControl('', [Validators.required]),
      estadoEvento: new FormControl('', [Validators.required]),
      cidadeEvento: new FormControl('', [Validators.required]),
      imagemNoivos: new FormControl('', [Validators.required]),
      mensagemNoivos: new FormControl('')
    })

  constructor(
    private user: UserService,  
    private router: Router, 
    private cookieService: CookieService,
    private sDados:DadosService,
    private sInfoCasamento:InfoCasamentoService,
    private sCasamento:CasamentoService) {
    this.customer = this.user.getCustomer();
    if(this.customer){
      this.sCasamento.getWenddingConfig(this.customer.cpfCnpj).subscribe(r => {
        if(r != null || r != undefined || r != ''){
          let dados:any = r;
          dados.cpfCnpj = this.customer.cpfCnpj;
          this.sInfoCasamento.setInfoNoivos(dados);
          this.router.navigate(['/casamento','painel']);
        }
      })
    }
  }

  ngOnInit() {    
    this.cookieService.delete('cookie');
  }

  onSubmit(listForm: Form) {
    if(!this.sInfoCasamento.getInfoNoivos()){
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
      else if (this.listForm.controls['estadoEvento'].value == '') {
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
        let r = Math.random().toString(36).substring(7);
        const md5 = new Md5();
        let cookie_hash = md5.appendStr(r).end().toString();
        this.cookieService.set('cookie', cookie_hash);
        this.cookieService.set('CASAM-NV', JSON.stringify(listForm));
        this.router.navigate(['/casamento/criar-lista-endereco']);
      }
    }else{
      this.router.navigate(['/casamento']);
    }
      // 
    // this.cookie_json = this.cookieService.get('cookie_json');

    // this.cookieService.set('cookie_cpf', this.listForm.value.cpf);
    // this.cookie_cpf = this.cookieService.get('cookie_cpf');

  }

 
}
