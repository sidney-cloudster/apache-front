import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-erro404',
  templateUrl: './erro404.component.html',
  styleUrls: ['./erro404.component.css']
})
export class Erro404Component implements OnInit {

  @Input() inputPesquisa;
  constructor() { 
    
  }

  ngOnInit() {
  }

}
