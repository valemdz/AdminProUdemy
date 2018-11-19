import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {


  contadorSubs: Subscription;

  constructor() {



    this.contadorSubs = this.regresaObservable()
    .subscribe(  numero => console.log( 'numero ', numero),
                    error => console.error('Hubo un error', error ),
                    () => console.log('Termino el Observable') );

  }



  regresaObservable(): Observable<any> {

        return new Observable( (observer:Subscriber<any>) => {

          let contador = 0;

          let intervalo = setInterval( () => {

            contador += 1;

            let objeto = { valor: contador };

            observer.next( objeto );

            // if ( contador === 3 ) {
            //   clearInterval( intervalo );
            //   observer.complete();
            // }

            // if ( contador === 2 ) {
            //   //clearInterval( intervalo );
            //   observer.error('Auxilio');
            // }

          }, 1000);

      }).pipe(
               map( objeto => objeto.valor ),
               filter( (valor, index) =>{
                 if ( valor % 2 === 0 ) {
                   return false;
                 } else {
                  return true;
                 }
               }) );


  }

  ngOnInit() {
  }


  ngOnDestroy(): void {
    this.contadorSubs.unsubscribe();
    console.log('la pagina se va a cerrar');
  }

}


/*

constructor() {



    this.regresaObservable().pipe( retry() )
    .subscribe(  numero => console.log( 'numero ', numero),
                    error => console.error('Hubo un error', error ),
                    () => console.log('Termino el Observable') );

  }



  regresaObservable(): Observable<number> {

        return new Observable( observer => {

          let contador = 0;

          let intervalo = setInterval( () => {

            contador += 1;
            observer.next( contador );

            if ( contador === 3 ) {
              clearInterval( intervalo );
              observer.complete();
            }

            if ( contador === 2 ) {
              //clearInterval( intervalo );
              observer.error('Auxilio');
            }

          }, 1000);

      });


  }
*/
