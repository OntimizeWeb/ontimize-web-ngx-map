import { OMapLayerGroupComponent } from '../components';
import { LayerGroupConfiguration } from './LayerGroupConfiguration.class';

export class OMapLayerGroupsWarehouse {
	public all: Array<LayerGroupConfiguration> = new Array<LayerGroupConfiguration>();
	private map: Object = {};

	public get(id: string): LayerGroupConfiguration {
		let group: LayerGroupConfiguration;
		let position = this.map[id];
		// To always return a layerGroup configuration to work with
		if (position === undefined) {
			group = new LayerGroupConfiguration();
			group.id = id;
			this.push(group);
		} else {
			group = this.all[position];
		}
		return group;
	}

	public push(g: LayerGroupConfiguration) {
		let p = this.map[g.id];
		if (p === undefined) {
			this.map[g.id] = this.all.length;
			this.all.push(g);
		} else {
			g.mapLayers = g.mapLayers.concat(this.all[p].mapLayers);
			g.layerGroupsWarehouse.concat(this.all[p].layerGroupsWarehouse);
			this.all[p] = g;
		}
	}

	public concat(gw: OMapLayerGroupsWarehouse) {
		gw.all.forEach(lgw => {
			this.push(lgw);
		});
	}
}
