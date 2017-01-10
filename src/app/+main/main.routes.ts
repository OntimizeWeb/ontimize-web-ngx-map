import { Routes } from '@angular/router';

import { MainComponent } from './main.component';
import { HomeComponent } from './+home';
import { BasicUsageComponent } from './+basic';
import { MarkerLayerComponent } from './+marker-layer';
import { GeoJSONLayerComponent } from './+geojson-layer';
import { WMSLayerComponent } from './+wms-layer';

export const PrivateAppRoutes: Routes = [
  {
    path: 'main', component: MainComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'basic', component: BasicUsageComponent },
      { path: 'marker', component: MarkerLayerComponent },
      { path: 'geojson', component: GeoJSONLayerComponent },
      { path: 'wms', component: WMSLayerComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];




