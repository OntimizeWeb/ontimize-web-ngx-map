import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GeoJSONLayerComponent } from './geojson-layer.component';

const routes: Routes = [{ path: '', component: GeoJSONLayerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeoJsonLayerRoutingModule { }
