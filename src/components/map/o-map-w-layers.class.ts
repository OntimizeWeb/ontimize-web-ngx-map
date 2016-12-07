import { OMapLayerGroupComponent } from '../../components';
import {
    LayerConfiguration,
    LayerGroupConfiguration,
    OMapLayerGroupsWarehouse,
} from '../../core';
import { OMapWSidenav } from './o-map-w-sidenav.class';

export class OMapWLayers extends OMapWSidenav {
    mapLayerGroup: OMapLayerGroupComponent;

    private auxLayerGroupWarehouse: OMapLayerGroupsWarehouse = new OMapLayerGroupsWarehouse();
    private mLayerGroupsWarehouse: OMapLayerGroupsWarehouse = new OMapLayerGroupsWarehouse();

    addOMapLayerGroupsConfiguration(groups: Array<LayerGroupConfiguration>) {
        if (!groups || groups.length === 0) return;

        groups.forEach(layerGroup => {
            this.addOMapLayerGroupConfiguration(layerGroup);
        });
    }

    addOMapLayerGroupConfiguration(layerGroup: LayerGroupConfiguration) {
        if (!layerGroup) return;

        this.auxLayerGroupWarehouse.push(layerGroup);
        if (layerGroup.idParent) {
            this.auxLayerGroupWarehouse.get(layerGroup.idParent).layerGroupsWarehouse.push(layerGroup);
        } else {
            this.mapLayerGroup.mLayerGroupsWarehouse.push(layerGroup);
        }
    }

    addOMapLayerConfiguration(layer: LayerConfiguration) {
        if (!layer) return;

        if (layer.layerGroupId) {
            this.auxLayerGroupWarehouse.get(layer.layerGroupId).mapLayers.push(layer);
        } else {
            this.mapLayerGroup.mapLayers.push(layer);
        }
    }

}
