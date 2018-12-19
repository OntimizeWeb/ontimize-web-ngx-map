import { Component, OnInit, Injector, ViewChild, ElementRef } from '@angular/core';

import { OTranslateService } from 'ontimize-web-ngx';
import { OMapComponent } from 'ontimize-web-ngx-map';
import { NavigationBarService } from '../../shared';

const HTML_DATA = `
<o-map #oMapGeoJSON center="42.940599, -7.120727" zoom="8" min-zoom="3" max-zoom="20"
zoom-control="yes" search-control="yes" layer-panel-visible="no" fxFlex>
  <o-map-layer layer-type="geoJSON" layer-service="geojson-train-lines" layer-id="train-lines"
    layer-menu-label="Train lines" layer-menu-label-secondary="Spain's' train lines.">
  </o-map-layer>
  <o-map-layer layer-type="geoJSON" layer-service="geojson-train-stations" layer-id="train-stations"
    layer-menu-label="Train stations" layer-menu-label-secondary="Spain's train stations.">
  </o-map-layer>
  <o-map-layer layer-type="geoJSON" layer-service="geojson-municipality" layer-id="municipality"
    layer-menu-label="Municipality" layer-menu-label-secondary="Pontevedra's municipalities"
    [layer-options]="getTrainLinesLayerStyle()">
  </o-map-layer>
</o-map>
`;

const TYPESCRIPT_DATA = `
import { Component } from '@angular/core';

@Component({
  selector: 'geojson-layer',
  templateUrl: './geojson-layer.component.html'
})
export class GeoJSONLayerComponent {

  constructor() { }

  getTrainLinesLayerStyle() {
    return {
      'color': '#388E3C',
      'weight': 2,
      'opacity': 0.65
    };
  }

}
`;

@Component({
  moduleId: module.id,
  selector: 'geojson-layer',
  templateUrl: './geojson-layer.component.html'
})
export class GeoJSONLayerComponent {

  constructor() { }

  getTrainLinesLayerStyle() {
    return {
      'color': '#388E3C',
      'weight': 2,
      'opacity': 0.65
    };
  }


  getFiles() {
    return {
      'html': {
        'data': HTML_DATA
      },
      'scss': {
        'data': undefined
      },
      'typescript': {
        'data': TYPESCRIPT_DATA
      }
    }

  }
}

