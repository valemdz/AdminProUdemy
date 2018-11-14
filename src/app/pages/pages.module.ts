import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    Graficas1Component,
    ProgressComponent,
    IncrementadorComponent
  ],
  exports: [
    //PagesComponent,
    DashboardComponent,
    Graficas1Component,
    ProgressComponent,
    IncrementadorComponent
  ],
  imports: [
    SharedModule,
    PAGES_ROUTES,
    FormsModule
  ]
})
export class PagesModule {}
