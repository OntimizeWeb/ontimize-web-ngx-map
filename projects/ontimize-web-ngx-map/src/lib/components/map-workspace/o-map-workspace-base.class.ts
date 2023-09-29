import type { OMapLayerComponent } from "../map-layer/o-map-layer.component";

export abstract class OMapWorkspaceBase {
  abstract oSearchableCollection: Array<OMapLayerComponent>;
}