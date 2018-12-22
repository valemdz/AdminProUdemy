import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import swal from 'sweetalert';



@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  urlBackend =  environment.urlBackend;

  constructor( private http: HttpClient,
               private router: Router,
               public subirService: SubirArchivoService ) {
    console.log('Servicio de Usuario listo');
    this.cargarStorage();
   }

  guardarStorage( id: string, token: string, usuario: Usuario ) {

    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'usuario', JSON.stringify( usuario ) );

    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    localStorage.removeItem( 'id' );
    localStorage.removeItem( 'token' );
    localStorage.removeItem( 'usuario' );

    this.usuario = null;
    this.token = '';

    this.router.navigate(['/login']);
  }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {
    if ( localStorage.getItem('token') ) {
        this.token = localStorage.getItem('token');
        this.usuario = JSON.parse( localStorage.getItem('usuario') );
    } else {
        this.token = '';
        this.usuario = null;
    }
  }

  crearUsuario$( usuario: Usuario ) {

    const url = this.urlBackend + '/usuario';
    return this.http.post( url, usuario )
    .pipe( map(  ( resp: any) => {
        swal('Usuario Creado', usuario.email, 'success');
        return resp.usuario;
    }));
  }

  loginNormal$( usuario: Usuario, recuerdarme: boolean = false ) {
    const url = this.urlBackend + '/login';

    if ( recuerdarme ) {
        localStorage.setItem('email', usuario.email );
    } else {
        localStorage.removeItem('email' );
    }

    return this.http.post( url, usuario )
      .pipe(
        map ( ( resp: any ) => {

          this.guardarStorage( resp.id, resp.token, resp.usuario );
          // localStorage.setItem( 'id', resp.id );
          // localStorage.setItem( 'token', resp.token );
          // localStorage.setItem( 'usuario', JSON.stringify( resp.usuario ) );
          return true;
        })
      );
  }

  loginGoogle$( token ) {

    const url = this.urlBackend + '/login/google';

    return  this.http.post( url, {token} )
            .pipe( map( ( resp: any ) =>  {
                        this.guardarStorage( resp.id, resp.token, resp.usuario );
                        return true;
                      })
            );
  }

  updateUsuario$( usuario: Usuario ) {

    const url = this.urlBackend + '/usuario/' + usuario._id + '?token=' + this.token;

    return this.http.put( url, usuario )
    .pipe( map(
        ( resp: any) => {

          if (  resp.usuario._id === this.usuario._id ) {
                this.guardarStorage(  resp.usuario._id , this.token, resp.usuario );
          }
          swal( 'Usuario Actualizado Correctamente', resp.usuario.nombre, 'success');
          return true;
        }
    ));

  }

  cambiarImagen( file: File, id: string ) {
    this.subirService.subirArchivo( file, 'usuarios', id )
    .then( ( resp: any ) => {
                    console.log( resp);
                    this.usuario.img = resp.usuarioGuardado.img;
                    swal('Imagen Actualizada', resp.usuarioGuardado.nombre, 'success' );
                    this.guardarStorage(  resp.usuarioGuardado._id , this.token, resp.usuarioGuardado );
                    })
    .catch( err => console.log(err));
  }

  getUsuarios$( desde: number ) {

    const url = this.urlBackend + '/usuario?desde=' + desde;
    return this.http.get( url );
  }

  buscarEnUsuario$( busqueda: string ) {
    const url = this.urlBackend +  `/busqueda/coleccion/usuarios/${busqueda}`;
    return this.http.get( url );
  }

  borrarUsuario$( idUsuario: string ) {
    const url = this.urlBackend + `/usuario/${ idUsuario }?token=${this.token}`;
    return this.http.delete( url ).pipe( map (
                      ( resp: any ) => {
                      swal( 'Eliminacion',
                            `El usuario ${ resp.usuario.nombre} fue eliminado con exito`,
                            'success');
                      return true;
                    }
            ));
  }


}
