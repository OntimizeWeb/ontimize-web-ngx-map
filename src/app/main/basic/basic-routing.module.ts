import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasicUsageComponent } from './basic-usage.component';

const routes: Routes = [{ path: '', component: BasicUsageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicRoutingModule { }
