import {
    Component,
    Inject,
    forwardRef
} from '@angular/core';
import {
    OMapComponent
} from '../../components';
import {
    BaseLayer
} from '../../core';

@Component({
    selector: 'o-map-base-layer',
    moduleId: module.id,
    providers: [],
    inputs: [
        'id: layer-id',
        'name: title',
        'urlTemplate: src'
    ],
    templateUrl: '/map-base-layer/o-map-base-layer.component.html',
    styleUrls: ['/map-base-layer/o-map-base-layer.component.css']
})
export class OMapBaseLayerComponent implements BaseLayer {
    id: string;
    active: boolean = false;

    name: string;
    urlTemplate: string;

    constructor(
        @Inject(forwardRef(() => OMapComponent)) protected oMap: OMapComponent
    ) { }

    select() {
        this.oMap.unselectBaseLayers();
        this.oMap.getMapService().selectBaseLayer(this.id);
        this.active = true;
    }
}
