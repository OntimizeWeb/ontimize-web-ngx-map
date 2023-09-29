import { OMapBaseLayerComponent } from './map-base-layer/o-map-base-layer.component';
import { OMapCrsComponent } from './map-crs/o-map-crs.component';
import { OMapDrawControlsComponent } from './map-draw-controls/o-map-draw-controls.component';
import { OMapLayerContainerComponent } from './map-layer-container/o-map-layer-container.component';
import { OMapLayerGroupComponent } from './map-layer-group/o-map-layer-group.component';
import { OMapLayerComponent } from './map-layer/o-map-layer.component';
import { OMapWorkspaceLayerComponent } from './map-workspace-layer/o-map-workspace-layer.component';
import { OMapWorkspaceComponent } from './map-workspace/o-map-workspace.component';
import { OMapComponent } from './map/o-map.component';
import { OMarkerComponent } from './marker/o-marker.component';
import { ONavigatorItemComponent } from './navigator/o-navigator-item.component';
import { ONavigatorComponent } from './navigator/o-navigator.component';
import { OToggleIconButtonComponent } from './toggle-icon-button/o-toggle-icon-button.component';

export const OMAP_COMPONENTS: any[] = [
  OMapComponent,
  OMapBaseLayerComponent,
  OMapDrawControlsComponent,
  OMapCrsComponent,
  OMapLayerComponent,
  OMapLayerGroupComponent,
  OMapWorkspaceComponent,
  OMapWorkspaceLayerComponent,
  OToggleIconButtonComponent,
  OMarkerComponent,
  ONavigatorComponent,
  ONavigatorItemComponent,
  OMapLayerContainerComponent
];
