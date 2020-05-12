import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nao-encontrado',
  templateUrl: './nao-encontrado.component.html',
  styleUrls: ['./nao-encontrado.component.css']
})
export class NaoEncontradoComponent implements OnInit {

  @Input() inputMsg;
  constructor() { }

  ngOnInit() {
  }

}
