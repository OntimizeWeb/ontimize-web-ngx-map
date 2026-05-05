import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { IMapDrawControlEvent } from '../map-draw-controls/o-map-draw-controls-events.class';
import { OMapEvents } from './o-map-events.interface';
import { OMapBase } from './o-map.class';
import { OMapComponent } from './o-map.component';

export class OMapWEvents extends OMapBase implements OMapEvents {

  onClick = new EventEmitter<any>();
  onDrag = new EventEmitter<any>();
  onMove = new EventEmitter<any>();
  onMoveEnd = new EventEmitter<any>();
  onZoomLevelsChange = new EventEmitter<any>();
  onZoomStart = new EventEmitter<any>();
  onZoomEnd = new EventEmitter<any>();
  onZoom = new EventEmitter<any>();

  onDrawEvent = new EventEmitter<any>();

  onDrawCreated = new EventEmitter<any>();
  onDrawEdited = new EventEmitter<any>();
  onDrawDeleted = new EventEmitter<any>();
  onDrawDrawStart = new EventEmitter<any>();
  onDrawDrawstop = new EventEmitter<any>();
  onDrawvertex = new EventEmitter<any>();
  onDrawEditStart = new EventEmitter<any>();
  onDrawEditMove = new EventEmitter<any>();
  onDrawEditResize = new EventEmitter<any>();
  onDrawEditvertex = new EventEmitter<any>();
  onDrawEditStop = new EventEmitter<any>();
  onDrawDeleteStart = new EventEmitter<any>();
  onDrawDeleteStop = new EventEmitter<any>();

  constructor() {
    super();
    /**
     * When configuration is triggered
     * this subscription maps Leaflet events to OMap EventEmitters
     */
    this.onMapConfigured().subscribe(() => {
      ['Click', 'Drag', 'Move', 'MoveEnd', 'ZoomLevelsChange', 'ZoomStart', 'ZoomEnd', 'Zoom'].forEach(eventName => {
        this.getMapService().map.on(
          eventName.toLowerCase(),
          (evt) => {
            this['on' + eventName].emit(evt);
          }
        );
      });
    });

    this.onMapAfterViewInit().subscribe((oMap: OMapComponent) => {
      const observable: Observable<IMapDrawControlEvent> = oMap.getDrawControlEventsObservable();
      if (observable) {
        observable.subscribe((args: IMapDrawControlEvent) => {
          this.onDrawEvent.emit(args.data);
          this[args.event].emit(args.data);
        });
      }
    });
  }

}
