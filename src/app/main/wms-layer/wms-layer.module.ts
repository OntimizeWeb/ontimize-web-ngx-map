import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ng2';
import { OMapModule } from 'ontimize-web-ng2-map';
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
