import { Component, OnInit, Injector, ViewChild, ElementRef } from '@angular/core';

import * as L from 'leaflet';

import { OTranslateService } from 'ontimize-web-ngx';
import { OMapComponent } from 'ontimize-web-ngx-map';

import { NavigationBarService } from '../../shared';

@Component({
  selector: 'wms-layer',
  templateUrl: './wms-layer.component.html',
  styleUrls: ['./wms-layer.component.scss']
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

  getWMSLayerOptions() {
    return {
      "maxZoom": "18",
      "attribution": "<a href='https:usgs.gov'>USGS</a> National Map Data"
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
<o-map #oMapWMS center="40.712784,-74.005941" zoom="10" min-zoom="6" max-zoom="20" base-layer-ids="basemap.nationalmap.gov"
zoom-control="yes" search-control="yes" layer-panel-visible="no" fxFlex>
  <o-map-layer layer-type="WMS" layer-id="wms-example-airports" layer-base-url="https://basemap.nationalmap.gov/arcgis/rest/services/USGSHydroCached/MapServer/tile/{z}/{y}/{x}"
    [layer-options]="getWMSLayerOptions()" layer-menu-label="National Hydrography Dataset" layer-menu-label-secondary="USGS The National Map: National Hydrography Dataset.">
  </o-map-layer>
  <o-map-layer layer-type="WMS" layer-id="wms-example-mediumcities" layer-base-url="https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}"
  [layer-options]="getWMSLayerOptions()" layer-visible="no" layer-menu-label="National Boundaries Dataset" layer-menu-label-secondary="USGS TNM Topo Base Map.">
  </o-map-layer>

  <o-map-layer layer-type="WMS" layer-id="wms-example-largecities" layer-base-url="https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/{z}/{y}/{x}"
  [layer-options]="getWMSLayerOptions()" layer-menu-label="Orthoimagery and US Topo" layer-menu-label-secondary="USGS ImageryTopo.">
  </o-map-layer>
</o-map>
`;

const TYPESCRIPT_DATA = `
import { Component, ViewChild } from '@angular/core';
import { OMapComponent } from 'ontimize-web-ngx-map';


@Component({
selector: 'wms-layer',
templateUrl: './wms-layer.component.html',
styleUrls: ['./wms-layer.component.scss']
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
