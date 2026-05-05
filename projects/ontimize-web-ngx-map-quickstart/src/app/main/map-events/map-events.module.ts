import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { OMapModule } from 'ontimize-web-ngx-map';

import { SharedModule } from '../../shared/shared.module';
import { MapEventsRoutingModule } from './map-events-routing.module';
import { MapEventsComponent } from './map-events.component';

@NgModule({
  imports: [
    SharedModule,
    OntimizeWebModule,
    OMapModule,
    MapEventsRoutingModule
  ],
  declarations: [
    MapEventsComponent
  ]
})
export class MapEventsModule { }
