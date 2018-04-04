import { Injector } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { TranslateMapService } from './TranslateMapService';

export * from './MapService';
export * from './GeocodingService';
export * from './TranslateMapService';

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
