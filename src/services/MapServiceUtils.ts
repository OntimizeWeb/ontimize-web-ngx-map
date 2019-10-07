import * as L from 'leaflet';

import { BaseLayer } from '../interfaces';
import { BaseLayerDefault } from '../models';
import { OLayerStyles } from '../types/layer-options.type';

const DEFAULT_BASE_LAYERS = {
  'OpenStreetMap': {
    name: 'OpenStreetMap',
    urlTemplate: 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    options: {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target= "_blank" > Humanitarian OpenStreetMap Team< /a>'
    }
  },
  'Esri': {
    name: 'Esri',
    urlTemplate: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    options: {
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase,'
        + ' Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
    }
  },
  'CartoDB': {
    name: 'CartoDB',
    urlTemplate: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
    options: {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy;'
        + ' <a href="http://cartodb.com/attributions">CartoDB</a>'
    }
  }
};

export class MapServiceUtils {

  public static retrieveGeoJSONStyles(geoJsonFeature: any, options: OLayerStyles) {
    if (options && geoJsonFeature['properties']) {
      if (geoJsonFeature['properties']['stroke']) options.stroke = geoJsonFeature['properties']['stroke'];
      if (geoJsonFeature['properties']['color']) options.color = geoJsonFeature['properties']['color'];
      if (geoJsonFeature['properties']['weight']) options.weight = geoJsonFeature['properties']['weight'];
      if (geoJsonFeature['properties']['opacity']) options.opacity = geoJsonFeature['properties']['opacity'];
      if (geoJsonFeature['properties']['lineCap']) options.lineCap = geoJsonFeature['properties']['lineCap'];
      if (geoJsonFeature['properties']['lineJoin']) options.lineJoin = geoJsonFeature['properties']['lineJoin'];
      if (geoJsonFeature['properties']['dashArray']) options.dashArray = geoJsonFeature['properties']['dashArray'];
      if (geoJsonFeature['properties']['dashOffset']) options.dashOffset = geoJsonFeature['properties']['dashOffset'];
      if (geoJsonFeature['properties']['fill']) options.fill = geoJsonFeature['properties']['fill'];
      if (geoJsonFeature['properties']['fillColor']) options.fillColor = geoJsonFeature['properties']['fillColor'];
      if (geoJsonFeature['properties']['fillOpacity']) options.fillOpacity = geoJsonFeature['properties']['fillOpacity'];
      if (geoJsonFeature['properties']['fillRule']) options.fillRule = geoJsonFeature['properties']['fillRule'];
      if (geoJsonFeature['properties']['className']) options.className = geoJsonFeature['properties']['className'];
    }
    return options;
  }

  public static createDefaultBaseLayer(id: string, active: boolean = false): BaseLayer | L.TileLayer {
    let baseLayer: BaseLayer | L.TileLayer = undefined;

    try {
      // First, search into known providers
      let tileLayer: L.TileLayer = L.tileLayer['provider'](id);
      if (tileLayer !== undefined) {
        let _url = tileLayer['_url'];
        if (window.location.protocol === 'https:') {
          _url = _url.replace('http:', 'https:');
        }
        baseLayer = new BaseLayerDefault({
          id: id,
          name: id,
          urlTemplate: _url,
          active: active,
          options: tileLayer['options'],
          tileLayer: tileLayer
        });
      } else if (!baseLayer && Object.keys(DEFAULT_BASE_LAYERS).indexOf(id) > -1) {
        baseLayer = new BaseLayerDefault(this.getDefaultBaseLayerConfiguration(id));
      }
    } catch (e) {
      // If not found, try to create new tile layer
      if (Object.keys(DEFAULT_BASE_LAYERS).indexOf(id) > -1) {
        baseLayer = new BaseLayerDefault(this.getDefaultBaseLayerConfiguration(id));
      }
    }
    return baseLayer;
  }

  private static getDefaultBaseLayerConfiguration(id: string): Object {
    if (Object.keys(DEFAULT_BASE_LAYERS).indexOf(id) > -1) {
      let conf = DEFAULT_BASE_LAYERS[id];
      if (window.location.protocol === 'https:') {
        conf['urlTemplate'] = conf['urlTemplate'].replace('http:', 'https:');
      }
      return conf;
    }
    return void 0;
  }

}
