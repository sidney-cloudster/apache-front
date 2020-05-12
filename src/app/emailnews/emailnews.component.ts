import { Component, OnInit } from '@angular/core';
import { RequisicoesService } from '../_services/requisicoes.service';
import { EmailnewsService } from '../_services/emailnews.service';
import { FormGroup, FormControl, Form } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-emailnews',
  templateUrl: './emailnews.component.html',
  styleUrls: ['./emailnews.component.css']
})
export class EmailnewsComponent implements OnInit {

  msgResposta;
  msgRetorno = '';

  constructor(private sEmail: EmailnewsService) { }

  ngOnInit() {
  }

  listForm = new FormGroup
    ({
      nome: new FormControl(''),
      email: new FormControl('')
    })

  sendEmail(listForm: Form) {
    var erro = this.errorValidation(listForm);
    if (this.listForm.controls['nome'].value == '' || this.listForm.controls['email'].value == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Os campos Nome e Email são obrigatórios!'
      })
    } else {
      if (!erro) {
        this.sEmail.cadastrarEmailPromocao(listForm).subscribe(
          r => {
            this.showMessage(r.Code, r.Label);
          },
          e => {
            console.log("ERRO AO CADASTRAR E-MAIL PROMOÇÃO", e);
            console.log(listForm);
          })
      }
    }
  }

  showMessage(code: any, label: any) {
    var msgerro = '<div class="alert alert-danger" role="alert"><center>E-mail inválido.</center></div>';

    if (code == "error") {
      this.msgRetorno = '<div class="alert alert-warning" role="alert"><center>' + label + '</center></div>';
    } else if (code == "success") {
      this.msgRetorno = '<div class="alert alert-success" role="alert"><center>' + label + '</center></div>';
    } else {
      //UNKNOWN
    }
  }



  private errorValidation(data: any) {
    var erro;
    if (data.nome == "") {
      erro = "nome_empty";
    } else if (data.email == "") {
      erro = "email_empty";
    } else if (data.nome.length > 80) {
      erro = "nome_long";
    } else if (data.email.length > 100) {
      erro = "email_long";
    } else {
      erro = false;
    }
    return erro;
  }

}
