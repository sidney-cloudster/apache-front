import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-produto-nao-encontrado',
  templateUrl: './produto-nao-encontrado.component.html',
  styleUrls: ['./produto-nao-encontrado.component.css']
})
export class ProdutoNaoEncontradoComponent implements OnInit {

  @Input() inputMsg;
  constructor() { }

  ngOnInit() {
  }

}
