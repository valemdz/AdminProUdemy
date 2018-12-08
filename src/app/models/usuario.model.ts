export class Usuario {

  ///Creo el usuario como inyectando

  constructor( public nombre: string,
               public email: string,
               public password: string,
               public img?: string,
               public role?: string,
               public google?: boolean,
               public _id?: string ) {

                 }


}
