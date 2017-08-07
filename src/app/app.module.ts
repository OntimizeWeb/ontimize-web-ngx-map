import { NgModule } from '@angular/core';

import {
  APP_CONFIG,
  ONTIMIZE_MODULES,
  ONTIMIZE_PROVIDERS,
  OntimizeWebModule
} from 'ontimize-web-ng2';

import { OMapModule } from 'ontimize-web-ng2-map';

import { CONFIG } from './app.config';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { appProviders } from './app.providers';
import { MainModule } from './main/main.module';
import { HighlightJsModule, HighlightJsService } from 'angular2-highlight-js';

// Defining custom providers (if needed)...
let customProviders = [
  ...appProviders
];

@NgModule({
  imports: [
    ONTIMIZE_MODULES,
    OMapModule,
    OntimizeWebModule,
    HighlightJsModule,
    MainModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    HighlightJsService,
    { provide: APP_CONFIG, useValue: CONFIG },
    ...ONTIMIZE_PROVIDERS,
    ...customProviders
  ]
})
export class AppModule { }
