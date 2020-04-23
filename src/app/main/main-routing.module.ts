import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'basic', loadChildren: () => import('./basic/basic.module').then(m => m.BasicModule) },
      { path: 'geojson', loadChildren: () => import('./geojson-layer/geojson-layer.module').then(m => m.GeoJsonLayerModule) },
      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
      { path: 'marker', loadChildren: () => import('./marker-layer/marker-layer.module').then(m => m.MarkerLayerModule) },
      { path: 'wms', loadChildren: () => import('./wms-layer/wms-layer.module').then(m => m.WmsLayerModule) },
      { path: 'map-events', loadChildren: () => import('./map-events/map-events.module').then(m => m.MapEventsModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
