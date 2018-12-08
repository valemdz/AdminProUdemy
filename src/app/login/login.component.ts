import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { IfStmt } from '@angular/compiler';

declare function init_plugin();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:  string;
  password: string;
  recuerdame: boolean = false;

  auth2: any;

  constructor( private _router: Router,
               public _us: UsuarioService ) { }

  ngOnInit() {
    init_plugin();

    this.googleInit();

    this.email = localStorage.getItem('email') || '';

    if ( this.email.length > 0 ) {
      this.recuerdame = true;
    }
  }

  googleInit(){

    gapi.load( 'auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '731382486779-6brb9g844ki4pmvcoh4fd8v6c3e9afg4.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle'));


    });
  }

  attachSignin( element ){

    this.auth2.attachClickHandler( element, {}, (googleUser) => {
        //let profile = googleUser.getBasicProfile();
        //console.log( profile );

        let token = googleUser.getAuthResponse().id_token;
        this.ingresarGoogle( token );
    });


  }

  ingresar( forma: NgForm ) {

      console.log( forma.value );
      console.log( forma.valid );

      if ( forma.valid  ) {

          const usuario = new Usuario( null, forma.value.email, forma.value.password );

          this._us.loginNormal$( usuario,  forma.value.recuerdame )
          .subscribe ( correcto => this._router.navigate(['/dashboard']) );
      }
  }

  ingresarGoogle( token ) {
     this._us.loginGoogle$(  token )
    .subscribe( correcto =>  window.location.href = '#/dashboard' );
  }

}
