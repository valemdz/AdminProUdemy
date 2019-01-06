import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Medico } from 'src/app/models/medico.model';

@Injectable()
export class MedicoService {

  urlBackend = environment.urlBackend;

  constructor( public http: HttpClient,
               public _us: UsuarioService ) { }

  cargarMedicos$( ) {
    const url = this.urlBackend + '/medico';
    return this.http.get( url );
  }

  buscarMedico$(	termino:	string ) {
    const url = this.urlBackend + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get( url );
  }

  agregarMedico$( medico: Medico ) {

    if ( medico._id  ) {
      const url = this.urlBackend + '/medico/' + medico._id + '?token=' + this._us.token;
      return this.http.put( url, medico )
                      .pipe(
                        map ( ( resp: any ) => {
                            swal( 'Medico actualizado con exito');
                            return resp.medico;
                        } )
                      );

    } else {
      const url = this.urlBackend + '/medico'  + '?token=' + this._us.token;
      return this.http.post( url, medico )
                 .pipe(
                   map ( ( resp: any ) => {
                    swal( 'Adicion de Medicos',
                          'El medico fue agregado con exito',
                          'success'  );
                    return resp.medico;
                   })
                 );
    }
  }

  borrarMedico$( id: string ) {
    const url = this.urlBackend + '/medico/' +  id + '?token=' + this._us.token;
    return this.http.delete( url ).pipe(
      map( resp => {
                    console.log( resp);
                    swal( 'Eliminacion de Medico',
                          'El medico ' + ''  + ' fue borrado con exito!!!',
                          'success' );
                    return resp;
                   })
    );
  }

  getMedico$( id: string ) {
    const url = this.urlBackend + '/medico/' + id;
    return this.http.get( url );
  }

  updatetMedico$( id: string, medico: Medico ) {

  }


}
