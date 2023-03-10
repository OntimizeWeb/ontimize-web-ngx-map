import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { CommonModule } from '@angular/common';
import { OMapModule } from 'ontimize-web-ngx-map';

import { ExampleComponent } from './example/example.component';
import { HighlightComponent } from './highlight/highlight.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { HighlightModule } from 'ngx-highlightjs';

@NgModule({
  imports: [
    OntimizeWebModule,
    HighlightModule,
    OMapModule,
    MatTabsModule,
    ClipboardModule
  ],
  declarations: [
    ExampleComponent,
    HighlightComponent
  ],
  exports: [
    CommonModule,
    ExampleComponent,
    HighlightComponent
  ]
})
export class SharedModule { }
