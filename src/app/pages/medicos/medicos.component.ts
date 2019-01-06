import { Component, OnInit, OnDestroy } from '@angular/core';
import { MedicoService } from 'src/app/services/service.index';
import { Medico } from 'src/app/models/medico.model';
import { Subscription } from 'rxjs';

import swal from 'sweetalert';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit, OnDestroy {


  totalMedicos = 0;
  medicos: Medico[] = [];

  cargarSubs: Subscription;
  buscarSubs: Subscription;
  deleteSubs: Subscription;

  constructor( private _meds: MedicoService,
               private _modals: ModalUploadService  ) { }

  ngOnInit() {
    this.suscripcionModalImagenes();
    this.cargarMedicos();
  }

  buscarMedicos( termino: string ) {

    if ( !termino || termino.length <= 0 ) {
        this.cargarMedicos();
        return;
    }

    this.buscarSubs = this._meds.buscarMedico$( termino )
                          .subscribe( ( resp: any ) => {
                            this.medicos = resp.medicos;
                            this.totalMedicos = resp.medicos.length;
                            });

  }

  cargarMedicos() {
      this.cargarSubs = this._meds.cargarMedicos$()
                            .subscribe( ( resp: any ) => {
                                this.totalMedicos = resp.total;
                                this.medicos = resp.medicos;
                            });
  }

  actualizarMedico( medico ) {

  }

  borraMedico( medico: Medico ) {

      swal({
          title: 'Eliminar Usuario',
          text:  'Esta seguro que desea eliminar el medico ' + medico.nombre + '?',
          icon:  'warning',
          buttons: true,
          dangerMode: true,
        })
        .then( willDelete => {
          if (willDelete) {
            this.deleteSubs = this._meds.borrarMedico$( medico._id )
                              .subscribe( () => this.cargarMedicos() );
          }
        });
   }

   cambiarImagenModal( idMedico: string ) {
      this._modals.mostraModal('medicos', idMedico );
  }

  suscripcionModalImagenes() {
    this._modals.notificacion.subscribe( resp => {
      this.cargarMedicos();
    });

 }

  ngOnDestroy(): void {
    if ( this.cargarSubs ) { this.cargarSubs.unsubscribe(); }
    if ( this.buscarSubs  ) { this.buscarSubs.unsubscribe(); }
    if ( this.deleteSubs ) { this.deleteSubs.unsubscribe(); }
  }

}
