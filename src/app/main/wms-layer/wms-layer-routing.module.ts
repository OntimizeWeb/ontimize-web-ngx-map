import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WMSLayerComponent } from './wms-layer.component';

const routes: Routes = [
  {
    path: '',
    component: WMSLayerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WMSLayerRoutingModule { }
