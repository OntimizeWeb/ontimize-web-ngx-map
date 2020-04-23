import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ONTIMIZE_MODULES, OntimizeWebModule } from 'ontimize-web-ngx';
import { OMapModule } from 'ontimize-web-ngx-map';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CONFIG } from './app.config';
import { appProviders } from './app.providers';

// Standard providers...
// Defining custom providers (if needed)...
export const customProviders: any = [
  ...appProviders
];

@NgModule({
  imports: [
    ONTIMIZE_MODULES,
    OntimizeWebModule.forRoot(CONFIG),
    OMapModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    ...customProviders
  ],
})
export class AppModule { }
