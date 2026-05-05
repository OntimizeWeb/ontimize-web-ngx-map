import { Component, ElementRef, Injector, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { OTranslateService } from 'ontimize-web-ngx';
import { OMapComponent } from 'ontimize-web-ngx-map';

import { CustomOntimizeService, NavigationBarService } from '../../shared/index';

const BASIC_USAGE_HTML_DATA = `
<o-map #oMapBasic attr="basic-usage-map" center="42.240599, -8.720727" zoom="11" min-zoom="3" max-zoom="20"
  zoom-control="yes" search-control="no" fxFlex>
</o-map>
`;

const BASE_LAYERS_HTML_DATA = `
<o-map #oMapBaseLayers attr="base-layers-map" center="42.240599, -8.720727" zoom="11" min-zoom="3" max-zoom="20"
  base-layer-ids="CartoDB.Positron;Esri;OpenStreetMap.HOT;OpenStreetMap.BlackAndWhite" zoom-control="yes" search-control="no" fxFlex>
</o-map>
`;

@Component({
  selector: 'basic-usage',
  templateUrl: './basic-usage.component.html',
  styleUrls: ['./basic-usage.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BasicUsageComponent implements OnInit {

  @ViewChild('oMapBasic')
  protected mapBasic: OMapComponent;

  constructor(
    protected injector: Injector,
    protected elRef: ElementRef,
    protected navigationService: NavigationBarService,
    protected translateService: OTranslateService) {
  }

  ngOnInit() {
    let title = '';
    title += this.translateService.get('BASIC');
    this.navigationService.setTitle(title);
  }

  // BaseLayers
  getBasicUsageFiles() {
    return {
      'html': {
        'data': BASIC_USAGE_HTML_DATA
      },

      'scss': {
        'data': undefined
      },

      'typescript': {
        'data': undefined
      }
    };
  }

  getBaseLayersId() {
    return 'Map (Base layers)';
  }

  getBaseLayersFiles() {
    return {
      'html': {
        'data': BASE_LAYERS_HTML_DATA
      },
      'scss': {
        'data': undefined
      },
      'typescript': {
        'data': undefined
      }
    };
  }
}

