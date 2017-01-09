import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdIconModule, MdIconRegistry, MdSidenavModule } from '@angular/material';
import { DragulaDirective, DragulaModule } from 'ng2-dragula/ng2-dragula';
import {
	OMapComponent,
	OMapBaseLayerComponent,
	OMapLayerComponent,
	OMapLayerFactory,
	OMapLayerGroupComponent,
	OMapWorkspaceComponent,
	OMapWorkspaceLayerComponent,
	OToggleIconButtonComponent,
	OMarkerComponent,
	ONavigatorComponent,
	ONavigatorItemComponent
} from './src/components';

import { TranslateMapService } from './src/services';

export {
	OMapComponent,
	OMapLayerComponent,
	OMapLayerFactory,
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

@NgModule({
	imports: [CommonModule, FormsModule, MdIconModule, MdSidenavModule, DragulaModule],
	declarations: OMAP_DIRECTIVES,
	exports: [
		...OMAP_DIRECTIVES,
		DragulaDirective],
	providers: [MdIconRegistry,
		[Injector,
			{
				provide: TranslateMapService,
				useFactory: (injector) => new TranslateMapService(injector),
				deps: [Injector]
			}]
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OMapModule { }
