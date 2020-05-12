import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-atendimentos',
  templateUrl: './atendimentos.component.html',
  styleUrls: ['./atendimentos.component.css']
})
export class AtendimentosComponent implements OnInit {

  public tipoMsg = [
    {txt:"Dúvida",value:1},
    {txt:"Elogio",value:2},
    {txt:"Reclamações",value:3},
    {txt:"Informações",value:4},
    {txt:"Sugestão",value:5},
    {txt:"Outro",value:6},
  ];

  public formAtendimento;

  constructor(
    private form:FormBuilder
  ) {
    this.formAtendimento = this.form.group({
      tipo:this.form.control(''),
      email:this.form.control(''),
      celular:this.form.control(''),
      telefone:this.form.control(''),
      assunto:this.form.control(''),
      mensagem:this.form.control('')
    })
  }

  public saveAtendimento(){
    console.log(this.formAtendimento);
  }
  ngOnInit() {
  }

}
