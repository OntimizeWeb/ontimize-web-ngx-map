import * as L from 'leaflet';
import { BaseLayer } from '../interfaces';
import { BaseLayerDefault } from './BaseLayer.class';

export class BaseLayerCollection {
	baseMaps: Object = {};
	addLayer(id: string, layer: BaseLayer | L.TileLayer) {
		if (layer instanceof BaseLayerDefault) {
			layer.id = id;
		}
		this.baseMaps[id] = layer;
	}
	getLayer(id: string): BaseLayer | L.TileLayer {
		return this.contains(id) ? this.baseMaps[id] : undefined;
	}
	getTileLayer(id: string): L.TileLayer {
		let layer: BaseLayer | L.TileLayer = this.getLayer(id);
		if (layer instanceof BaseLayerDefault) {
			return layer.getTileLayer();
		} else if (layer instanceof L.TileLayer) {
			return layer;
		}
	}
	getBaseLayers(): Array<BaseLayer> {
		return Object.keys(this.baseMaps)
			.map(k => this.getLayer(k))
			.filter(l => l instanceof BaseLayerDefault);
	}
	getLayersMap(): Object {
		let map = {};
		Object.keys(this.baseMaps).forEach(k => {
			map[k] = this.getTileLayer(k);
		});
		return map;
	}
	contains(id: string): boolean {
		return Object.keys(this.baseMaps).indexOf(id) > -1;
	}
}
