import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { UsuarioService } from '../services/service.index';

//import * as swal from 'sweetalert';
import { Subscription } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';


declare function init_plugin();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {


  forma: FormGroup;
  crearUsuarioSubsc: Subscription;

  constructor( private fb: FormBuilder, public _us: UsuarioService, private router: Router ) {
      this.crearForm();
  }


 sonIguales( campo1: string, campo2: string ) {
    return ( group: FormGroup) => {
      const pass1 = group.controls['password'].value;
      const pass2 = group.controls['confirm'].value;

      if ( pass1 === pass2 ) {
          return null;
      }

      return {
        noIguales: true
      };
    }
  }

  crearForm() {
    this.forma = this.fb.group( {
      nombre: [ null, [ Validators.required ] ],
      email: [ null, [ Validators.required, Validators.email ]],
      password: [ null, [ Validators.required]],
      confirm: [ null, [ Validators.required ] ],
      condiciones: [ false, [Validators.required ]]
    }, { validator: this.sonIguales('password', 'confirm')});

    this.forma.setValue({
      nombre: 'test',
      email: 'test@gmail.com',
      password: '1234',
      confirm: '1234',
      condiciones: true
    });

  }

  ngOnInit() {
    init_plugin();
  }

  registrarUsuario() {

    if( this.forma.invalid ){
      return;
    }

    if ( !this.forma.value.condiciones ) {
      swal("Importante!", "Debe aceptar las condiciones", "warning");
      return;
    }
    this.crearUsuario( this.prepararUsuario());
  }

  prepararUsuario() {
    const form = this.forma.getRawValue();
    const usuario: Usuario = {
      nombre : form.nombre,
      email : form.email,
      password: form.password,
      google: false
    };
    return usuario;
  }

  crearUsuario( usuario: Usuario ) {

    this.crearUsuarioSubsc = this._us.crearUsuario$(usuario)
    .subscribe(  this.okCrearUsuario.bind(this), this.errorCrearUsuario.bind( this ) );

  }

  okCrearUsuario( usuarioCreado ) {
      console.log( usuarioCreado );

      this.router.navigate(['/login']);
  }

  errorCrearUsuario( err ){
    console.log( err);
  }


  ngOnDestroy(): void {
    if ( this.crearUsuarioSubsc ) {
      this.crearUsuarioSubsc.unsubscribe();
    }
  }


}
