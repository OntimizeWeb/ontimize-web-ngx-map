import { LayerConfiguration } from '../models/LayerConfiguration.class';
import { OMapLayerGroupsWarehouse } from '../models/LayerGroupsWarehouse.class';

export interface OMapLayerGroup {
  mapLayers: LayerConfiguration[];
  mLayerGroupsWarehouse: OMapLayerGroupsWarehouse;
}
