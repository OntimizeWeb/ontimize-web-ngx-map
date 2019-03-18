import * as L from 'leaflet';

import { LayerConfiguration } from '../../models';
import { MapService } from '../../services';

export class OMapLayerFactory {

  public createMapLayer(layerConf: LayerConfiguration, mapService: MapService): L.Layer {
    let layer;
    switch (layerConf.type) {
      case 'marker':
        layer = this.createMarker(layerConf, mapService);
        break;
      case 'geoJSON':
        layer = this.createGeoJSON(layerConf, mapService);
        break;
      case 'WMS':
        layer = this.createWMS(layerConf, mapService);
        break;
      // case 'image':
      //   this.createImageOverlay(mapService);
      //   break;
      // case 'polyline':
      //   this.createPolyline(mapService);
      //   break;
      // case 'polygon':
      //   this.createPolygon(mapService);
      //   break;
      // case 'rectangle':
      //   this.createRectangle(mapService);
      //   break;
      // case 'circle':
      //   this.createCircle(mapService);
      //   break;
    }
    return layer;
  }

  /**
   * Creates marker and adds it to map.
   * @param  layerConf
   *          Layer configuration parameters.
   * @param  mapService
   *          Reference to map service responsible of interact with leaflet map object.
   * @return L.Marker layer.
   */
  public createMarker(layerConf: LayerConfiguration, mapService: MapService): L.Marker {
    // Get id
    var id = null;
    if (layerConf.layerId) {
      id = layerConf.layerId;
    }

    let layer;
    var success = ((id !== null) && layerConf.hasOwnProperty('center'));
    if (success) {
      layer = mapService.addMarker(id, layerConf.center.latitude, layerConf.center.longitude, null,
        layerConf.popup, !layerConf.visible, layerConf.showInMenu, layerConf.menuLabel);
    }
    return layer;
  }

  /**
   * Creates GeoJSON layer and adds it to map.
   * @param  layerConf
   *          Layer configuration parameters.
   * @param  mapService
   *          Reference to map service responsible of interact with leaflet map object.
   * @returns L.GeoJSON layer.
   */
  public createGeoJSON(layerConf: LayerConfiguration, mapService: MapService): L.GeoJSON {
    // Get id
    var id = null;
    if (layerConf.layerId) {
      id = layerConf.layerId;
    }

    var layer;
    var success = (id !== null);
    if (success) {
      let opt = {
        'icon': layerConf.icon
      };
      if (layerConf.options === undefined) {
        layerConf.options = {};
      }
      layerConf.options = Object.assign(opt, layerConf.options);

      layer = mapService.addGeoJSON(id, null, layerConf.options, layerConf.popup,
        !layerConf.visible, layerConf.showInMenu, layerConf.menuLabel);
    }

    return layer;
  }

  /**
   * Creates WMS layer and adds it to map.
   * @param   layerConf
   *          Layer configuration parameters.
   * @param   mapService
   *          Reference to map service responsible of interact with leaflet map object.
   * @returns  layer
   */
  public createWMS(layerConf: LayerConfiguration, mapService: MapService): L.TileLayer.WMS {
    var id = null;
    if (layerConf.layerId) {
      id = layerConf.layerId;
    }

    let opt = {
      format: 'image/png',
      transparent: true
    };
    if (layerConf.options === undefined) {
      layerConf.options = {};
    }
    layerConf.options = Object.assign(layerConf.options, opt);

    let layer;
    var success = (id !== null);
    if (success) {
      layer = mapService.addTileLayerWMS(id, layerConf.baseUrl, layerConf.options,
        !layerConf.visible, layerConf.showInMenu, layerConf.menuLabel);
    }

    return layer;
  }

}
