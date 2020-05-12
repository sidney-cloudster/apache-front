import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.component.html',
  styleUrls: ['./minha-conta.component.css']
})
export class MinhaContaComponent implements OnInit {
  public customer;
  public hide = true;
  public formDados;
  public formAlterarSenha;
  constructor( private user:UserService,private form: FormBuilder) {
    this.customer = this.user.getCustomer();
    this.formDados = this.form.group({
      nomecompleto:this.form.control(this.customer.cusCompanyName),
      email:this.form.control(this.customer.cusEmail),
      nascimento:this.form.control(''),
      cpfcnpj:this.form.control({value:this.customer.cpfCnpj,disabled:true}),
      ofertas:this.form.control('')
    });

    this.formAlterarSenha = this.form.group({
      atualsenha:this.form.control(''),
      novasenha:this.form.control(''),
      confirmsenha:this.form.control('')
    })

  }

  ngOnInit() {
  }

  saveMinhaConta(){
    console.log(this.formDados.value);
  }
  saveSenha(){
    let form = this.formAlterarSenha.value;
    if(form.novasenha === form.confirmsenha){

    }else{

    }
  }

}
