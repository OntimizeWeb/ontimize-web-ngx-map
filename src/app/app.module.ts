import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { OntimizeWebModule } from 'ontimize-web-ngx';
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

export function getHighlightLanguages() {
  return {
    typescript: () => import('highlight.js/lib/languages/typescript'),
    css: () => import('highlight.js/lib/languages/css'),
    xml: () => import('highlight.js/lib/languages/xml')
  };
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    OntimizeWebModule.forRoot(CONFIG),
    OMapModule,
    AppRoutingModule,
    HighlightModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [{
    provide: HIGHLIGHT_OPTIONS,
    useValue: {
      lineNumbers: true,
      languages: getHighlightLanguages()
    }
  },
  ...customProviders
  ],
})
export class AppModule { }
