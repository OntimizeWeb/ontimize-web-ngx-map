import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { SharedModule } from '../../shared/shared.module';
import { BasicUsageComponent } from './basic-usage.component';
import { BasicRoutingModule } from './basic-routing.module';
import { OMapModule } from 'ontimize-web-ngx-map';

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
