import { IGeocodingService } from './../interfaces/IGeocodingService';
import { InjectionToken, Injector } from '@angular/core';

import { TranslateMapService } from './TranslateMapService';
import { GeocodingService } from './GeocodingService';
import { _getInjectionTokenValue, Util } from 'ontimize-web-ngx';
import { HttpClient } from '@angular/common/http';

export const O_GEOCODING_SERVICE = new InjectionToken('Geocoding provider');

export function getTranslateMapServiceProvider(injector) {
  return new TranslateMapService(injector);
}

export function getGeocodingServiceProvider(injector: Injector, httpClient: HttpClient): IGeocodingService {

  const customService: any = _getInjectionTokenValue(O_GEOCODING_SERVICE, injector);

  if (Util.isDefined(customService)) {
    return new customService(httpClient);
  } else {
    return new GeocodingService(httpClient);
  }

}

export const OMAP_PROVIDERS: any = [{
  provide: TranslateMapService,
  useFactory: getTranslateMapServiceProvider,
  deps: [Injector]
}];
