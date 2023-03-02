import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { CommonModule } from '@angular/common';
import { OMapModule } from 'ontimize-web-ngx-map';

import { ExampleComponent } from './example/example.component';
import { HighlightComponent } from './highlight/highlight.component';
import { CustomMapComponent } from './map/custom.map.component';

import { HighlightJsModule, HighlightJsService } from 'angular2-highlight-js';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [
    OntimizeWebModule,
    HighlightJsModule,
    OMapModule,
    MatTabsModule
  ],
  declarations: [
    ExampleComponent,
    HighlightComponent,
    CustomMapComponent
  ],
  exports: [
    CommonModule,
    ExampleComponent,
    HighlightComponent,
    CustomMapComponent
  ],
  providers: [
    HighlightJsService
  ]
})
export class SharedModule { }
