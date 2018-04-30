import { Injector } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { TranslateMapService } from './services/TranslateMapService';

export * from './services/MapService';
export * from './services/GeocodingService';
export * from './services/TranslateMapService';

export function getTranslateMapServiceProvider(injector) {
  return new TranslateMapService(injector);
}

export const OMAP_PROVIDERS: any = [
  MatIconRegistry,
  {
    provide: TranslateMapService,
    useFactory: getTranslateMapServiceProvider,
    deps: [Injector]
  }
];
