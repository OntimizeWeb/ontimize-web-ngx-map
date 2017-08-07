import { Component, OnInit, Injector, ViewChild, ElementRef } from '@angular/core';

import * as L from 'leaflet';

import { OTranslateService } from 'ontimize-web-ng2';
import { OMapComponent } from 'ontimize-web-ng2-map';

import { NavigationBarService } from '../../shared';

@Component({
  selector: 'wms-layer',
  template: require('./wms-layer.component.html'),
  styles: [require('./wms-layer.component.scss')]
})
export class WMSLayerComponent implements OnInit {

  @ViewChild('oMapWMS')
  protected map: OMapComponent;

  constructor(
    protected injector: Injector,
    protected elRef: ElementRef,
    protected navigationService: NavigationBarService,
    protected translateService: OTranslateService) {
  }

  ngOnInit() {
    let title = '';
    title += this.translateService.get('WMS');
    this.navigationService.setTitle(title);
  }

  ngAfterViewInit() {

  }

  getWMSAirportLayerOptions() {
    return {
      "format": "image/png",
      "transparent": "true",
      "attribution": "<a href='http://nationalatlas.gov'>NationalAtlas.gov</a>",
      "info_format": "text/html",
      "tiled": false,
      "layers": "14",
      "crs": L.CRS.EPSG4326
    };
  }

  getWMSLargeCitiesLayerOptions() {
    return {
      "format": "image/png",
      "transparent": "true",
      "attribution": "<a href='http://nationalatlas.gov'>NationalAtlas.gov</a>",
      "info_format": "text/html",
      "tiled": false,
      "layers": "27",
      "crs": L.CRS.EPSG4326
    };
  }

  getWMSMediumCitiesLayerOptions() {
    return {
      "format": "image/png",
      "transparent": "true",
      "attribution": "<a href='http://nationalatlas.gov'>NationalAtlas.gov</a>",
      "info_format": "text/html",
      "tiled": false,
      "layers": "26",
      "crs": L.CRS.EPSG4326
    };
  }

  getId() {
    return 'WMS layers';
  }

  getFiles() {
    return [
      {
        'type': 'html',
        'data': HTML_DATA
      },
      {
        'type': 'scss',
        'data': ''
      },
      {
        'type': 'typescript',
        'data': ''
      }
    ];
  }

}

const HTML_DATA = `
<o-map #oMapWMS center="40.712784,-74.005941" zoom="10" min-zoom="6" max-zoom="14"
base-layer-ids="CartoDB.PositronNoLabels"
zoom-control="yes" search-control="yes" layer-panel-visible="no" fxFlex>
<o-map-layer layer-type="WMS" layer-id="wms-example"
layer-base-url="http://services.nationalmap.gov/arcgis/services/GlobalMap/GlobalMapWMS/MapServer/WMSServer"
[layer-options]="getWMSAirportLayerOptions()"
layer-menu-label="Airports" layer-menu-label-secondary="Airport WMS layer.">
</o-map-layer>
<o-map-layer layer-type="WMS" layer-id="wms-example"
layer-base-url="http://services.nationalmap.gov/arcgis/services/GlobalMap/GlobalMapWMS/MapServer/WMSServer"
[layer-options]="getWMSLargeCitiesLayerOptions()"
layer-menu-label="Large cities" layer-menu-label-secondary="Large cities WMS layer.">
</o-map-layer>
<o-map-layer layer-type="WMS" layer-id="wms-example"
layer-base-url="http://services.nationalmap.gov/arcgis/services/GlobalMap/GlobalMapWMS/MapServer/WMSServer"
[layer-options]="getWMSMediumCitiesLayerOptions()" layer-visible="no"
layer-menu-label="Medium cities" layer-menu-label-secondary="Medium cities WMS layer.">
</o-map-layer>
</o-map>
`;

const TYPESCRIPT_DATA = `
import { Component, ViewChild } from '@angular/core';
import { OMapComponent } from 'ontimize-web-ng2-map';


@Component({
selector: 'wms-layer',
template: require('./wms-layer.component.html'),
styles: [require('./wms-layer.component.scss')]
})
export class WMSLayerComponent implements OnInit {

@ViewChild('oMapWMS')
protected map: OMapComponent;

getWMSAirportLayerOptions() {
return {
"format": "image/png",
"transparent": "true",
"attribution": "<a href='http://nationalatlas.gov'>NationalAtlas.gov</a>",
"info_format": "text/html",
"tiled": false,
"layers": "14",
"crs": L.CRS.EPSG4326
};
}

getWMSLargeCitiesLayerOptions() {
return {
"format": "image/png",
"transparent": "true",
"attribution": "<a href='http://nationalatlas.gov'>NationalAtlas.gov</a>",
"info_format": "text/html",
"tiled": false,
"layers": "27",
"crs": L.CRS.EPSG4326
};
}

getWMSMediumCitiesLayerOptions() {
return {
"format": "image/png",
"transparent": "true",
"attribution": "<a href='http://nationalatlas.gov'>NationalAtlas.gov</a>",
"info_format": "text/html",
"tiled": false,
"layers": "26",
"crs": L.CRS.EPSG4326
};
}
}
`;
