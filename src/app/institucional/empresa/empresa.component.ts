import { Component, OnInit, Sanitizer, Pipe } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { RequisicoesService } from 'src/app/_services/requisicoes.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})

@Pipe({ name: 'safeHtml'})
export class EmpresaComponent implements OnInit {

  public empresa: string;

  constructor(
    private sRequisicao:RequisicoesService,
    private  sanitizer: DomSanitizer
  ) { 
    this.sRequisicao.getInformacoes().subscribe( r =>{
      if(r.empresa.length > 0){
        this.empresa = r.empresa;
      }
    },
    e =>{
      console.log("Erro ao buscar Informacoes",e);
    })
  }

  ngOnInit() {
    
  }

  public getSanitizer(){
    return this.sanitizer.bypassSecurityTrustHtml(this.empresa);
  }
}
