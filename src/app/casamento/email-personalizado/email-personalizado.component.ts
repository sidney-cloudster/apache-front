import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Form } from '@angular/forms';
import { WINDOW } from '@ng-toolkit/universal';
import { CasamentoService } from 'src/app/_services/_casamento/casamento.service';

@Component({
  selector: 'app-email-personalizado',
  templateUrl: './email-personalizado.component.html',
  styleUrls: ['../casamento.component.css']
})
export class EmailPersonalizadoComponent implements OnInit {

  private consumer;

  public array;

  constructor(
    @Inject(WINDOW) private window: Window, 
    private user: UserService, 
    private sCasamento: CasamentoService,
    private cookieService: CookieService) {
    this.consumer = this.user.currentUserValue;
  }

  listForm = new FormGroup
    (
      {
        cpfCnpj: new FormControl(this.user.getCustomer().cpfCnpj),
        email: new FormControl('')
      }
    )

  ngOnInit() {
    this.consumer = this.user.getCustomer();
    this.sCasamento.getWenddingEmailsList(this.user.getCustomer().cpfCnpj).subscribe(r => {
      this.array = r;      
    })

  }

  onDelete(id: string, email: string) {
    Swal.fire({
      title: 'Confirmar exclusão?',
      text: "Você deseja mesmo excluir o e-mail " + email,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.value) {
        this.sCasamento.deleteWenddingEmails(id).subscribe(r => {
          this.array = r;
          Swal.fire(
            'Removido!',
            'O E-mail foi removido com sucesso.',
            'success'
          )
          setTimeout(function () {
            this.window.location.reload();
          }, 1500)          
        })
      }
    })
  }

  onSubmit(listForm: Form) {

    this.sCasamento.addWenddingEmails(listForm).subscribe(l => {

      this.consumer = this.user.getCustomer();
      this.sCasamento.getWenddingEmailsList(this.user.getCustomer().cpfCnpj).subscribe(r => {
        if (this.listForm.controls['email'].value != r.welEmail) {
          this.array = r;
          Swal.fire(
            'Mensagem!',
            l.Label,
            l.Code
          )
          setTimeout(function () {
            this.window.location.reload();
          }, 1500)          
        } else {

          Swal.fire(
            'E-Mail já existente!',
            'O e-mail ' + this.listForm.controls['email'].value + " já está cadastrado.",
            'error'
          )

        }
      })      
    })

  }

}
