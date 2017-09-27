import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'ontimize-web-ngx';

import { MainComponent } from './main.component';

export const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'basic',
        loadChildren: './basic/basic.module#BasicModule'
      },
      {
        path: 'geojson',
        loadChildren: './geojson-layer/geojson-layer.module#GeoJsonLayerModule'
      },
      {
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
      },
      {
        path: 'marker',
        loadChildren: './marker-layer/marker-layer.module#MarkerLayerModule'
      },
      {
        path: 'wms',
        loadChildren: './wms-layer/wms-layer.module#WmsLayerModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
