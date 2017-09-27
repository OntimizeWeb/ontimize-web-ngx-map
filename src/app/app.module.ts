import { NgModule } from '@angular/core';

import {
  APP_CONFIG,
  ONTIMIZE_MODULES,
  ONTIMIZE_PROVIDERS,
  OntimizeWebModule
} from 'ontimize-web-ngx';

import { OMapModule } from 'ontimize-web-ngx-map';

import { CONFIG } from './app.config';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { appProviders } from './app.providers';
import { MainModule } from './main/main.module';

// Defining custom providers (if needed)...
let customProviders = [
  ...appProviders
];

@NgModule({
  imports: [
    ONTIMIZE_MODULES,
    OMapModule,
    OntimizeWebModule,
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
    { provide: APP_CONFIG, useValue: CONFIG },
    ...ONTIMIZE_PROVIDERS,
    ...customProviders
  ]
})
export class AppModule { }
