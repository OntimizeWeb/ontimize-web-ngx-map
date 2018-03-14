import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapEventsComponent } from './map-events.component';

const routes: Routes = [
  {
    path: '',
    component: MapEventsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapEventsRoutingModule { }
