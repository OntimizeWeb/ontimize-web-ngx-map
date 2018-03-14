import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { OMapModule } from 'ontimize-web-ngx-map';
import { SharedModule } from '../../shared/shared.module';
import { MapEventsComponent } from './map-events.component';
import { MapEventsRoutingModule } from './map-events-routing.module';

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
