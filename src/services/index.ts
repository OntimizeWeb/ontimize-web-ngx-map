import { Injector } from '@angular/core';
import { MdIconRegistry } from '@angular/material';
import { TranslateMapService } from './TranslateMapService';

export * from './MapService';
export * from './GeocodingService';
export * from './TranslateMapService';

export function getTranslateMapServiceProvider(injector) {
  return new TranslateMapService(injector);
}

export const OMAP_PROVIDERS: any = [
  MdIconRegistry,
  {
    provide: TranslateMapService,
    useFactory: getTranslateMapServiceProvider,
    deps: [Injector]
  }
];
