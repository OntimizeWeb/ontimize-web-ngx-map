import { Injector } from '@angular/core';

import { NavigationBarService, CustomOntimizeService, GeoServerService } from './shared';

export const appProviders = [
  NavigationBarService,
  CustomOntimizeService,
  [
    { provide: 'geojson-train-lines', useClass: GeoServerService, deps: [Injector] },
    { provide: 'geojson-train-stations', useClass: GeoServerService, deps: [Injector] },
    { provide: 'geojson-municipality', useClass: GeoServerService, deps: [Injector] }
  ]
];
