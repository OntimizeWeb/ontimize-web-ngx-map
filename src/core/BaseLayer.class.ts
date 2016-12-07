import { EventEmitter } from '@angular/core';
import * as L from 'leaflet';

export interface BaseLayer {
    id?: string;
    active?: boolean;

    name?: string;
    urlTemplate?: string;
    options?: L.TileLayerOptions;
}

export interface BaseLayerEvents {
    onUpdate: EventEmitter<any>;
}

export class BaseLayerDefault implements BaseLayer {
    public id: string = '';
    public name: string;
    public urlTemplate: string;
    public options: L.TileLayerOptions;

    public events: BaseLayerEvents = {
        onUpdate: new EventEmitter<any>()
    };

    private tileLayer: L.TileLayer;

    constructor(baseLayer?: BaseLayer) {
        if (!!baseLayer) {
            this.setBaseLayer(baseLayer);
        }
    }

    getTileLayer(): L.TileLayer {
        if (!this.tileLayer) {
            this.tileLayer = new L.TileLayer(this.urlTemplate, this.options);
        }
        return this.tileLayer;
    }

    setBaseLayer(baseLayer: BaseLayer) {
        if (!!this.tileLayer) {
            this.events.onUpdate.emit(this.tileLayer);
        }
        this.name = baseLayer.name;
        this.options = baseLayer.options;
        (<any>this.options).pane = 'tilePane';
        this.urlTemplate = baseLayer.urlTemplate;
    }
}

export class BaseLayerCollection {
    baseMaps: Object = {};
    addLayer(id: string, layer: BaseLayer | L.TileLayer) {
        if (layer instanceof BaseLayerDefault) {
            layer.id = id;
        }
        this.baseMaps[id] = layer;
    }
    getLayer(id: string): BaseLayer | L.TileLayer {
        return this.contains(id) ? this.baseMaps[id] : undefined;
    }
    getTileLayer(id: string): L.TileLayer {
        let layer: BaseLayer | L.TileLayer = this.getLayer(id);
        if (layer instanceof BaseLayerDefault) {
            return layer.getTileLayer();
        } else if (layer instanceof L.TileLayer) {
            return layer;
        }
    }
    getBaseLayers(): Array<BaseLayer> {
        return Object.keys(this.baseMaps)
            .map(k => this.getLayer(k))
            .filter(l => l instanceof BaseLayerDefault);
    }
    getLayersMap(): Object {
        let map = {};
        Object.keys(this.baseMaps).forEach(k => {
            map[k] = this.getTileLayer(k);
        });
        return map;
    }
    contains(id: string): boolean {
        return Object.keys(this.baseMaps).indexOf(id) > -1;
    }
}
