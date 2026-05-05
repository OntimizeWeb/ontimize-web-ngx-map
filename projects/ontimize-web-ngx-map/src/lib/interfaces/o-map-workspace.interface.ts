import { OMapLayerComponent } from '../components/map-layer/o-map-layer.component';

export interface OMapWorkspace {
  getMapLayers(): OMapLayerComponent[];
  getSelectedMapLayer(): OMapLayerComponent;
  updateMapLayers(): void;
}
