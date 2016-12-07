import {
    EventEmitter
} from '@angular/core';
import {
    OMapLayerComponent
} from '../../components';
import {
    MapService
} from '../../services';
import {
    Center
} from '../../core';
import {
    Util
} from '../../utils';

const DEFAULT_CENTER = new Center(42.2274519, -8.7236805);

export class OMapBase {
    public zoom: number;
    public minZoom: number;
    public maxZoom: number;
    public zoomControl: boolean = true;
    protected mapLayers: Array<OMapLayerComponent> = new Array<OMapLayerComponent>();
    protected mapService: MapService;
    protected mapConfiguration: EventEmitter<any> = new EventEmitter();
    private center: Center;

    public getOMapLayer(layerId: string): OMapLayerComponent {
        let filtered = this.mapLayers.filter((item: OMapLayerComponent) => {
            if (item.layerId === layerId) {
                return true;
            }
        });
        if (filtered.length === 1) {
            return filtered[0];
        }
        return null;
    }

    public getOMapLayers(): Array<OMapLayerComponent> {
        return this.mapLayers;
    }

    public addOMapLayer(layer: OMapLayerComponent) {
        this.mapLayers.push(layer);
    }

    public getMapService(): MapService {
        return this.mapService;
    }

    public getCenter(): Center {
        return this.center || DEFAULT_CENTER;
    }

    public setCenter(sCenter: string) {
        if (Util.isBlank(sCenter)) {
            this.center = DEFAULT_CENTER;
        } else {
            let coordinates = sCenter.split(/,|;/);
            if (coordinates.length > 2) {
                let [latitude, longitude] = coordinates.map(c => parseFloat(c));
                this.center = new Center(latitude, longitude);
            }
        }

        let map = this.getMapService().map;
        if (!Util.isBlank(map)) {
            map.panTo([this.center.latitude, this.center.longitude]);
        }
    }

    public addMarker(id, latitude, longitude, options, popup, hidden, showInMenu, menuLabel) {
        this.mapService.addMarker(id, latitude, longitude, options, popup, hidden, showInMenu, menuLabel);
    }
}
