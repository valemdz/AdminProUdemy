import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';



@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  urlBackend =  environment.urlBackend;

  constructor( private http: HttpClient,
               private router: Router ) {
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



}
