import { MapService } from '../../services';
import {
    OMapWMarkerCluster
} from './o-map-w-markercluster.class';
import {
    BaseLayer
} from '../../core';

export class OMapWBaseLayer extends OMapWMarkerCluster {

    private baseLayersGroup: Array<BaseLayer> = new Array<BaseLayer>();

    constructor() {
        super();

        this.mapConfiguration.subscribe(() => {
            (<any>this.getMapService().map).createPane(MapService.BASE_PANE);
            (<any>this.getMapService().map).getPane(MapService.BASE_PANE).style.zIndex = 450;
            this.getMapService().uploadBaseLayers();
            L.control.scale().addTo(this.getMapService().map);
        });
    }

    get baseLayers(): Array<BaseLayer> {
        let newBaseLayerGroup = this.getMapService().baseLayers.getBaseLayers().map(bL => this.buildBaseLayerUrl(bL));
        if (this.baseLayersGroup.length !== newBaseLayerGroup.length) {
            this.baseLayersGroup = newBaseLayerGroup;
        }
        return this.baseLayersGroup;
    }

    unselectBaseLayers() {
        this.baseLayersGroup.forEach(bL => bL.active = false);
    }

    private buildBaseLayerUrl(bL: BaseLayer): BaseLayer {
        return {
            id: bL.id,
            active: false,
            name: bL.name,
            urlTemplate: bL.urlTemplate.replace('{s}','b').replace('{x}','974').replace('{y}','758').replace('{z}','11')
        };
    }
}
