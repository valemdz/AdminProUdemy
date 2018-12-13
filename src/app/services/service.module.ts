import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService,
         SharedService,
         SidebarService,
         UsuarioService,
         LoginGuardGuard,
         SubirArchivoService } from './service.index';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [ SettingsService,
               SharedService,
               SidebarService,
               UsuarioService,
               LoginGuardGuard,
               SubirArchivoService,
               HttpClient ]
})
export class ServiceModule { }
