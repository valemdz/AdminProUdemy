import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import swal from 'sweetalert';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit, OnDestroy {

  totalUsuarios;
  usuarios: Usuario[];

  usuarioSubs: Subscription;
  busquedaSubs: Subscription;
  deleteSubs: Subscription;
  updateSubs: Subscription;

  loading = false;
  cantidaPorPage = 5;
  desde: number = 0;

  constructor( public _us: UsuarioService,
               public _ms: ModalUploadService ) { }

  ngOnInit() {
    this.getUsuarios();
    this._ms.notificacion.subscribe( ( resp: any) => {
        swal('Imagen Actualizada', resp.usuarioGuardado.nombre, 'success' );
        if ( resp.usuarioGuardado._id === this._us.usuario._id ) {
             this._us.usuario.img = resp.usuarioGuardado.img;
             this._us.guardarStorage(  resp.usuarioGuardado._id , this._us.token, resp.usuarioGuardado );
        }

        this.updateImagenUsuarioLista( resp.usuarioGuardado );

    } );
  }

  updateImagenUsuarioLista( usuarioGuardado: Usuario  ) {
    const usuario: Usuario = this.usuarios.find( ( u: any )  => u._id === usuarioGuardado._id );

    if ( usuario ) {
         usuario.img = usuarioGuardado.img;
    }
  }

  getUsuarios() {

    this.loading = true;

    this.usuarioSubs = this._us.getUsuarios$( this.desde )
                          .subscribe( ( resp: any ) => {
                              this.totalUsuarios = resp.total;
                              this.usuarios = resp.usuarios;
                              this.loading = false;
                          }) ;
  }

  cambiarDesde( desde: number = 0 ) {

    if (  this.desde + desde < 0  ) {
        return;
    }

    if ( this.desde + desde >= this.totalUsuarios ) {
        return;
    }

    this.desde += desde;
    this.getUsuarios();
  }

  buscarUsuario( busqueda ) {
    if ( busqueda.length <= 0 ) {
       this.getUsuarios();
       return;
    }
    this.loading = true;
    this.busquedaSubs = this._us.buscarEnUsuario$( busqueda )
                            .subscribe(  ( resp: any ) => {
                                this.totalUsuarios = resp.usuarios.length;
                                this.usuarios = resp.usuarios;
                                this.loading = false;
                            });

  }

  borrarUsuario( usuario: Usuario ) {

     if ( usuario._id === this._us.usuario._id   ) {
          swal('No puede borra el usuario', 'No puede borrarse a si mismo', 'error');
          return;
     }

     swal( {
      title: '¿Esta seguro? ',
      text: 'Esta a punto de eliminar el usuario ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then(( borrar  ) => {
      if ( borrar ) {
          this.deleteSubs = this._us.borrarUsuario$( usuario._id )
                               .subscribe( resp =>  this.getUsuarios() );
      }
    });
  }

  ngOnDestroy(): void {
    if ( this.usuarioSubs ) {
        this.usuarioSubs.unsubscribe();
    }
    if ( this.busquedaSubs ) {
        this.busquedaSubs.unsubscribe();
    }
    if ( this.deleteSubs ) {
        this.deleteSubs.unsubscribe();
    }
    if ( this.updateSubs ) {
        this.updateSubs.unsubscribe();
    }
  }

  guardarUsuario( usuario: Usuario ) {
      console.log( usuario );
      this.updateSubs =  this._us.updateUsuario$( usuario )
                             .subscribe( resp => console.log('actualizado!!!') );
  }

  cambiarImagenModal( usuario: Usuario ) {
    this._ms.mostraModal( 'usuarios', usuario._id );
  }

}
