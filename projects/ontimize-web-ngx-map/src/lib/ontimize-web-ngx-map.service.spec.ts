import { TestBed } from '@angular/core/testing';

import { OntimizeWebNgxMapService } from './ontimize-web-ngx-map.service';

describe('OntimizeWebNgxMapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OntimizeWebNgxMapService = TestBed.get(OntimizeWebNgxMapService);
    expect(service).toBeTruthy();
  });
});
