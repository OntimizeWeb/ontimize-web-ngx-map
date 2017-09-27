import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { OMapModule } from 'ontimize-web-ngx-map';
import { SharedModule } from '../../shared/shared.module';
import { MarkerLayerComponent } from './marker-layer.component';
import { MarkerLayerRoutingModule } from './marker-layer-routing.module';

@NgModule({
  imports: [
    SharedModule,
    OntimizeWebModule,
    OMapModule,
    MarkerLayerRoutingModule
  ],
  declarations: [
    MarkerLayerComponent
  ]
})
export class MarkerLayerModule { }
