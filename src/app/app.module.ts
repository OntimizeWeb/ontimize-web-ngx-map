import { NgModule } from '@angular/core';

import {
  ONTIMIZE_MODULES,
  ONTIMIZE_DIRECTIVES,
  ontimizeProviders,
  ODialogComponent
} from 'ontimize-web-ng2/ontimize';

import { OMapModule } from 'ontimize-web-ng2-map/o-map';

import { CONFIG } from './app.config';
import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { APP_DIRECTIVES } from './app.directives';
import { appProviders } from './app.providers';

import { HighlightJsModule, HighlightJsService } from 'angular2-highlight-js';

// Standard providers...
let standardProviders = ontimizeProviders({
  'config': CONFIG
});
// Defining custom providers (if needed)...
let customProviders = [
  ...appProviders
];

@NgModule({
  imports: [
    ONTIMIZE_MODULES,
    routing,
    OMapModule,
    HighlightJsModule
  ],
  declarations: [
    AppComponent,
    ONTIMIZE_DIRECTIVES,
    ...APP_DIRECTIVES
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    ODialogComponent
  ],
  providers: [
    ...standardProviders,
    HighlightJsService,
    ...customProviders
  ]
})
export class AppModule { }

