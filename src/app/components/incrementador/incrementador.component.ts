import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @Input() leyenda: string = '  Leyenda';
  @Input() progress: number = 75;
  @Output() actualizarProgress: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log( this.leyenda );
  }

  cambiarValor( valor: number ) {
    if ( this.progress >= 100 && valor > 0 ) {
      this.progress = 100;
      return;
    }
    if ( this.progress <= 0 && valor < 0) {
      this.progress = 0;
      return;
    }

    this.progress = this.progress + valor;
    this.actualizarProgress.emit( this.progress );

  }

}
