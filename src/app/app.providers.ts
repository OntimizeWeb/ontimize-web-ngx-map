import { Injector } from '@angular/core';

import { NavigationBarService, CustomOntimizeService, GeoServerService } from './shared';

export function getCustomOntimizeServiceProvider(injector) {
  return new CustomOntimizeService(injector);
}

export const appProviders = [
  NavigationBarService,
  [
    { provide: CustomOntimizeService, useFactory: getCustomOntimizeServiceProvider, deps: [Injector] },
    { provide: 'geojson-train-lines', useClass: GeoServerService, deps: [Injector] },
    { provide: 'geojson-train-stations', useClass: GeoServerService, deps: [Injector] },
    { provide: 'geojson-municipality', useClass: GeoServerService, deps: [Injector] }
  ]
];
