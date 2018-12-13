import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  urlBase =  environment.urlBackend + '/img';

  transform(img: string, tipo: string= 'usuarios' ): any {

    let url =  this.urlBase;

    if ( !img ) {
      return url + '/usuarios/xxx';
    }

    if ( img.indexOf('https') >= 0 ) {
        return img;
    }

    switch ( tipo ) {
      case 'usuarios':
         url += '/usuarios/' + img;
      break;
      case 'hospitales':
         url += '/hospitales/' + img;
      break;
      case 'medicos':
         url += '/medicos/' + img;
      break;
      default:
      console.log('Los tipos correctos son usuarios, hospitales y medicos');
    }

    return url;

  }

}
