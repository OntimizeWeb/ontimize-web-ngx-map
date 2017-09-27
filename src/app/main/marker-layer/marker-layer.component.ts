import { Component, OnInit, Injector, ViewChild, ElementRef } from '@angular/core';

import { OTranslateService } from 'ontimize-web-ngx';
import { OMapComponent } from 'ontimize-web-ngx-map';

import { NavigationBarService } from '../../shared';

@Component({
  selector: 'marker-layer',
  templateUrl: './marker-layer.component.html',
  styleUrls: ['./marker-layer.component.scss']
})
export class MarkerLayerComponent implements OnInit {

  @ViewChild('oMapMarker')
  protected mapBasic: OMapComponent;

  constructor(
    protected injector: Injector,
    protected elRef: ElementRef,
    protected navigationService: NavigationBarService,
    protected translateService: OTranslateService) {

  }

  ngOnInit() {
    let title = '';
    title += this.translateService.get('MARKER');
    this.navigationService.setTitle(title);
  }

  ngAfterViewInit() {

  }

  getId() {
    return 'Marker layers';
  }

  getFiles() {
    return [
      {
        'type': 'html',
        'data': MARKER_LAYER_HTML_DATA
      },
      {
        'type': 'scss',
        'data': '/** No CSS for this example */'
      },
      {
        'type': 'typescript',
        'data': '/** No Typescript for this example */'
      }
    ];
  }

}

const MARKER_LAYER_HTML_DATA = `
<o-map #oMapMarker center="42.940599, -7.120727" zoom="8" min-zoom="3" max-zoom="20"
zoom-control="yes" search-control="yes" layer-panel-visible="no" fxFlex>
<o-map-layer layer-type="marker" layer-id="office_marker" layer-center="42.240599;-8.720727"
layer-menu-label="Office headquarters " layer-menu-label-secondary="Location of office headquarters"></o-map-layer>
</o-map>
`;
