import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MdIconModule,
  MdIconRegistry,
  MdSidenavModule
} from '@angular/material';
import { DragulaDirective, DragulaModule } from 'ng2-dragula/ng2-dragula';
import {
  OMapComponent,
  OMapLayerComponent,
  OMapLayerGroupComponent,
  OMapWorkspaceComponent,
  OMapWorkspaceLayerComponent,
  OToggleIconButtonComponent,
  OMarkerComponent,
  ONavigatorComponent,
  ONavigatorItemComponent
} from './src/components/';
import { OMapLayerFactory } from './src/components/map-layer/o-map-layer.factory';
export { OMapLayerFactory } from './src/components/map-layer/o-map-layer.factory';

export {
  OMapComponent,
  OMapLayerComponent,
  OMapLayerGroupComponent,
  OMapWorkspaceComponent,
  OMapWorkspaceLayerComponent,
  OToggleIconButtonComponent
} from './src/components/';

export * from './src/interfaces';
export * from './src/services';
export * from './src/core';

const OMAP_DIRECTIVES: any[] = [
  OMapComponent,
  OMapLayerComponent,
  OMapLayerGroupComponent,
  OMapWorkspaceComponent,
  OMapWorkspaceLayerComponent,
  OToggleIconButtonComponent,
  OMarkerComponent,
  ONavigatorComponent,
  ONavigatorItemComponent
];

@NgModule({
  imports: [CommonModule, FormsModule, MdIconModule, MdSidenavModule, DragulaModule],
  declarations: OMAP_DIRECTIVES,
  exports: [OMapComponent, OMapLayerComponent, OMapLayerGroupComponent, OMapWorkspaceComponent, OMapWorkspaceLayerComponent, OToggleIconButtonComponent, DragulaDirective],
  providers: [MdIconRegistry],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OMapModule { }
