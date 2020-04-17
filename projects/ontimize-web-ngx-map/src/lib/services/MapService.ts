
import { EventEmitter, Injectable, Injector } from '@angular/core';
import * as L from 'leaflet';
import { Map } from 'leaflet';
import 'leaflet-contextmenu';
import 'leaflet-draw';
import 'leaflet-providers';
import 'leaflet.heat';
import 'leaflet.markercluster';
import 'proj4leaflet';
import { MapServiceUtils } from './MapServiceUtils';
import { TranslateMapService } from './TranslateMapService';
import { OMapLayerOptions } from '../types/layer-options.type';
import { BaseLayerCollection } from '../models/BaseLayerCollection.class';
import { LayerConfigurationContextmenu } from '../models/LayerConfiguration.class';

const LAYERS_CONTROL_ID: string = 'layers';

@Injectable()
export class MapService {
  static DEFAULT_BASE_MAP: string = 'OpenStreetMap.HOT';
  map: Map;
  layers: Object = {};
  controls: Object = {};
  baseLayers: BaseLayerCollection = new BaseLayerCollection();
  overlayMaps: L.Control.LayersObject = {};
  iconTypes: Object = {};

  drawLayerId: string;
  translateMapService: TranslateMapService;

  popupOptions: Object = {
    maxHeight: 200
  };

  defaultContextMenu: LayerConfigurationContextmenu = {
    contextmenuItems: [{
      attr: 'centerMap',
      label: 'CONTEXTMENU.CENTER_MAP',
      callback: (e) => this.centerMap(e)
    }, {
      label: '',
      separator: true
    }, {
      attr: 'zoomIn',
      label: 'CONTEXTMENU.ZOOM_IN',
      icon: 'assets/zoom-in.png',
      callback: () => this.zoomIn()
    }, {
      attr: 'zoomOut',
      label: 'CONTEXTMENU.ZOOM_OUT',
      icon: 'assets/zoom-out.png',
      callback: () => this.zoomOut()
    }]
  };
  public baseLayerSelected: EventEmitter<any> = new EventEmitter();

  constructor(protected injector: Injector) {
    this.translateMapService = this.injector.get(TranslateMapService);
  }

  public centerMap(e) {
    this.getMap().panTo(e.latlng);
  }

  public zoomIn() {
    this.getMap().zoomIn();
  }

  public zoomOut() {
    this.getMap().zoomOut();
  }

  disableMouseEvent(tag: string) {
    var html = L.DomUtil.get(tag);

    L.DomEvent.disableClickPropagation(html);
    L.DomEvent.on(html, 'mousewheel', L.DomEvent.stopPropagation);
  }

  /**
   * Gets or creates the map
   * @param id Id of the map
   * @param options Leaflet option for the map
   */
  getMap(id?: string, options?: L.MapOptions): Map {
    if (!!id && !this.map) {
      this.map = new L.Map(id, options);
    }
    return this.map;
  }

  /**
   * Sets center of map.
   * @param latitude Center latitude.
   * @param longitude  Center longitude.
   */
  setCenter(latitude: number, longitude: number) {
    this.map.setView([latitude, longitude], this.map.getZoom());
  }

  /**
   * Returns the geographical center of the map view.
   * @return Map center geographical coordinates.
   */
  getCenter(): L.LatLng {
    return this.map.getCenter();
  }

  /**
   * Sets map zoom.
   * @param zoom  Zoom value
   */
  setZoom(zoom: number) {
    this.map.setZoom(zoom);
  }

  /**
  * Returns map current zoom.
  * @return Map zoom.
  */
  getZoom() {
    return this.getZoom();
  }

  getDefaultContextmenuItems() {
    return this.defaultContextMenu;
  }

  /**
   * Adds a layer (tiles, marker, circle, polygon...) to the map.
   * @param id
   *          Unique identifier.
   * @param layer
   *          Layer to be added.
   * @param hidden
   *          (optional) Set this property to true to do not show the layer.
   * @param showInMenu
   *          (optional) Set to 'base' or 'overlay' to appear in menu.
   * @param menuLabel
   *          (optional) Label to identify this layer in the menu.
   */
  addLayer(id, layer, hidden: boolean = false, showInMenu: string = '', menuLabel: string) {
    // If exists any layer with same id, remove it first
    if (this.layers[id]) {
      this.map.removeLayer(this.layers[id]);
    }

    // Translate menu label
    if (menuLabel) {
      // TODO   menuLabel = I18n.translate(menuLabel.trim());
    } else {
      menuLabel = id;
    }

    // Check if layer has to be added to control
    switch (showInMenu) {
      case 'base':
        // Base layer (radio button)
        if (this.controls[LAYERS_CONTROL_ID] && this.baseLayers.contains(menuLabel)) {
          this.controls[LAYERS_CONTROL_ID].removeLayer(this.baseLayers.getTileLayer(menuLabel));
        }
        this.layers[id] = menuLabel;
        this.baseLayers.addLayer(menuLabel, layer);
        if (this.controls[LAYERS_CONTROL_ID]) {
          this.controls[LAYERS_CONTROL_ID].addBaseLayer(layer, menuLabel);
        } else {
          this.controls[LAYERS_CONTROL_ID] = L.control.layers(this.baseLayers.getLayersMap()).addTo(this.map);
        }
        break;

      case 'overlay':
        // Overlay layer (checkbox button)
        if (this.controls[LAYERS_CONTROL_ID] && this.overlayMaps[menuLabel]) {
          this.controls[LAYERS_CONTROL_ID].removeLayer(this.overlayMaps[menuLabel]);
        }
        this.layers[id] = menuLabel;
        this.overlayMaps[menuLabel] = layer;
        if (this.controls[LAYERS_CONTROL_ID]) {
          this.controls[LAYERS_CONTROL_ID].addOverlay(layer, menuLabel);
        } else {
          this.controls[LAYERS_CONTROL_ID] = L.control.layers(void 0, this.overlayMaps).addTo(this.map);
        }
        break;

      default:
        // Layer out of control
        this.layers[id] = layer;
        break;
    }

    // Show layer on map
    if (!hidden) {
      layer.addTo(this.map);
    }
  }

  addDrawLayer(layer) {
    this.drawLayerId = Math.random().toString(36);
    const label = this.translateMapService.get('draw-control-layer');
    this.addLayer(this.drawLayerId, layer, false, 'overlay', label);
  }

  removeDrawLayer() {
    this.removeLayer(this.drawLayerId);
  }

  getDrawLayer() {
    return this.overlayMaps[this.layers[this.drawLayerId]];
  }

  /**
   * Configures default base layers of the map
   * @param baseLayerIds Array of base layer identifiers ('OpenStreetMap' | 'Esri' | 'CartoDB' ...)
   *	@see https://github.com/leaflet-extras/leaflet-providers#providers
   */
  configureBaseLayers(baseLayerIds: Array<string>) {
    if (baseLayerIds && baseLayerIds.length > 0) {
      baseLayerIds.forEach((id, index) => {
        if (!this.baseLayers.contains(id)) {
          const bl = MapServiceUtils.createDefaultBaseLayer(id, index === 0);
          if (bl) {
            this.baseLayers.addLayer(id, bl);
          }
        }
      });
    } else {
      // By default it is added 'OpenStreetMap' as base layer.
      this.baseLayers.addLayer(MapService.DEFAULT_BASE_MAP,
        MapServiceUtils.createDefaultBaseLayer(MapService.DEFAULT_BASE_MAP, true));
    }
  }

  /**
   * Selects a layer by adding it again to the map
   * @param id Unique identifier
   */
  selectBaseLayer(id: string) {
    const l = this.baseLayers.getTileLayer(id);
    if (!!l) {
      this.clearBaseLayers();
      l.addTo(this.getMap());

      this.baseLayerSelected.emit(true);
    }
  }

  /**
   * Upload base layers in the map
   */
  uploadBaseLayers() {
    const lM = this.baseLayers.getLayersMap();
    this.clearBaseLayers();
    this.controls[LAYERS_CONTROL_ID] = L.control.layers(lM).addTo(this.getMap());
  }

  /**
   * Deletes all base layers.
   */
  clearBaseLayers(): void {
    const lM = this.baseLayers.getLayersMap();
    for (let layerId in lM) {
      if (lM.hasOwnProperty(layerId)) {
        const layer = this.baseLayers.getTileLayer(layerId);
        this.map.removeLayer(layer);
      }
    }
  }

  /**
   * Removes a layer (tiles, marker, circle, polygon...) from the map.
   * @param id
   *          Unique identifier.
   * @return True if success, else false.
   */
  removeLayer(id: string): boolean {
    let success = false;
    let layer;
    if (this.controls[LAYERS_CONTROL_ID]) {
      if ((typeof (this.layers[id]) === 'string')) {
        const menuLabel = this.layers[id];
        if (this.overlayMaps[menuLabel]) {
          layer = this.overlayMaps[menuLabel];
        }
      } else if (this.baseLayers.contains(id)) {
        layer = this.baseLayers.getTileLayer(id);
      }

      if (!!layer) {
        this.controls[LAYERS_CONTROL_ID].removeLayer(layer);
        this.map.removeLayer(layer);
        success = true;
      }
      delete this.layers[id];
    }
    return success;
  }

  /**
   * Deletes all layers.
   */
  clearLayers(): void {
    for (let layerId in this.layers) {
      if (this.layers.hasOwnProperty(layerId)) {
        this.removeLayer(layerId);
      }
    }
    this.layers = {};
  }

  /**
   * Returns concrete map layer.
   * @param id
   *          Layer identifier.
   * @return Layer object if exists, else undefined.
   */
  getLayer(id: string) {
    let layer;
    if ((typeof (this.layers[id]) === 'string') && this.controls[LAYERS_CONTROL_ID]) {
      const menuLabel = this.layers[id];
      layer = this.overlayMaps[menuLabel] || undefined;
    } else if (this.baseLayers.contains(id) && this.controls[LAYERS_CONTROL_ID]) {
      layer = this.baseLayers.getTileLayer(id);
    } else {
      layer = this.layers[id];
    }
    return layer;
  }

  /**
   * Creates Leaflet icon type, which can be used to create new icons.
   * @param id
   *          Unique identifier.
   * @param options
   *          Object with options (http://leafletjs.com/reference.html#icon-options).
   * @return Leaflet icon type object.
   */
  createIconType(id, options) {
    this.iconTypes[id] = L.Icon.extend({
      options: options
    });
    return this.iconTypes[id];
  }

  /**
   * Creates Leaflet icon, which can be used in layers.
   * @param options
   *          Object with options (http://leafletjs.com/reference.html#icon-options).
   * @param type
   *          (optional) Icon type, previously created with createIconType function.
   * @return Leaflet icon object.
   */
  createIcon(options, type) {
    let icon = void 0;
    if (type) {
      const iconType = this.iconTypes[type];
      if (iconType) {
        icon = new iconType(options);
      }
    } else {
      icon = L.icon(options);
    }
    return icon;
  }

  /**
   * Adds a tile layer to the map.
   * @param id
   *          Unique identifier.
   * @param template
   *          Known Leaflet provider name (leaflet-providers.js) or URL template
   *          (http://leafletjs.com/reference.html#tilelayer).
   * @param options
   *          (optional) Object with options (http://leafletjs.com/reference.html#tilelayer-options).
   * @param hidden
   *          (optional) Set this property to true to do not show the layer.
   * @param showInMenu
   *          (optional) Set to 'base' or 'overlay' to appear in menu.
   * @param menuLabel
   *          (optional) Label to identify this layer in the menu.
   * @return Added tile layer.
   */
  addTileLayer(id, template, options, hidden, showInMenu, menuLabel) {
    let tileLayer = null;

    // TODO leaflet-providers library does not have typings (d.ts) for using .provider

    // try {
    //   // First, search into known providers
    //   tileLayer = TileLayer.provider(template, options);
    // } catch (e) {
    // If not found, try to create new tile layer
    tileLayer = new L.TileLayer(template, options);
    // }

    // Add tile layer to map
    if (tileLayer !== null) {
      this.addLayer(id, tileLayer, hidden, showInMenu, menuLabel);
    }

    return tileLayer;
  }

  /**
   * Used to display WMS services as tile layers on the map.
   * @param id
   *          Unique identifier.
   * @param baseUrl
   *          Base URL of the WMS service.
   * @param options
   *          (optional) Object with options (http://leafletjs.com/reference.html#tilelayer-wms-options).
   * @param hidden
   *          (optional) Set this property to true to do not show the layer.
   * @param showInMenu
   *          (optional) Set to 'base' or 'overlay' to appear in menu.
   * @param menuLabel
   *          (optional) Label to identify this layer in the menu.
   * @return Added WMS tile layer.
   */
  addTileLayerWMS(id, baseUrl, optionsArg: OMapLayerOptions = {}, hidden, showInMenu, menuLabel) {
    optionsArg = optionsArg ? optionsArg : {};
    // Create new WMS tile layer
    const tileLayerWMS = new L.TileLayer.WMS(baseUrl, (optionsArg.layerOptions as any));

    // Add WMS tile layer to map
    this.addLayer(id, tileLayerWMS, hidden, showInMenu, menuLabel);

    return tileLayerWMS;
  }

  /**
   * Adds a marker to the map.
   * @param id
   *          Unique identifier.
   * @param latitude
   *          Latitude.
   * @param longitude
   *          Longitude.
   * @param options
   *          (optional) Object with options (http://leafletjs.com/reference.html#marker-options).
   * @param popup
   *          (optional) Pop up message (accepts HTML code).
   * @param hidden
   *          (optional) Set this property to true to do not show the layer.
   * @param showInMenu
   *          (optional) Set to 'base' or 'overlay' to appear in menu.
   * @param menuLabel
   *          (optional) Label to identify this layer in the menu.
   * @return Added marker.
   */
  addMarker(id, latitude, longitude, optionsArg: OMapLayerOptions = {}, popup, hidden, showInMenu, menuLabel) {
    optionsArg = optionsArg ? optionsArg : {};
    // Create new marker
    const latLng = new L.LatLng(latitude, longitude);
    const marker = L.marker(latLng, optionsArg.layerOptions);

    // Bind popup message
    if (typeof (popup) === 'string') {
      marker.bindPopup(popup, optionsArg.popupOptions);
    }

    // Add marker to map
    this.addLayer(id, marker, hidden, showInMenu, menuLabel);

    return marker;
  }

  /**
   * Displays a single image over specific bounds of the map.
   * @param id
   *          Unique identifier.
   * @param url
   *          Image URL.
   * @param left
   *          Geographical coordinate of left bound.
   * @param bottom
   *          Geographical coordinate of bottom bound.
   * @param right
   *          Geographical coordinate of right bound.
   * @param top
   *          Geographical coordinate of top bound.
   * @param options
   *          (optional) Object with options (http://leafletjs.com/reference.html#imageoverlay-options).
   * @param popup
   *          (optional) Pop up message (accepts HTML code).
   * @param hidden
   *          (optional) Set this property to true to do not show the layer.
   * @param showInMenu
   *          (optional) Set to 'base' or 'overlay' to appear in menu.
   * @param menuLabel
   *          (optional) Label to identify this layer in the menu.
   * @return Added image.
   */
  addImageOverlay(id, url, left, bottom, right, top, optionsArg: OMapLayerOptions = {}, popup, hidden, showInMenu, menuLabel) {
    optionsArg = optionsArg ? optionsArg : {};
    // Create new image overlay
    const bounds = new L.LatLngBounds([[bottom, left], [top, right]]);
    const image = new L.ImageOverlay(url, bounds, (optionsArg.layerOptions as any));

    // Bind popup message
    if (typeof (popup) === 'string') {
      // TODO image.bindPopup(popup, this.popupOptions);
    }

    // Add rectangle to map
    this.addLayer(id, image, hidden, showInMenu, menuLabel);

    return image;
  }

  /**
   * Adds a polyline to the map.
   * @param id
   *          Unique identifier.
   * @param points
   *          Array of geographical points.
   * @param options
   *          (optional) Object with options (http://leafletjs.com/reference.html#polyline-options).
   * @param popup
   *          (optional) Pop up message (accepts HTML code).
   * @param hidden
   *          (optional) Set this property to true to do not show the layer.
   * @param showInMenu
   *          (optional) Set to 'base' or 'overlay' to appear in menu.
   * @param menuLabel
   *          (optional) Label to identify this layer in the menu.
   * @return Added polyline.
   */
  addPolyline(id, points, optionsArg: OMapLayerOptions = {}, popup, hidden, showInMenu, menuLabel): L.Polyline<any> {
    optionsArg = optionsArg ? optionsArg : {};
    // Create new polyline
    const polyline: L.Polyline<any> = new L.Polyline(points, (optionsArg.layerStyles as any));

    // Bind popup message
    if (typeof (popup) === 'string') {
      polyline.bindPopup(popup, optionsArg.popupOptions);
    }

    // Add polyline to map
    this.addLayer(id, polyline, hidden, showInMenu, menuLabel);

    return polyline;
  }

  /**
   * Adds a multi-polyline to the map.
   * @param id
   *          Unique identifier.
   * @param points
   *          Array of arrays of geographical points (one for each individual polyline).
   * @param options
   *          (optional) Object with options (http://leafletjs.com/reference.html#polyline-options).
   * @param popup
   *          (optional) Pop up message (accepts HTML code).
   * @param hidden
   *          (optional) Set this property to true to do not show the layer.
   * @param showInMenu
   *          (optional) Set to 'base' or 'overlay' to appear in menu.
   * @param menuLabel
   *          (optional) Label to identify this layer in the menu.
   * @return Added multi-polyline.
   */
  addMultiPolyline(id, points, optionsArg: OMapLayerOptions = {}, popup, hidden, showInMenu, menuLabel) {
    optionsArg = optionsArg ? optionsArg : {};
    // Create new multi-polyline
    const multiPolyline = new L.MultiPolyline(points, optionsArg.layerStyles);

    // Bind popup message
    if (typeof (popup) === 'string') {
      multiPolyline.bindPopup(popup, optionsArg.popupOptions);
    }

    // Add multi-polyline to map
    this.addLayer(id, multiPolyline, hidden, showInMenu, menuLabel);

    return multiPolyline;
  }

  /**
   * Adds a polygon to the map.
   * @param id
   *          Unique identifier.
   * @param points
   *          Array of geographical points.
   * @param options
   *          (optional) Object with options (http://leafletjs.com/reference.html#polyline-options).
   * @param popup
   *          (optional) Pop up message (accepts HTML code).
   * @param hidden
   *          (optional) Set this property to true to do not show the layer.
   * @param showInMenu
   *          (optional) Set to 'base' or 'overlay' to appear in menu.
   * @param menuLabel
   *          (optional) Label to identify this layer in the menu.
   * @return Added polygon.
   */
  addPolygon(id, points, optionsArg: OMapLayerOptions = {}, popup, hidden, showInMenu, menuLabel) {
    optionsArg = optionsArg ? optionsArg : {};
    // Create new polygon
    const polygon = new L.Polygon(points, (optionsArg.layerStyles as any));

    // Bind popup message
    if (typeof (popup) === 'string') {
      polygon.bindPopup(popup, optionsArg.popupOptions);
    }

    // Add polygon to map
    this.addLayer(id, polygon, hidden, showInMenu, menuLabel);

    return polygon;
  }

  /**
   * Adds a multi-polygon to the map.
   * @param id
   *          Unique identifier.
   * @param points
   *          Array of arrays of geographical points (one for each individual polygon).
   * @param options
   *          (optional) Object with options (http://leafletjs.com/reference.html#polyline-options).
   * @param popup
   *          (optional) Pop up message (accepts HTML code).
   * @param hidden
   *          (optional) Set this property to true to do not show the layer.
   * @param showInMenu
   *          (optional) Set to 'base' or 'overlay' to appear in menu.
   * @param menuLabel
   *          (optional) Label to identify this layer in the menu.
   * @return Added multi-polygon.
   */
  addMultiPolygon(id, points, optionsArg: OMapLayerOptions = {}, popup, hidden, showInMenu, menuLabel) {
    optionsArg = optionsArg ? optionsArg : {};
    // Create new multi-polygon
    const multiPolygon = new L.MultiPolygon(points, optionsArg.layerStyles);

    // Bind popup message
    if (typeof (popup) === 'string') {
      multiPolygon.bindPopup(popup, optionsArg.popupOptions);
    }

    // Add multi-polygon to map
    this.addLayer(id, multiPolygon, hidden, showInMenu, menuLabel);

    return multiPolygon;
  }

  /**
   * Adds a rectangle to the map.
   * @param id
   *          Unique identifier.
   * @param left
   *          Geographical coordinate of left bound.
   * @param bottom
   *          Geographical coordinate of bottom bound.
   * @param right
   *          Geographical coordinate of right bound.
   * @param top
   *          Geographical coordinate of top bound.
   * @param options
   *          (optional) Object with options (http://leafletjs.com/reference.html#path-options).
   * @param popup
   *          (optional) Pop up message (accepts HTML code).
   * @param hidden
   *          (optional) Set this property to true to do not show the layer.
   * @param showInMenu
   *          (optional) Set to 'base' or 'overlay' to appear in menu.
   * @param menuLabel
   *          (optional) Label to identify this layer in the menu.
   * @return Added rectangle.
   */
  addRectangle(id, left, bottom, right, top, optionsArg: OMapLayerOptions = {}, popup, hidden, showInMenu, menuLabel) {
    optionsArg = optionsArg ? optionsArg : {};
    // Create new rectangle
    const bounds = new L.LatLngBounds([[bottom, left], [top, right]]);
    const rectangle = new L.Rectangle(bounds, (optionsArg.layerStyles as any));

    // Bind popup message
    if (typeof (popup) === 'string') {
      rectangle.bindPopup(popup, optionsArg.popupOptions);
    }

    // Add rectangle to map
    this.addLayer(id, rectangle, hidden, showInMenu, menuLabel);

    return rectangle;
  }

  /**
   * Adds a circle to the map.
   * @param id
   *          Unique identifier.
   * @param latitude
   *          Center latitude.
   * @param longitude
   *          Center longitude.
   * @param radius
   *          Radius in pixels.
   * @param options
   *          (optional) Object with options (http://leafletjs.com/reference.html#path-options).
   * @param popup
   *          (optional) Pop up message (accepts HTML code).
   * @param hidden
   *          (optional) Set this property to true to do not show the layer.
   * @param showInMenu
   *          (optional) Set to 'base' or 'overlay' to appear in menu.
   * @param menuLabel
   *          (optional) Label to identify this layer in the menu.
   * @return Added circle.
   */
  addCircle(id, latitude, longitude, radius, optionsArg: OMapLayerOptions = {}, popup, hidden, showInMenu, menuLabel) {
    optionsArg = optionsArg ? optionsArg : {};
    // Create new circle
    const circle = new L.Circle([latitude, longitude], radius, (optionsArg.layerStyles as any));

    // Bind popup message
    if (typeof (popup) === 'string') {
      circle.bindPopup(popup, optionsArg.popupOptions);
    }

    // Add circle to map
    this.addLayer(id, circle, hidden, showInMenu, menuLabel);

    return circle;
  }

  /**
   * Adds a layer group to the map.
   * @param id
   *          Unique identifier.
   * @param layers
   *          (optional) Array with layers of the group.
   * @param hidden
   *          (optional) Set this property to true to do not show the layer.
   * @param showInMenu
   *          (optional) Set to 'base' or 'overlay' to appear in menu.
   * @param menuLabel
   *          (optional) Label to identify this layer in the menu.
   * @return Added layer group.
   */
  addLayerGroup(id, layers, hidden, showInMenu, menuLabel) {
    // Create new layer group
    const layerGroup = L.layerGroup(layers);

    // Add layer group to map
    this.addLayer(id, layerGroup, hidden, showInMenu, menuLabel);

    return layerGroup;
  }

  /**
   * Adds a extended layer group that also has mouse events (propagated from members of the group) and a shared
   * bindPopup method.
   * @param id
   *          Unique identifier.
   * @param layers
   *          (optional) Array with layers of the group.
   * @param popup
   *          (optional) Pop up message (accepts HTML code).
   * @param hidden
   *          (optional) Set this property to true to do not show the layer.
   * @param showInMenu
   *          (optional) Set to 'base' or 'overlay' to appear in menu.
   * @param menuLabel
   *          (optional) Label to identify this layer in the menu.
   * @return Added layer group.
   */
  addFeatureGroup(id, layers, popup, hidden, showInMenu, menuLabel) {
    // Create new feature group
    const featureGroup = L.featureGroup(layers);

    // Bind popup message
    if (typeof (popup) === 'string') {
      featureGroup.bindPopup(popup, this.popupOptions);
    }

    // Add feature group to map
    this.addLayer(id, featureGroup, hidden, showInMenu, menuLabel);

    return featureGroup;
  }

  /**
   * Adds a GeoJSON layer. Allows to parse GeoJSON data and display it on the map. Extends FeatureGroup.
   * @param id
   *          Unique identifier.
   * @param data
   *          (optional) GeoJSON data (http://geojson.org/geojson-spec.html).
   * @param options
   *          (optional) Object with options (http://leafletjs.com/reference.html#geojson-options).
   * @param popup
   *          (optional) Pop up message (accepts HTML code).
   * @param hidden
   *          (optional) Set this property to true to do not show the layer.
   * @param showInMenu
   *          (optional) Set to 'base' or 'overlay' to appear in menu.
   * @param menuLabel
   *          (optional) Label to identify this layer in the menu.
   * @return Added GeoJSON layer.
   */
  public addGeoJSON(id, data, optionsArg: OMapLayerOptions = {}, popup, hidden, showInMenu, menuLabel, contextmenu): L.GeoJSON {
    optionsArg = optionsArg ? optionsArg : {};
    // Right now overrides 'onEachFeature' method. In the future try to concatenate with possible user method.
    const iconOptions = optionsArg.iconOptions;
    let customIconFromProps: string;
    if (iconOptions) {
      customIconFromProps = iconOptions.iconFromProperties;
      delete iconOptions.iconFromProperties;
    }
    const self = this;
    const geoJson = L.geoJSON(data, {
      pointToLayer: (feature, latlng) => {
        optionsArg.layerOptions = optionsArg.layerOptions ? optionsArg.layerOptions : {};
        if (customIconFromProps && feature && feature.properties[customIconFromProps]) {
          iconOptions.iconUrl = feature.properties[customIconFromProps];
        }
        optionsArg.layerOptions.icon = new L.Icon(iconOptions);
        return (L as any).marker(latlng, optionsArg.layerOptions);
      },
      style: geoJsonFeature => {
        return (MapServiceUtils.retrieveGeoJSONStyles(geoJsonFeature, optionsArg.layerStyles) as any);
      },
      onEachFeature: (feature, layer) => {
        if (contextmenu) {
          if (contextmenu.callback) {
            contextmenu['contextmenuItems'] = self.parseContextmenuItems(contextmenu.callback(layer));
          }

          (layer as any).bindContextMenu({
            contextmenu: true,
            contextmenuItems: contextmenu['contextmenuItems'],
            contextmenuWidth: contextmenu['contextmenuWidth'],
            contextmenuInheritItems: false
          });
        }

        if (popup && Object.keys(feature.properties).length > 0 /*&& Util.isGeoJSONLayer(layer)*/) {
          try {
            (<L.GeoJSON>layer).bindPopup('', optionsArg.popupOptions).on('popupopen', (e: any) => {
              const txt = this.popupTemplate(popup, feature.properties);
              e.popup.setContent(txt);
            });
          } catch (error) {
            console.log(error);
          }
        }
      }
    });

    // Add GeoJSON layer to map
    this.addLayer(id, geoJson, hidden, showInMenu, menuLabel);

    // // Add MarkerCluster to layer
    // let markers = (<any>L).markerClusterGroup();
    // markers.addLayer(geoJson);
    // // this.map.addLayer(markers);
    // this.addLayer(id, markers, hidden, showInMenu, menuLabel);
    return geoJson;
  }

  parseContextmenuItems(items: Array<any>): Array<any> {
    return items.map((element) => {
      const item = new Object();
      if (element instanceof Object) {
        // label: The label to use for the menu item (required).
        if (element.hasOwnProperty('label')) {
          item['text'] = this.translateMapService.get(element.label);
        }
        // icon: Url for a 16x16px icon to display to the left of the label.
        if (element.hasOwnProperty('icon') && element.icon) {
          item['icon'] = element.icon;
        }
        // iconCls: A CSS class which sets the background image for the icon (exclusive of the icon option).
        if (element.hasOwnProperty('iconCls') && element.iconCls) {
          item['iconCls'] = element.iconCls;
        }
        // callback:A callback function to be invoked when the menu item is clicked.
        // The callback is passed an object with properties identifying the location the menu was opened at:
        // latlng, layerPoint and containerPoint.
        if (element.hasOwnProperty('callback') && element.callback) {
          item['callback'] = element.callback;
        }
        if (element.hasOwnProperty('index') && element.index) {
          item['index'] = element.index;
        }
        // If true a separator will be created instead of a menu item.
        if (element.hasOwnProperty('separator') && element.separator) {
          item['separator'] = element.separator;
        }
        return item;
      } else {
        return element;
      }
    });
  }

  popupTemplate(str, data) {
    const templateRe = /\{ *([\w_\-]+) *\}/g;
    return str.replace(templateRe, (strV, key) => {
      let value = data[key];
      if (value === undefined) {
        value = '';
      } else if (typeof value === 'function') {
        value = value(data);
      }
      return value;
    });
  }

}
