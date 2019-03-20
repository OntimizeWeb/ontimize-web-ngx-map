import * as L from 'leaflet';
import { Observable } from 'rxjs';

import { MapService } from '../../services/MapService';
import { IMapDrawControlEvent, OMapDrawControlsEvents } from '../map-draw-controls/o-map-draw-controls-events.class';
import { OMapDrawControlsComponent } from '../map-draw-controls/o-map-draw-controls.component';
import { OMapWWorkspace } from './o-map-w-workspace.class';

export class OMapWDraw extends OMapWWorkspace {

  public drawDefaultControl: boolean = false;
  public drawControlComponent: OMapDrawControlsComponent;
  protected defaultDrawControlEvents: OMapDrawControlsEvents;

  registerDrawControlComponent(drawControlComponent: OMapDrawControlsComponent) {
    this.drawControlComponent = drawControlComponent;
  }

  getDrawControlEventsObservable(): Observable<IMapDrawControlEvent> {
    let controlEvents: OMapDrawControlsEvents = this.defaultDrawControlEvents;
    if (this.drawControlComponent && this.drawControlComponent.drawControlEvents) {
      controlEvents = this.drawControlComponent.drawControlEvents;
    }
    return controlEvents ? controlEvents.observable() : undefined;
  }

  protected configureDefaultDrawControl(map: L.Map): void {
    var editableLayers = new L.FeatureGroup();
    let mapService: MapService = this.getMapService();
    mapService.addDrawLayer(editableLayers);

    var options: L.Control.DrawConstructorOptions = {
      position: 'topright',
      draw: {
        polygon: {
          allowIntersection: false
          // Restricts shapes to simple polygons
        }
      },
      edit: {
        featureGroup: editableLayers, //REQUIRED!!
        remove: true
      }
    };

    var drawControl = new L.Control.Draw(options);
    map.addControl(drawControl);

    this.defaultDrawControlEvents = new OMapDrawControlsEvents(editableLayers);
    this.defaultDrawControlEvents.setMap(map);
  }

}
