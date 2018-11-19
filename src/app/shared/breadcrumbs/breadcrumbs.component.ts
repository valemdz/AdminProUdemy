import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {


  data: any;
  dataSubs: Subscription;

  constructor( private router: Router, private title: Title, meta: Meta ) {
      this.dataSubs = this.getDataRoute().subscribe( data =>
            {
              this.data = data;
              this.title.setTitle( data.titulo );
              const metaTag: MetaDefinition = {
                name: 'description',
                content: this.data.titulo
              };

              meta.updateTag( metaTag );
             });


   }

  ngOnInit() {
  }

  getDataRoute(): Observable<any> {

    return  this.router.events
            .pipe( filter( evento => evento instanceof ActivationEnd ),
                   filter( ( evento: ActivationEnd ) => evento.snapshot.firstChild === null ),
                   map( evento => evento.snapshot.data ) );


  }

  ngOnDestroy(): void {
    this.dataSubs.unsubscribe();
  }



}
