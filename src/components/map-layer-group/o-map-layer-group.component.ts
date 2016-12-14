import { Component, Inject, forwardRef, ViewChildren } from '@angular/core';
import {
	OMapComponent,
	OMapLayerComponent
} from '../../components';
import { LayerConfiguration, LayerGroupConfiguration, OMapLayerGroupsWarehouse } from '../../core';

@Component({
	selector: 'o-map-layer-group',
	moduleId: module.id,
	providers: [],
	inputs: [
		'id: group-id',
		'idParent: group-id-parent',
		'name: group-name',
		'description: group-description',
		'collapsed: group-collapsed',
		'refGroup: group-ref'
	],
	templateUrl: '/map-layer-group/o-map-layer-group.component.html',
	styleUrls: ['/map-layer-group/o-map-layer-group.component.css']
})
export class OMapLayerGroupComponent {
	id: string;
	idParent: string;
	name: string;
	description: string;
	collapsed: boolean = false;
	refGroup: LayerGroupConfiguration;

	public mapLayers: Array<LayerConfiguration> = new Array<LayerConfiguration>();
	public mLayerGroupsWarehouse: OMapLayerGroupsWarehouse = new OMapLayerGroupsWarehouse();

	@ViewChildren(OMapLayerComponent) layerChildren: OMapLayerComponent[];
	@ViewChildren(OMapLayerGroupComponent) layerGroupChildren: OMapLayerGroupComponent[];

	constructor(
		@Inject(forwardRef(() => OMapComponent)) protected oMap: OMapComponent
	) { }

	ngOnInit() {
		if (!!this.refGroup) {
			this.mapLayers = this.refGroup.mapLayers;
			this.mLayerGroupsWarehouse = this.refGroup.layerGroupsWarehouse;
		}
	}

	public hasChildInWS(): boolean {
		var childLayerGroupInWS: boolean = false;
		if (this.layerGroupChildren) {
			this.layerGroupChildren.forEach(lg => {
				if (lg.hasChildInWS()) {
					childLayerGroupInWS = true;
				}
			});
		}
		var childLayerInWS: boolean = false;
		if (this.layerChildren) {
			this.layerChildren.forEach(l => {
				if (l.inWS) {
					childLayerInWS = true;
				}
			});
		}
		return childLayerGroupInWS || childLayerInWS;
	}

	protected getLayerGroups() {
		if (this.mLayerGroupsWarehouse.all &&
			this.mLayerGroupsWarehouse.all.length > 0) {
			return this.mLayerGroupsWarehouse.all;
		}
		return [];
	}

	protected getLayerCenter(layerConf: LayerConfiguration): string {
		let center = undefined;
		if (layerConf && layerConf.center) {
			center = layerConf.center.latitude + ';' + layerConf.center.longitude;
		}
		return center;
	}

	private toggleCollapse() {
		this.collapsed = !this.collapsed;
	}

}
