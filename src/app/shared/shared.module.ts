import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ng2';
import { CommonModule } from '@angular/common';
import { OMapModule } from 'ontimize-web-ng2-map';

import { ExampleComponent } from './example/example.component';
import { HighlightComponent } from './highlight/highlight.component';
import { CustomMapComponent } from './map/custom.map.component';

@NgModule({
  imports: [
    OntimizeWebModule,
    OMapModule
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
  ]
})
export class SharedModule { }
