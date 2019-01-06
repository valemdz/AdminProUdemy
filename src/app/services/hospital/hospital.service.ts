import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Hospital } from 'src/app/models/hospital.model';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';



@Injectable()
export class HospitalService {

  urlBackend = environment.urlBackend;

  constructor( private http: HttpClient,
               private _us: UsuarioService  ) { }

  cargarHospitales$() {
    const url = this.urlBackend + '/hospital';
    return this.http.get( url );
  }

  buscarHospital$(	termino:	string ) {
    const url = this.urlBackend + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get( url );
  }

  actualizarHospital$(	hospital:	Hospital	) {
    const url = this.urlBackend +  '/hospital/' + hospital._id + '?token=' + this._us.token ;
    return this.http.put( url, hospital).pipe( map( ( resp: any ) => {
                        swal( 'Actualizacion de Hospitales',
                              'El Hospital [' + hospital.nombre + '] fue actualizado con exito!!!',
                              'success');
                        return true;
        }) );

  }

  borrarHospital$(	id:	string	) {
    const url = this.urlBackend +  '/hospital/' + id + '?token=' + this._us.token ;
    return this.http.delete( url).pipe( map( ( resp: any ) => {

                        console.log( resp );
                        swal( 'Actualizacion de Hospitales',
                              'El Hospital fue eliminado con exito!!!',
                              'warning' );
                        return true;
        }) );

  }

  crearHospital$(	nombre:	string	) {

    const hospital = new Hospital( nombre );
    const url = this.urlBackend +  '/hospital?token=' + this._us.token ;

    return this.http.post( url, hospital ).pipe(
      map( ( resp: any) => {
                        console.log( resp );
                        swal( 'Agregar Hospitales',
                              'El Hospital [' + nombre + '] fue agregado con exito!!!',
                              'success' );
                        return resp;
       } )
    );

  }

  obtenerHospital$(	id:	string ) {
    const url = this.urlBackend +  '/hospital/' + id ;
    return this.http.get( url ).pipe(
      map( ( resp: any ) => resp.hospital )
    );
  }

}
