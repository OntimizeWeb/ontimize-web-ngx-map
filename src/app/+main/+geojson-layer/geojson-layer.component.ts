import { Component, OnInit, Injector, ViewChild, ElementRef } from '@angular/core';

import { OTranslateService } from 'ontimize-web-ng2/ontimize';
import { OMapComponent } from 'ontimize-web-ng2-map/o-map';

import { NavigationBarService } from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'geojson-layer',
  templateUrl: 'geojson-layer.component.html',
  styleUrls: ['geojson-layer.component.css']
})
export class GeoJSONLayerComponent implements OnInit {

  @ViewChild('oMapGeoJSON')
  protected map: OMapComponent;

  constructor(
    protected injector: Injector,
    protected elRef: ElementRef,
    protected navigationService: NavigationBarService,
    protected translateService: OTranslateService) {
  }

  ngOnInit() {
    let title = '';
    title += this.translateService.get('GEOJSON');
    this.navigationService.setTitle(title);
  }

  ngAfterViewInit() {

  }

  getTrainLinesLayerStyle() {
    return {
      'color': '#388E3C',
      'weight': 2,
      'opacity': 0.65
    }
  }

  getId() {
    return 'GeoJson layers';
  }

  getFiles() {
    return [
      {
        'type': 'html',
        'data': HTML_DATA
      },
      {
        'type': 'scss',
        'data': '/** No CSS for this example */'
      },
      {
        'type': 'typescript',
        'data': TYPESCRIPT_DATA
      }
    ];
  }

}

const HTML_DATA = `
<o-map #oMapGeoJSON center="42.940599, -7.120727" zoom="8" min-zoom="3" max-zoom="20"
    zoom-control="yes" search-control="yes" layer-panel-visible="no" flex>
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
import { Component, ViewChild } from '@angular/core';
import { OMapComponent } from 'ontimize-web-ng2-map/o-map';


@Component({
  moduleId: module.id,
  selector: 'geojson-layer',
  templateUrl: 'geojson-layer.component.html',
  styleUrls: ['geojson-layer.component.css']
})
export class GeoJSONLayerComponent implements OnInit {

  @ViewChild('oMapGeoJSON')
  protected map: OMapComponent;

  getTrainLinesLayerStyle() {
    return {
      'color': '#388E3C',
      'weight': 2,
      'opacity': 0.65
    }
  }
}
`;
