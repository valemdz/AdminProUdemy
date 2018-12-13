import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File = null;


  imgTemp: any;

  constructor( public _us: UsuarioService) {
    this.usuario = _us.usuario;
   }

  ngOnInit() {
  }

  guardar( usuario: Usuario ) {
    console.log( usuario );

    this.usuario.nombre = usuario.nombre;

    if ( !this.usuario.google ) {
      this.usuario.email = usuario.email;
    }
    this._us.updateUsuario$( this.usuario)
    .subscribe( resp => console.log( resp) );

  }

  seleccionImagen( archivo: File ) {

    if ( !archivo  ) {
      this.imagenSubir = null;
      return;
    }


    if ( archivo.type.indexOf('image') < 0 ) {
        swal('Cambio de Imagen', 'El archivo Seleccionada no es una imagen', 'error' );
        return;
    }

    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urlTemp = reader.readAsDataURL( archivo);
    reader.onloadend = () => this.imgTemp = reader.result;


  }

  cambiarImagen() {

    console.log('guaradar imagen');

    this._us.cambiarImagen( this.imagenSubir, this._us.usuario._id);


  }

}
