import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { OMapModule } from 'ontimize-web-ngx-map';
import { SharedModule } from '../../shared/shared.module';
import { WMSLayerComponent } from './wms-layer.component';
import { WMSLayerRoutingModule } from './wms-layer-routing.module';

@NgModule({
  imports: [
    SharedModule,
    OntimizeWebModule,
    OMapModule,
    WMSLayerRoutingModule
  ],
  declarations: [
    WMSLayerComponent
  ]
})
export class WmsLayerModule { }
