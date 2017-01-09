import { Injectable, EventEmitter } from '@angular/core';
import { Util } from '../utils';
import { BaseLayerDefault, BaseLayerCollection } from '../core';
import * as L from 'leaflet';
import { Map } from 'leaflet';
require('leaflet-providers');
//import { MarkerCluster } from 'leaflet.markercluster';
import { MapServiceUtils } from './MapServiceUtils';

const LAYERS_CONTROL_ID: string = 'layers';

@Injectable()
export class MapService {
	static DEFAULT_BASE_MAP: string = 'OpenStreetMap.HOT';
	map: Map;
	layers: Object = {};
	controls: Object = {};
	baseLayers: BaseLayerCollection = new BaseLayerCollection();
	overlayMaps: Object = {};
	iconTypes: Object = {};

	public baseLayerSelected: EventEmitter<any> = new EventEmitter();

	disableMouseEvent(tag: string) {
		var html = L.DomUtil.get(tag);

		L.DomEvent.disableClickPropagation(html);
		L.DomEvent.on(html, 'mousewheel', L.DomEvent.stopPropagation);
	};

	/**
	 * Gets or creates the map
	 * @param  {string} id Id of the map
	 * @param  {L.Map.MapOptions} options Leaflet option for the map
	 */
	getMap(id?: string, options?: L.Map.MapOptions): Map {
		if (!!id && !this.map) {
			this.map = new L.Map(id, options);
		}
		return this.map;
	}

	/**
	 * Sets center of map.
	 * @param  {number} latitude Center latitude.
	 * @param  {number} longitude  Center longitude.
	 */
	setCenter(latitude: number, longitude: number) {
		this.map.setView([latitude, longitude]);
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
	 * @param  {number} zoom  Zoom value
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
			//TODO   menuLabel = I18n.translate(menuLabel.trim());
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
					this.controls[LAYERS_CONTROL_ID] = L.control.layers(null, this.overlayMaps).addTo(this.map);
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

	/**
	 * Configures default base layers of the map
	 * @param baseLayerIds Array of base layer identifiers ('OpenStreetMap' | 'Esri' | 'CartoDB' ...)
	 *	@see https://github.com/leaflet-extras/leaflet-providers#providers
	 */
	configureBaseLayers(baseLayerIds: Array<string>) {
		if (baseLayerIds && baseLayerIds.length > 0) {
			baseLayerIds.forEach((id, index) => {
				if (!this.baseLayers.contains(id)) {
					let bl = MapServiceUtils.createDefaultBaseLayer(id, index === 0);
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
		let l = this.baseLayers.getTileLayer(id);
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
		let lM = this.baseLayers.getLayersMap();
		this.clearBaseLayers();
		this.controls[LAYERS_CONTROL_ID] = L.control.layers(lM).addTo(this.getMap());
	}

	/**
	 * Deletes all base layers.
	 */
	clearBaseLayers(): void {
		let lM = this.baseLayers.getLayersMap();
		for (var layerId in lM) {
			if (lM.hasOwnProperty(layerId)) {
				let layer = this.baseLayers.getTileLayer(layerId);
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
		var success = false;
		var layer;
		if (this.controls[LAYERS_CONTROL_ID]) {
			if ((typeof (this.layers[id]) === 'string')) {
				var menuLabel = this.layers[id];
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
		for (var layerId in this.layers) {
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
			let menuLabel = this.layers[id];
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
		var icon = null;
		if (type) {
			var iconType = this.iconTypes[type];
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
		var tileLayer = null;

		//TODO leaflet-providers library does not have typings (d.ts) for using .provider

		// try {
		//   // First, search into known providers
		//   tileLayer = L.tileLayer.provider(template, options);
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
	addTileLayerWMS(id, baseUrl, options, hidden, showInMenu, menuLabel) {
		// Create new WMS tile layer
		var tileLayerWMS = new L.TileLayer.WMS(baseUrl, options);

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
	addMarker(id, latitude, longitude, options, popup, hidden, showInMenu, menuLabel) {
		// Create new marker
		let latLng = new L.LatLng(latitude, longitude);
		var marker = L.marker(latLng, options);

		// Bind popup message
		if (typeof (popup) === 'string') {
			marker.bindPopup(popup);
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
	addImageOverlay(id, url, left, bottom, right, top, options, popup, hidden, showInMenu,
		menuLabel) {
		// Create new image overlay
		let bounds = new L.LatLngBounds([[bottom, left], [top, right]]);
		var image = new L.ImageOverlay(url, bounds, options);

		// Bind popup message
		if (typeof (popup) === 'string') {
			//TODO image.bindPopup(popup);
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
	addPolyline(id, points, options, popup, hidden, showInMenu, menuLabel) {
		// Create new polyline
		var polyline = new L.Polyline(points, options);

		// Bind popup message
		if (typeof (popup) === 'string') {
			polyline.bindPopup(popup);
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
	addMultiPolyline(id, points, options, popup, hidden, showInMenu, menuLabel) {
		// Create new multi-polyline
		var multiPolyline = new L.MultiPolyline(points, options);

		// Bind popup message
		if (typeof (popup) === 'string') {
			multiPolyline.bindPopup(popup);
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
	addPolygon(id, points, options, popup, hidden, showInMenu, menuLabel) {
		// Create new polygon
		var polygon = new L.Polygon(points, options);

		// Bind popup message
		if (typeof (popup) === 'string') {
			polygon.bindPopup(popup);
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
	addMultiPolygon(id, points, options, popup, hidden, showInMenu, menuLabel) {
		// Create new multi-polygon
		var multiPolygon = new L.MultiPolygon(points, options);

		// Bind popup message
		if (typeof (popup) === 'string') {
			multiPolygon.bindPopup(popup);
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
	addRectangle(id, left, bottom, right, top, options, popup, hidden, showInMenu, menuLabel) {
		// Create new rectangle
		let bounds = new L.LatLngBounds([[bottom, left], [top, right]]);
		var rectangle = new L.Rectangle(bounds, options);

		// Bind popup message
		if (typeof (popup) === 'string') {
			rectangle.bindPopup(popup);
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
	addCircle(id, latitude, longitude, radius, options, popup, hidden, showInMenu, menuLabel) {
		// Create new circle
		var circle = new L.Circle([latitude, longitude], radius, options);

		// Bind popup message
		if (typeof (popup) === 'string') {
			circle.bindPopup(popup);
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
		var layerGroup = L.layerGroup(layers);

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
		var featureGroup = L.featureGroup(layers);

		// Bind popup message
		if (typeof (popup) === 'string') {
			featureGroup.bindPopup(popup);
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
	addGeoJSON(id, data, options: Object = {}, popup, hidden, showInMenu, menuLabel) {
		// Create new GeoJSON layer
		let d = data ? data : null;

		//Right now overrides 'onEachFeature' method. In the future try to concatenate with possible user method.
		var customIcon = null;
		if (options['icon']) {
			customIcon = new L.Icon({
				iconUrl: options['icon']
			});
		}

		var geoJson = L.geoJson(d, {
			pointToLayer: function (feature, latlng) {
				if (customIcon) {
					return L.marker(latlng, {
						icon: customIcon
					});
				} else {
					// Default marker icon
					return L.marker(latlng);
				}
			},
			style : function (geoJsonFeature) {
				return MapServiceUtils.retrieveGeoJSONStyles(geoJsonFeature, options);
			},
			onEachFeature: function (feature, layer) {
				if (popup && Object.keys(feature.properties).length > 0
          /*&& Util.isGeoJSONLayer(layer)*/) {
					try {
						let txt = L.Util.template(popup, feature.properties);
						(<L.GeoJSON>layer).bindPopup(txt);
					} catch (error) {
						console.log(error);
					}

				}
			}
		});

		// Add GeoJSON layer to map
		this.addLayer(id, geoJson, hidden, showInMenu, menuLabel);

		/*/ Add MarkerCluster to layer
		let markers = (<any> L).markerClusterGroup();
		markers.addLayer(geoJson);
		this.map.addLayer(markers);*/

		return geoJson;
	}

}
