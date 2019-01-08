import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/app/models/usuario.model';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  hospitales: Hospital[] = [];
  medicos: Medico [] = [];

  constructor( public activatedRoute: ActivatedRoute,
               public http: HttpClient,
               public router: Router ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        const termino = params['termino'];
        this.buscar( termino );
      });
  }

  buscar( termino: string ) {

    const url = environment.urlBackend + '/busqueda/todo/' + termino ;

    this.http.get( url )
        .subscribe( ( resp: any ) => {
          console.log( resp );
          this.hospitales = resp.hospitales;
          this.medicos = resp.medicos;
          this.usuarios = resp.usuarios;
        } );

  }

}
