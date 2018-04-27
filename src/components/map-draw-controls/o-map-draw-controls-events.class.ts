import { EventEmitter } from '@angular/core';
import * as L from 'leaflet';
import { Observable } from 'rxjs/Observable';

export interface IMapDrawControlEvent {
  event: string;
  data: any;
}

export class OMapDrawControlsEvents {

  onDrawEvent: EventEmitter<IMapDrawControlEvent> = new EventEmitter<IMapDrawControlEvent>();
  protected map: L.Map;

  constructor(protected editableLayers: L.FeatureGroup) { }

  setMap(arg: L.Map) {
    this.map = arg;
    this.registerMapEvents();
  }

  registerMapEvents() {
    this.map.on('draw:created', (data: any) => {
      this.editableLayers.addLayer(data.layer);
      this.onDrawEvent.emit({ event: 'onDrawCreated', data: data });
    });

    this.map.on('draw:edited', (data: any) => {
      this.onDrawEvent.emit({ event: 'onDrawEdited', data: data });
    });

    this.map.on('draw:deleted', (data: any) => {
      this.onDrawEvent.emit({ event: 'onDrawDeleted', data: data });
    });

    this.map.on('draw:drawstart', (data: any) => {
      this.onDrawEvent.emit({ event: 'onDrawDrawStart', data: data });
    });

    this.map.on('draw:drawstop', (data: any) => {
      this.onDrawEvent.emit({ event: 'onDrawDrawstop', data: data });
    });

    this.map.on('draw:drawvertex', (data: any) => {
      this.onDrawEvent.emit({ event: 'onDrawvertex', data: data });
    });

    this.map.on('draw:editstart', (data: any) => {
      this.onDrawEvent.emit({ event: 'onDrawEditStart', data: data });
    });

    this.map.on('draw:editmove', (data: any) => {
      this.onDrawEvent.emit({ event: 'onDrawEditMove', data: data });
    });

    this.map.on('draw:editresize', (data: any) => {
      this.onDrawEvent.emit({ event: 'onDrawEditResize', data: data });
    });

    this.map.on('draw:editvertex', (data: any) => {
      this.onDrawEvent.emit({ event: 'onDrawEditvertex', data: data });
    });

    this.map.on('draw:editstop', (data: any) => {
      this.onDrawEvent.emit({ event: 'onDrawEditStop', data: data });
    });

    this.map.on('draw:deletestart', (data: any) => {
      this.onDrawEvent.emit({ event: 'onDrawDeleteStart', data: data });
    });

    this.map.on('draw:deletestop', (data: any) => {
      this.onDrawEvent.emit({ event: 'onDrawDeleteStop', data: data });
    });
  }

  observable(): Observable<IMapDrawControlEvent> {
    return this.onDrawEvent.asObservable();
  }

}
