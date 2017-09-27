import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { SharedModule } from '../../shared/shared.module';
import { GeoJSONLayerComponent } from './geojson-layer.component';
import { GeoJsonLayerRoutingModule } from './geojson-layer-routing.module';
import { OMapModule } from 'ontimize-web-ngx-map';

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
