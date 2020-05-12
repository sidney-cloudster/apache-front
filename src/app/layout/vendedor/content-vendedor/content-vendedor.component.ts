import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../../_services/content.service';
@Component({
  selector: 'app-content-vendedor',
  templateUrl: './content-vendedor.component.html',
  styleUrls: ['./content-vendedor.component.css']
})
export class ContentVendedorComponent implements OnInit {

  // public titulo;
  // public descricao;
  // public logo;

  constructor(private sContent:ContentService) { }

  ngOnInit() {
    // this.sContent.getInformacoes().subscribe(r =>{
      
      
    //   this.setHeader(
    //     r.titulo,
    //     r.descricao,
    //     r.logo
    //   );
    // })
  }

  // private setHeader(titulo:any,descricao:any,logo:any){

  //   this.titulo      = titulo;
  //   this.descricao   = descricao;
  //   this.logo        = logo;
  // }

  // getTitulo(){return this.titulo}
  // getDescricao(){return this.descricao}
  // getLogo(){return this.logo}
 

}
