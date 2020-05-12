import { Component, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

@Component({
  selector: 'app-hotsite',
  templateUrl: './hotsite.component.html',
  styleUrls: ['./hotsite.component.css']
})
export class HotsiteComponent implements OnInit {
  html: string;
  sanitizer: DomSanitizer;
  constructor(sanitizer: DomSanitizer) {
    // this.html = `<div style="background: #0ff; height:50px;"> 
    //               <div class="container">
    //                 <div id="ct-wrapper">
    //                   <h1 id="ct-title"> HotSite Clientes </h1> 
    //                   <div id="box_01">
    //                   teste teste teste
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>`;
  }

  ngOnInit() {
  }

}
