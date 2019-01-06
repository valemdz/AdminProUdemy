import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { MedicoService } from 'src/app/services/service.index';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Subscription } from 'rxjs';
import { Medico } from 'src/app/models/medico.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit, OnDestroy {

  id: string = null;

  medico: Medico = new Medico('', '', '', '', '');
  hospitalSelec: Hospital =   new Hospital('');

  hospitales: Hospital[] = [];
  hospSusbs: Subscription;
  addSusbs: Subscription;
  unMedicoSubs: Subscription;
  updateMedicoSubs: Subscription;

  constructor( public _hs: HospitalService,
               public _ms: MedicoService,
               public _modals: ModalUploadService,
               public router: Router,
               public _routeParams: ActivatedRoute   ) { }

  ngOnInit() {

    this._routeParams.params.subscribe( params => {
      if (  params['id'] !== 'nuevo' ) {
        this.id = params['id'];
      }
    });

    this.hospSusbs = this._hs.cargarHospitales$()
    .subscribe( ( resp: any) => {
                                  this.hospitales = resp.hospitales;
                                  this.getMedico();
                                });

    this.suscripcionModalImagenes();
  }

  getMedico() {

      this.unMedicoSubs = this._ms.getMedico$( this.id )
                              .subscribe( ( resp: any ) => {
                                  console.log( resp );
                                  this.medico = resp.medico;
                                  this.medico.hospital = resp.medico.hospital._id;
                                  this.selectHospital( this.medico.hospital );
                              });
  }

  guardarMedico( f: NgForm) {
    if ( !f.valid  ) {
         return;
    }

    this.addSusbs = this._ms.agregarMedico$( this.medico)
                      .subscribe( ( resp: any ) => {
                        this.medico._id = resp._id;
                        this.router.navigate( ['/medico', this.medico._id] );
                      }  );



  }

  selectHospital( hospitalId: string ) {
      console.log( hospitalId );

      this.hospitalSelec = this.hospitales.find( h => h._id === hospitalId);

      console.log('this.hospitalSelec ', this.hospitalSelec );
  }

  cambiarImagenModal( idMedico: string ) {
    this._modals.mostraModal('medicos', idMedico );
  }

  suscripcionModalImagenes() {
    this._modals.notificacion.subscribe( resp => {
       this.medico.img = resp.medico.img;
    });

 }

  ngOnDestroy(): void {
    if ( this.hospSusbs ) { this.hospSusbs.unsubscribe(); }
    if ( this.addSusbs ) { this.addSusbs.unsubscribe(); }
    if ( this.unMedicoSubs ) { this.unMedicoSubs.unsubscribe(); }
  }

}
