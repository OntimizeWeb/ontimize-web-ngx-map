import { Component, OnInit, Injector, ViewChild, ElementRef } from '@angular/core';

import { OTranslateService } from 'ontimize-web-ng2/ontimize';
import { OMapComponent } from 'ontimize-web-ng2-map/o-map';

import { NavigationBarService, CustomOntimizeService } from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'basic-usage',
  templateUrl: 'basic-usage.component.html',
  styleUrls: ['basic-usage.component.css']
})
export class BasicUsageComponent implements OnInit {

  @ViewChild('oMapBasic')
  protected mapBasic: OMapComponent;

  constructor(
    protected injector: Injector,
    protected elRef: ElementRef,
    protected navigationService: NavigationBarService,
    protected translateService: OTranslateService) {

    let sss = this.injector.get(CustomOntimizeService);
  }

  ngOnInit() {
    let title = '';
    title += this.translateService.get('BASIC');
    this.navigationService.setTitle(title);
  }

  ngAfterViewInit() {

  }

  getBasicUsageId() {
    return 'Map (Basic usage)';
  }

  BaseLayers

  getBasicUsageFiles() {
    return [
      {
        'type': 'html',
        'data': BASIC_USAGE_HTML_DATA
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

   getBaseLayersId() {
    return 'Map (Base layers)';
  }

  getBaseLayersFiles() {
     return [
      {
        'type': 'html',
        'data': BASE_LAYERS_HTML_DATA
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

const BASIC_USAGE_HTML_DATA = `
<o-map #oMapBasic attr="basic-usage-map" center="42.240599, -8.720727" zoom="11" min-zoom="3" max-zoom="20"
  zoom-control="yes" search-control="yes" flex>
</o-map>
`;

const BASE_LAYERS_HTML_DATA = `
<o-map #oMapBaseLayers attr="base-layers-map" center="42.240599, -8.720727" zoom="11" min-zoom="3" max-zoom="20"
  base-layer-ids="CartoDB.Positron;Esri;OpenStreetMap.HOT;OpenStreetMap.BlackAndWhite"
  zoom-control="yes" search-control="yes" flex>
</o-map>
`;
