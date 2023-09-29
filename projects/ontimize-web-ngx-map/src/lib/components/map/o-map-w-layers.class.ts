import { OMapLayerGroup } from '../../interfaces/o-map-layer-group.interface';
import { LayerConfiguration } from '../../models/LayerConfiguration.class';
import { LayerGroupConfiguration } from '../../models/LayerGroupConfiguration.class';
import { OMapLayerGroupsWarehouse } from '../../models/LayerGroupsWarehouse.class';
import { OMapWSidenav } from './o-map-w-sidenav.class';

export class OMapWLayers extends OMapWSidenav {
  mapLayerGroup: OMapLayerGroup;
  private auxLayerGroupWarehouse: OMapLayerGroupsWarehouse = new OMapLayerGroupsWarehouse();
  // private mLayerGroupsWarehouse: OMapLayerGroupsWarehouse = new OMapLayerGroupsWarehouse();

  /**
   * Add multiple LayerGroup configuration objects to OMap
   * @param groups -
   */
  addOMapLayerGroupsConfiguration(groups: Array<LayerGroupConfiguration>) {
    if (!groups || groups.length === 0) {
      return;
    }

    groups.forEach(layerGroup => {
      this.addOMapLayerGroupConfiguration(layerGroup);
    });
  }

  /**
   * Add LayerGroup configuration object to OMap
   * @param layerGroup -
   */
  addOMapLayerGroupConfiguration(layerGroup: LayerGroupConfiguration) {
    if (!layerGroup) {
      return;
    }

    this.auxLayerGroupWarehouse.push(layerGroup);
    if (layerGroup.idParent) {
      this.auxLayerGroupWarehouse.get(layerGroup.idParent).layerGroupsWarehouse.push(layerGroup);
    } else {
      this.mapLayerGroup.mLayerGroupsWarehouse.push(layerGroup);
    }
  }

  /**
   * Add a Layer configuration object to OMap
   * @param layer -
   */
  addOMapLayerConfiguration(layer: LayerConfiguration) {
    if (!layer) {
      return;
    }

    if (layer.layerGroupId) {
      this.auxLayerGroupWarehouse.get(layer.layerGroupId).mapLayers.push(layer);
    } else {
      this.mapLayerGroup.mapLayers.push(layer);
    }
  }

}
