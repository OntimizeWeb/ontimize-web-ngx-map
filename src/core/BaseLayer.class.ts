import { EventEmitter } from '@angular/core';
import * as L from 'leaflet';
import { BaseLayer, BaseLayerEvents } from '../interfaces';

export class BaseLayerDefault implements BaseLayer {
	public id: string = '';
	public name: string;
	public urlTemplate: string;
	public options: L.TileLayerOptions;
	public active: boolean;

	public events: BaseLayerEvents = {
		onUpdate: new EventEmitter<any>()
	};

	public tileLayer: L.TileLayer;

	constructor(baseLayer?: BaseLayer) {
		if (!!baseLayer) {
			this.setBaseLayer(baseLayer);
		}
	}

	getTileLayer(): L.TileLayer {
		return this.tileLayer || new L.TileLayer(this.urlTemplate, this.options);
	}

	setBaseLayer(baseLayer: BaseLayer) {
		if (!!this.tileLayer) {
			this.events.onUpdate.emit(this.tileLayer);
		}
		this.name = baseLayer.name;
		this.options = baseLayer.options;
		(<any>this.options).pane = 'tilePane';
		this.urlTemplate = baseLayer.urlTemplate;
		this.active = baseLayer.active;
		this.tileLayer = baseLayer.tileLayer;
	}
}
