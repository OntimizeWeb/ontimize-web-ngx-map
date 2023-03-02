import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { OMapModule } from 'ontimize-web-ngx-map';

import { SharedModule } from '../../shared/shared.module';
import { BasicRoutingModule } from './basic-routing.module';
import { BasicUsageComponent } from './basic-usage.component';

@NgModule({
  imports: [
    SharedModule,
    OMapModule,
    OntimizeWebModule,
    BasicRoutingModule
  ],
  declarations: [
    BasicUsageComponent
  ]
})
export class BasicModule { }
