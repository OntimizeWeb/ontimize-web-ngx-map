import { OMapComponent } from './map/o-map.component';
import { OMapBaseLayerComponent } from './map-base-layer/o-map-base-layer.component';
import { OMapLayerComponent } from './map-layer/o-map-layer.component';
import { OMapLayerGroupComponent } from './map-layer-group/o-map-layer-group.component';
import { OMapWorkspaceComponent } from './map-workspace/o-map-workspace.component';
import { OMapWorkspaceLayerComponent } from './map-workspace-layer/o-map-workspace-layer.component';
import { OToggleIconButtonComponent } from './toggle-icon-button/o-toggle-icon-button.component';
import { OMarkerComponent } from './marker/o-marker.component';
import { ONavigatorComponent } from './navigator/o-navigator.component';
import { ONavigatorItemComponent } from './navigator/o-navigator-item.component';

export * from './map/o-map.component';
export * from './map-base-layer/o-map-base-layer.component';
export * from './map-layer/o-map-layer.component';
export * from './map-layer/o-map-layer.factory';
export * from './map-layer-group/o-map-layer-group.component';
export * from './map-workspace/o-map-workspace.component';
export * from './map-workspace-layer/o-map-workspace-layer.component';
export * from './toggle-icon-button/o-toggle-icon-button.component';
export * from './marker/o-marker.component';
export * from './navigator/o-navigator.component';
export * from './navigator/o-navigator-item.component';

export const OMAP_DIRECTIVES: any[] = [
  OMapComponent,
  OMapBaseLayerComponent,
  OMapLayerComponent,
  OMapLayerGroupComponent,
  OMapWorkspaceComponent,
  OMapWorkspaceLayerComponent,
  OToggleIconButtonComponent,
  OMarkerComponent,
  ONavigatorComponent,
  ONavigatorItemComponent
];
