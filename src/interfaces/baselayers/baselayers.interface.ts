import { EventEmitter } from '@angular/core';
import * as L from 'leaflet';

export interface BaseLayerEvents {
	onUpdate: EventEmitter<any>;
}

export interface BaseLayer {
	id?: string;
	active?: boolean;
	name?: string;
	urlTemplate?: string;
	options?: L.TileLayerOptions;
	events?: BaseLayerEvents;
	tileLayer?: L.TileLayer;
}
