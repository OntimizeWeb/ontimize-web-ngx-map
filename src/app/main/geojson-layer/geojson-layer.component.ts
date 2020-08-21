import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OMapLayerOptions } from 'ontimize-web-ngx-map';

const HTML_DATA = `
<o-map #oMapGeoJSON center="42.940599, -7.120727" zoom="8" min-zoom="3" max-zoom="20"
zoom-control="yes" search-control="no" layer-panel-visible="no" fxFlex>
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
import { Component, OnInit } from '@angular/core';
import { OMapLayerOptions } from 'ontimize-web-ngx-map';

@Component({
  selector: 'geojson-layer',
  templateUrl: './geojson-layer.component.html'
})
export class GeoJSONLayerComponent implements OnInit {

  public trainLinesStyle: OMapLayerOptions;
  constructor() { }


  ngOnInit(): void {
    this.trainLinesStyle = {
      layerStyles: {
        'color': '#388E3C',
        'weight': 2,
        'opacity': 0.65
      }
    };
  }

  getTrainLinesLayerStyle() {
    return this.trainLinesStyle;
  }

}
`;

@Component({
  selector: 'geojson-layer',
  templateUrl: './geojson-layer.component.html',
  styleUrls: ['./geojson-layer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.geojson-layer-page]': 'true'
  }
})
export class GeoJSONLayerComponent implements OnInit {

  public trainLinesStyle: OMapLayerOptions;
  constructor() { }


  ngOnInit(): void {
    this.trainLinesStyle = {
      layerStyles: {
        'color': '#388E3C',
        'weight': 2,
        'opacity': 0.65
      }
    };
  }

  getTrainLinesLayerStyle() {
    return this.trainLinesStyle;
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
    };
  }
}

