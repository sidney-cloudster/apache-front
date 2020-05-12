import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import xml2js from 'xml2js';
import { MarketingService } from '../_services/marketing.service';
import { utf8Encode } from '@angular/compiler/src/util';

// import { NgxXml2jsonService } from 'ngx-xml2json';
// import { MarketingService } from '../_services/marketing.service';
// import { FormControl, FormGroup } from '@angular/forms';
// import { RequisicoesService } from '../_services/requisicoes.service';
// import { Router, ActivatedRoute } from '@angular/router';
// import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-xml-anunciante',
  templateUrl: 'xml-anunciante.component.html',
  styleUrls: ['./xml-anunciante.component.css']
})

export class XmlAnuncianteComponent implements OnInit {

  xml: string;
  idXml: number;
  verificador: string;
  tela;

  constructor(private sMarketingService: MarketingService) {

  }

  ngOnInit(): void {

    this.idXml = 3;
    this.verificador = 'jacotei';

    this.sMarketingService.getXmlAnunciante(this.idXml, this.verificador).subscribe(v => {

      this.xml = v;

      let blob = new Blob([v], { type: 'text/xml' });
      let url = window.URL.createObjectURL(blob);
      window.open(url); 

      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'blob';
      xhr.onload = function (e) {
          if (this.status == 200) {
            console.log(this.response);
            // myBlob is now the blob that the object URL pointed to.
          }
        };
        xhr.send();

      });

    }

  //   this.sMarketingService.getXmlAnunciante(this.idXml, this.verificador).subscribe(v => {
  //     let blob = new Blob([v], { type: 'text/xml' });
  //     let url = window.URL.createObjectURL(blob);
  //     var xhr = new XMLHttpRequest;
  //     xhr.responseType = 'blob';
  //     xhr.onload = function () {
  //       var recoveredBlob = xhr.response;
  //       var reader = new FileReader();
  //       reader.readAsDataURL(blob);
  //       reader.onloadend = function () {
  //         var base64data = reader.result;
  //         window.open(url);
  //         document.getElementById("xml").innerHTML += base64data.toString();
  //         console.log(base64data);
  //       }
  //       reader.readAsDataURL(recoveredBlob);
  //     };
  //     xhr.open('GET', url);
  //     xhr.send();
  //   });
  // }

}