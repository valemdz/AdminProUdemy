import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { Subscription } from 'rxjs';
import { HospitalService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';


import { swal } from 'sweetalert';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit, OnDestroy {

  loading:   boolean = false;
  hospitales: Hospital[] = [];
  totalHospitales = 0;

  hospitalesSubs: Subscription;
  notiSubs: Subscription;
  updateSubs: Subscription;
  crearSubs: Subscription;
  borrarSubs: Subscription;

  constructor( public _hs: HospitalService,
               public _ms: ModalUploadService ) { }

  ngOnInit() {

      this.cargarHospitales();
      this.suscripcionModalImagenes();
  }

  cargarHospitales() {

    this.loading = true;
    this.hospitalesSubs = this._hs.cargarHospitales$()
                              .subscribe( ( resp: any) => {
                                this.hospitales =  resp.hospitales;
                                this.totalHospitales = resp.total;
                                this.loading = false;
                              } );

  }

  suscripcionModalImagenes() {
     this.notiSubs =  this._ms.notificacion.subscribe( () => this. cargarHospitales() );

  }

  cambiarImagenModal( idHospital: string ) {
    this._ms.mostraModal('hospitales', idHospital );
  }

  buscarHospitales( busqueda: string ) {
    console.log( busqueda );

    if ( busqueda.length === 0 ) {
        this.cargarHospitales();
        return;
    }

    this.loading = true;
    this._hs.buscarHospital$( busqueda )
        .subscribe(  ( resp: any) => {
          this.hospitales =  resp.hospitales;
          this.totalHospitales =  this.hospitales.length;
          this.loading = false;

         });
  }


  actualizarHospital( hospital: Hospital ) {
     this.updateSubs = this._hs.actualizarHospital$( hospital )
                           .subscribe( );
  }

  agregarHospital() {
    swal('Ingrese el nombre del Hospital:', {
      content: 'input',
    })
    .then((value) => {
      if ( !value ) {
          return;
      }
      this.crearHospital( value );
    });

  }

  crearHospital ( nombre:	string ) {
      this.crearSubs = this._hs.crearHospital$( nombre)
          .subscribe( () => this.cargarHospitales() );
  }


  borrarHospital ( id: string ) {

    swal({
      title: 'Esta seguro que desea borrar ?',
      text: 'El hospital xxx',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if ( willDelete ) {
          this.borrarSubs = this._hs.borrarHospital$( id )
                            .subscribe( () => this.cargarHospitales());
      } else {
        return;
      }
    });
  }


  ngOnDestroy(): void {
    if ( this.hospitalesSubs ) { this.hospitalesSubs.unsubscribe();  }
    if ( this.notiSubs ) { this.notiSubs.unsubscribe(); }
    if ( this.updateSubs ) { this.updateSubs.unsubscribe(); }
    if ( this.crearSubs ) {  this.crearSubs.unsubscribe(); }
    if ( this.borrarSubs ) { this.borrarSubs.unsubscribe(); }
  }

}
