import {
    EventEmitter
} from '@angular/core';
import * as L from 'leaflet';
import { OMapBase } from './o-map.class';

export interface OMapEvents {
    onClick: EventEmitter<any>;
    onDrag: EventEmitter<any>;
    onMove: EventEmitter<any>;
    onMoveEnd: EventEmitter<any>;
    onZoomLevelChange: EventEmitter<any>;
}

export class OMapWEvents extends OMapBase {
    public events: OMapEvents = {
        onClick: new EventEmitter<any>(),
        onDrag: new EventEmitter<any>(),
        onMove: new EventEmitter<any>(),
        onMoveEnd: new EventEmitter<any>(),
        onZoomLevelChange: new EventEmitter<any>()
    };

    constructor() {
        super();

        this.mapConfiguration.subscribe(() => {
            let map = this.getMapService().map;
            map.on('click', (evt: L.LeafletLocationEvent) => this.events.onClick.emit(evt));
            map.on('drag', (evt) => this.events.onDrag.emit(evt));
            map.on('move', (evt) => this.events.onMove.emit(evt));
            map.on('moveend', (evt) => this.events.onMoveEnd.emit(evt));
            map.on('zoomlevelschange', (evt) => this.events.onZoomLevelChange.emit(evt));
        });
    }
}
