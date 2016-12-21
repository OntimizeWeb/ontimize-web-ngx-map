import { LayerConfiguration } from './LayerConfiguration.class';
import { OMapLayerGroupsWarehouse } from '../core';

export class LayerGroupConfiguration {
	public id: string;
	public idParent: string;
	public name: string;
	public description: string;
	public collapsed: boolean;
	public mapLayers: Array<LayerConfiguration>;
	public layerGroupsWarehouse: OMapLayerGroupsWarehouse;

	constructor() {
		this.mapLayers = new Array<LayerConfiguration>();
		this.layerGroupsWarehouse = new OMapLayerGroupsWarehouse();
	}

	public addLayerConfiguration(layerConf: LayerConfiguration) {
		if (layerConf) {
			this.mapLayers.push(layerConf);
		}
	}
}
