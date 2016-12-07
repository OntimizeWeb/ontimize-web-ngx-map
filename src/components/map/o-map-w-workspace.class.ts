import {
    OMapLayerComponent,
    OMapWorkspaceComponent
} from '../../components';
import {
    OMapWLayers
} from './o-map-w-layers.class';

export class OMapWWorkspace extends OMapWLayers {
    mapWorkspace: OMapWorkspaceComponent = undefined;

    getWorkspaceMapLayers(): Array<OMapLayerComponent> {
        if (this.mapWorkspace) {
            return this.mapWorkspace.getMapLayers();
        }
        return [];
    }

    getWorkspaceSelectedMapLayer(): OMapLayerComponent {
        if (this.mapWorkspace) {
            return this.mapWorkspace.getSelectedMapLayer();
        }
        return undefined;
    }

}
