import * as L from 'leaflet';

import { BaseLayer } from '../interfaces/baselayers/baselayers.interface';
import { BaseLayerDefault } from './BaseLayer.class';

export class BaseLayerCollection {
  baseMaps: Object = {};
  baseMapsOrderedList: Array<string> = [];

  addLayer(id: string, layer: BaseLayer | L.TileLayer) {
    if (layer instanceof BaseLayerDefault) {
      layer.id = id;
    }
    this.baseMaps[id] = layer;
    this.baseMapsOrderedList.push(id);
  }

  getLayer(id: string): BaseLayer | L.TileLayer {
    return this.contains(id) ? this.baseMaps[id] : undefined;
  }

  getTileLayer(id: string): L.TileLayer {
    const layer: BaseLayer | L.TileLayer = this.getLayer(id);
    if (layer instanceof BaseLayerDefault) {
      return layer.getTileLayer();
    } else if (layer instanceof L.TileLayer) {
      return layer;
    }
    return undefined;
  }

  getBaseLayers(): Array<BaseLayer> {
    return this.baseMapsOrderedList
      .map(k => this.getLayer(k))
      .filter(l => l instanceof BaseLayerDefault);
  }

  getLayersMap(): L.Control.LayersObject {
    const map: L.Control.LayersObject = {};
    this.baseMapsOrderedList.forEach(k => {
      // TODO translate 'k' for showing pretty name at control panel
      map[k] = this.getTileLayer(k);
    });
    return map;
  }

  getLayersArray(): Array<L.TileLayer> {
    const array = [];
    this.baseMapsOrderedList.forEach(k => {
      array.push(this.getTileLayer(k));
    });
    return array;
  }

  contains(id: string): boolean {
    return this.baseMapsOrderedList.indexOf(id) > -1;
  }
}
