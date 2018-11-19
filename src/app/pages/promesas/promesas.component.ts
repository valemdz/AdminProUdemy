import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

      this.contar3().then(  mensaje => console.log( 'Termino Bien!!!!', mensaje) )
             .catch( err => console.error('Temino con error', err ) );


   }

  ngOnInit() {
  }

  contar3(): Promise<boolean> {

    return new Promise(  ( resolve, reject ) =>  {
      let contador = 0;
      let intervalo = setInterval( () =>
      {
        contador += 1;
        console.log( contador );
        if ( contador === 3 ) {
            clearInterval( intervalo);
            resolve( true );
        }
      }
      , 1000);
    } );

  }


}
