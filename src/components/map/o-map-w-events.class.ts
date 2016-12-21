import { EventEmitter } from '@angular/core';
import * as L from 'leaflet';
import { OMapEvents } from './o-map-events.interface';
import { OMapBase } from './o-map.class';

export class OMapWEvents extends OMapBase {
	public events: OMapEvents = {
		onClick: new EventEmitter<any>(),
		onDrag: new EventEmitter<any>(),
		onMove: new EventEmitter<any>(),
		onMoveEnd: new EventEmitter<any>(),
		onZoomLevelsChange: new EventEmitter<any>()
	};

	constructor() {
		super();
		/**
		 * When configuration is triggered
		 * this subscription maps Leaflet events to OMap EventEmitters
		 */
		this.mapConfiguration.subscribe(() => {
			['Click', 'Drag', 'Move', 'MoveEnd', 'ZoomLevelsChange'].forEach(eventName => {
				this.getMapService().map.on(
					eventName.toLowerCase(),
					(evt) => this.events['on' + eventName].emit(evt)
				);
			});
		});
	}
}
