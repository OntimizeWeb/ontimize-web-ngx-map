import { Component, ViewEncapsulation } from '@angular/core';

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
import { Component } from '@angular/core';

@Component({
  selector: 'wms-layer',
  templateUrl: './wms-layer.component.html'
})
export class WMSLayerComponent  {

  constructor(){ }


  getWMSLayerOptions() {
    return {
      "maxZoom": "18",
      "attribution": "<a href='https:usgs.gov'>USGS</a> National Map Data"
    };
  }
`;

@Component({
  selector: 'wms-layer',
  templateUrl: './wms-layer.component.html',
  styleUrls: ['./wms-layer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.wms-layer-page]': 'true'
  }
})
export class WMSLayerComponent {

  constructor() { }


  getWMSLayerOptions() {
    return {
      "maxZoom": "18",
      "attribution": "<a href='https:usgs.gov'>USGS</a> National Map Data"
    };
  }

  getFiles() {
    return {
      'html': {
        'data': HTML_DATA
      },
      'scss': {
        'data': ''
      },
      'typescript': {
        'data': TYPESCRIPT_DATA
      }
    };
  }
}
