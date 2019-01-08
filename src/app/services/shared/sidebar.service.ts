import { Injectable } from '@angular/core';
import { UsuarioService } from '../service.index';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any = [];

  // menu: any = [
  //   { titulo: 'Principal',
  //    icono: 'mdi mdi-gauge',
  //    submenu: [
  //       { titulo: 'Dashboard', url: '/dashboard'},
  //       { titulo: 'Progress Bar', url: '/progress'},
  //       { titulo: 'Graficas', url: '/graficas1'},
  //       { titulo: 'Promesas', url: '/promesas'},
  //       { titulo: 'Rxjs', url: '/rxjs'}
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimientos',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: '/usuarios' },
  //       { titulo: 'Hospitales', url: '/hospitales' },
  //       { titulo: 'Medicos', url: '/medicos*ngIf="medicos.length === 0"' },
  //     ]
  //   }
  // ];

  constructor( public _us: UsuarioService) {
    this.menu = _us.menu;
   }
}
