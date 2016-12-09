import {
    Component,
    Inject,
    forwardRef
} from '@angular/core';
import {
    OMapComponent
} from '../../components';
import {
  OSearchable,
  OSearchResult
} from '../../interfaces';
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
export class OMapBaseLayerComponent implements BaseLayer, OSearchable {
    id: string;
    active: boolean = false;

    name: string;
    urlTemplate: string;

    public oSearchKeys: Array<string> = ['name'];
    get oSearchResult(): OSearchResult {
        return {
            label: this.name,
            icon: 'map',
            buttons: [{
                icon: ['visibility', 'visibility_off'],
                status: () => this.active,
                callback: () => this.select()
            }]
        };
    }

    constructor(
        @Inject(forwardRef(() => OMapComponent)) protected oMap: OMapComponent
    ) { }

    select(): boolean {
        this.oMap.unselectBaseLayers();
        this.oMap.getMapService().selectBaseLayer(this.id);
        return this.active = true;
    }
}
