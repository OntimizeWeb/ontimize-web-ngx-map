import { OMapLayerComponent, OMapWorkspaceComponent } from '../../components';
import { OMapWLayers } from './o-map-w-layers.class';

export class OMapWWorkspace extends OMapWLayers {
	mapWorkspace: OMapWorkspaceComponent = undefined;

	/**
	 * Get Workspace Layers List
	 */
	getWorkspaceMapLayers(): Array<OMapLayerComponent> {
		if (!this.mapWorkspace) return [];
		return this.mapWorkspace.getMapLayers();
	}

	/**
	 * Get Workspace Layer selected on Layers List
	 */
	getWorkspaceSelectedMapLayer(): OMapLayerComponent {
		if (!this.mapWorkspace) return undefined;
		return this.mapWorkspace.getSelectedMapLayer();
	}
}
