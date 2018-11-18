import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl : 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor( @Inject(DOCUMENT) private _document ) {
    this.cargarAjustes();
  }

  guardarAjustes(  ) {
    //console.log('Guardado en el local');
    localStorage.setItem( 'ajustes', JSON.stringify( this.ajustes ));
  }

  cargarAjustes() {

    if ( localStorage.getItem('ajustes') ) {
        this.ajustes = JSON.parse( localStorage.getItem('ajustes') );
        this.aplicarTema( this.ajustes.tema);
        //console.log('cargando de ajustes del local storage');
    } else {
        this.aplicarTema( this.ajustes.tema);
        //console.log('cargando de ajustes Default');
    }
    //this.cargarColorByAjustes( this.ajustes );
  }

  aplicarTema( tema: string ) {
    const url = `assets/css/colors/${tema}.css`;
    this._document.getElementById('tema').setAttribute('href', url);
  }

  colocarCheck() {

    let selectores: any = document.getElementsByClassName('selector');
    for ( const ref of selectores ) {
      if (  ref.getAttribute('data-theme') ===  this.ajustes.tema ) {
        ref.classList.add('working');
        break;
      }
    }

  }


}



interface Ajustes {
    temaUrl: string;
    tema: string;
}
