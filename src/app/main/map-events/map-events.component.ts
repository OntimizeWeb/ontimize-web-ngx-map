import { Component, OnInit, Injector, ViewChild, ElementRef } from '@angular/core';

import { OTranslateService } from 'ontimize-web-ngx';
import { OMapComponent } from 'ontimize-web-ngx-map';

import { NavigationBarService } from '../../shared';

@Component({
  selector: 'map-events',
  templateUrl: './map-events.component.html',
  styleUrls: ['./map-events.component.scss']
})
export class MapEventsComponent implements OnInit {
  _eventsArray: Array<any> = [];

  @ViewChild('oMap')
  protected oMap: OMapComponent;

  constructor(
    protected injector: Injector,
    protected elRef: ElementRef,
    protected navigationService: NavigationBarService,
    protected translateService: OTranslateService) {
  }

  ngOnInit() {
    let title = '';
    title += this.translateService.get('EVENTS');
    this.navigationService.setTitle(title);
  }

  ngAfterViewInit() {
    // TODO
    this.getDrawLayer();
  }

  getDrawLayer() {
    console.log(this.oMap.getMapService().getDrawLayer());
  }

  addDrawEvent(arg) {
    this._eventsArray.push(arg);
  }

  get eventsArray(): Array<any> {
    return this._eventsArray;
  }

  set eventsArray(arg: Array<any>) {
    this._eventsArray = arg;
  }

  getId() {
    return 'Map events';
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

</o-map>
`;
