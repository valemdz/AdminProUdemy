import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from 'src/app/services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(  @Inject(DOCUMENT) private _document , public _ss: SettingsService ) {

   }

  ngOnInit() {
    this._ss.colocarCheck();
  }


  cambiarColor( tema: string, link: any ) {

    this.cambiarCheck(link);

    this._ss.aplicarTema( tema );

    this._ss.ajustes.temaUrl = `assets/css/colors/${tema}.css`;
    this._ss.ajustes.tema = tema;

    this._ss.guardarAjustes( );

  }

  cambiarCheck( link: any ) {

    let selectores: any = document.getElementsByClassName('selector');

    for( let selector of selectores ) {
        selector.classList.remove('working');
    }
     link.classList.add('working');

  }


}
