import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { OMapModule } from 'ontimize-web-ngx-map';

import { SharedModule } from '../../shared/shared.module';
import { GeoJsonLayerRoutingModule } from './geojson-layer-routing.module';
import { GeoJSONLayerComponent } from './geojson-layer.component';

@NgModule({
  imports: [
    SharedModule,
    OntimizeWebModule,
    OMapModule,
    GeoJsonLayerRoutingModule
  ],
  declarations: [
    GeoJSONLayerComponent
  ]
})
export class GeoJsonLayerModule { }
