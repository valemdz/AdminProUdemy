import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalUploadService {

  public tipo: string;
  public id: string;
  public oculto: string = 'oculto';

  public notificacion = new EventEmitter<any>();


  constructor() {
    console.log('modal services Listo **********');
  }

  ocultarModal() {
    this.oculto = 'oculto';
    this.id = null;
    this.tipo = null;
  }

  mostraModal( tipo: string, id: string ) {
      this.oculto = '';
      this.tipo = tipo;
      this.id = id;
  }

}
