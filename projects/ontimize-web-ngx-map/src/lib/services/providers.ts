import { Injector } from '@angular/core';

import { TranslateMapService } from './TranslateMapService';

export function getTranslateMapServiceProvider(injector) {
  return new TranslateMapService(injector);
}

export const OMAP_PROVIDERS: any = [{
  provide: TranslateMapService,
  useFactory: getTranslateMapServiceProvider,
  deps: [Injector]
}];
