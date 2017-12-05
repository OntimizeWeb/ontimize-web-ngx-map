import { EventEmitter } from '@angular/core';
import { PolyLine, LayerGroup, ILayer } from 'leaflet-draw';
import * as L from 'leaflet';
import { Observable } from 'rxjs/Observable';

export interface IMapDrawControlEvent {
  event: string;
  data: any;
}

export class OMapDrawControlsEvents {

  onDrawEvent: EventEmitter<IMapDrawControlEvent> = new EventEmitter<IMapDrawControlEvent>();

  constructor(
    protected map: L.Map,
    protected editableLayers: L.FeatureGroup
  ) {

    this.map.on('draw:created', (data: PolyLine) => {
      this.editableLayers.addLayer(data.layer);
      this.onDrawEvent.emit({ event: 'onDrawCreated', data: data });
    });

    this.map.on('draw:edited', (data: LayerGroup) => {
      this.onDrawEvent.emit({ event: 'onDrawEdited', data: data });
    });

    this.map.on('draw:deleted', (data: LayerGroup) => {
      this.onDrawEvent.emit({ event: 'onDrawDeleted', data: data });
    });

    this.map.on('draw:drawstart', (data: string) => {
      this.onDrawEvent.emit({ event: 'onDrawDrawStart', data: data });
    });

    this.map.on('draw:drawstop', (data: string) => {
      this.onDrawEvent.emit({ event: 'onDrawDrawstop', data: data });
    });

    this.map.on('draw:drawvertex', (data: LayerGroup) => {
      this.onDrawEvent.emit({ event: 'onDrawvertex', data: data });
    });

    this.map.on('draw:editstart', (data: string) => {
      this.onDrawEvent.emit({ event: 'onDrawEditStart', data: data });
    });

    this.map.on('draw:editmove', (data: ILayer) => {
      this.onDrawEvent.emit({ event: 'onDrawEditMove', data: data });
    });

    this.map.on('draw:editresize', (data: ILayer) => {
      this.onDrawEvent.emit({ event: 'onDrawEditResize', data: data });
    });

    this.map.on('draw:editvertex', (data: LayerGroup) => {
      this.onDrawEvent.emit({ event: 'onDrawEditvertex', data: data });
    });

    this.map.on('draw:editstop', (data: string) => {
      this.onDrawEvent.emit({ event: 'onDrawEditStop', data: data });
    });

    this.map.on('draw:deletestart', (data: string) => {
      this.onDrawEvent.emit({ event: 'onDrawDeleteStart', data: data });
    });

    this.map.on('draw:deletestop', (data: string) => {
      this.onDrawEvent.emit({ event: 'onDrawDeleteStop', data: data });
    });
  }

  observable(): Observable<IMapDrawControlEvent> {
    return this.onDrawEvent.asObservable();
  }

}
