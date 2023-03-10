import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { OMapComponent } from 'ontimize-web-ngx-map';

const MARKER_LAYER_HTML_DATA = `
<o-map #oMap center="42.940599, -7.120727" zoom="8" min-zoom="3" max-zoom="20" zoom-control="yes" search-control="no"
    layer-panel-visible="no" fxFlex draw-control="no" (onDrawEvent)="addDrawEvent($event)">
    <!-- [crs-configuration]="objeto" -->
    <o-map-crs crs="EPSG4326"></o-map-crs>
    <o-map-draw-controls></o-map-draw-controls>
</o-map>
`;

const MARKER_LAYER_TYPESCRIPT_DATA = `
@Component({
  selector: 'map-events',
  templateUrl: './map-events.component.html'
})
export class MapEventsComponent {
  _eventsArray: Array<any> = [];

  @ViewChild('oMap')
  protected oMap: OMapComponent;

  constructor() { }


  ngAfterViewInit() {
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
}
`;

@Component({
  selector: 'map-events',
  templateUrl: './map-events.component.html',
  styleUrls: ['./map-events.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.map-events-page]': 'true'
  }
})
export class MapEventsComponent {
  _eventsArray: Array<any> = [];

  @ViewChild('oMap')
  protected oMap: OMapComponent;

  constructor() { }


  ngAfterViewInit() {
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

  getFiles() {
    return {
      'html': {
        'data': MARKER_LAYER_HTML_DATA
      },
      'scss': {
        'data': '/** No CSS for this example */'
      },

      'typescript': {
        'data': MARKER_LAYER_TYPESCRIPT_DATA
      }
    };
  }
}
