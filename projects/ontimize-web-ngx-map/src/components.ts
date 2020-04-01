import { OMapBaseLayerComponent } from './components/map-base-layer/o-map-base-layer.component';
import { OMapCrsComponent } from './components/map-crs/o-map-crs.component';
import { OMapDrawControlsComponent } from './components/map-draw-controls/o-map-draw-controls.component';
import { OMapLayerContainerComponent } from './components/map-layer-container/o-map-layer-container.component';
import { OMapLayerGroupComponent } from './components/map-layer-group/o-map-layer-group.component';
import { OMapLayerComponent } from './components/map-layer/o-map-layer.component';
import { OMapWorkspaceLayerComponent } from './components/map-workspace-layer/o-map-workspace-layer.component';
import { OMapWorkspaceComponent } from './components/map-workspace/o-map-workspace.component';
import { OMapComponent } from './components/map/o-map.component';
import { OMarkerComponent } from './components/marker/o-marker.component';
import { ONavigatorItemComponent } from './components/navigator/o-navigator-item.component';
import { ONavigatorComponent } from './components/navigator/o-navigator.component';
import { OToggleIconButtonComponent } from './components/toggle-icon-button/o-toggle-icon-button.component';

export * from './components/map/o-map.component';
export * from './components/map-base-layer/o-map-base-layer.component';
export * from './components/map-draw-controls/o-map-draw-controls.component';
export * from './components/map-crs/o-map-crs.component';
export * from './components/map-layer/o-map-layer.component';
export * from './components/map-layer/o-map-layer.factory';
export * from './components/map-layer-group/o-map-layer-group.component';
export * from './components/map-workspace/o-map-workspace.component';
export * from './components/map-workspace-layer/o-map-workspace-layer.component';
export * from './components/toggle-icon-button/o-toggle-icon-button.component';
export * from './components/marker/o-marker.component';
export * from './components/navigator/o-navigator.component';
export * from './components/navigator/o-navigator-item.component';
export * from './components/map-layer-container/o-map-layer-container.component';

export const OMAP_DIRECTIVES: any[] = [
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
