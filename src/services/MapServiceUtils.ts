import * as L from 'leaflet';

import { BaseLayer } from '../interfaces';
import { BaseLayerDefault } from '../models';

const AVAILABLE_STYLE_ATTRIBUTE_KEYS = [
  'stroke', 'color', 'weight', 'opacity', 'lineCap',
  'lineJoin', 'dashArray', 'dashOffset', 'fill',
  'fillColor', 'fillOpacity', 'fillRule'
];

const AVAILABLE_ICON_OPTIONS_KEYS = ['iconUrl', 'iconRetinaUrl', 'iconSize', 'iconAnchor', 'popupAnchor', 'tooltipAnchor', 'shadowUrl', 'shadowRetinaUrl', 'shadowSize', 'shadowAnchor', 'className'];

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

  public static retrieveGeoJSONStyles(geoJsonFeature: any, options: Object) {
    let style = {};
    // By convention, styles configured on geoJsonFeature has priority over option styles.
    AVAILABLE_STYLE_ATTRIBUTE_KEYS.forEach((item) => {
      if (options[item]) {
        style[item] = options[item];
      }
      if (geoJsonFeature['properties'] &&
        geoJsonFeature['properties'][item])
        style[item] = geoJsonFeature['properties'][item];
    });

    return style;
  }

  public static retrieveIconStyles(options: Object): Object {
    const result = {};
    AVAILABLE_ICON_OPTIONS_KEYS.forEach(key => result[key] = options[key]);
    return result;
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
    return null;
  }

}
