import { EventEmitter } from '@angular/core';
import { Zoom } from '../../interfaces';
import { OMapBaseLayerComponent, OMapLayerComponent } from '../../components';
import { MapService } from '../../services';
import { Center } from '../../core';
import { Util } from '../../utils';
import { TranslateMapService } from '../../services';

const DEFAULT_CENTER = new Center(42.2274519, -8.7236805);

export class OMapBase {
	public zoom: Zoom = { control: true };
	protected translateMapService: TranslateMapService;
	protected mapBaseLayerGroup: Array<OMapBaseLayerComponent> = new Array<OMapBaseLayerComponent>();
	protected mapLayers: Array<OMapLayerComponent> = new Array<OMapLayerComponent>();
	protected mapService: MapService;
	protected mapConfiguration: EventEmitter<any> = new EventEmitter();
	private center: Center;

	/**
	 * Get individual layer
	 * @param {string} layerId - Id of the layer to find
	 */
	public getOMapLayer(layerId: string): OMapLayerComponent {
		return this.mapLayers.filter(layer => layer.layerId === layerId).shift();
	}

	/**
	 * Get all the layers
	 */
	public getOMapLayers(): Array<OMapLayerComponent> {
		return this.mapLayers;
	}

	/**
	 * Add a new layer
	 * ####TODO
	 * - Change to an Add-Or-Update pattern
	 * @param {OMapLayerComponent} layer - The layer to add
	 */
	public addOMapLayer(layer: OMapLayerComponent) {
		this.mapLayers.push(layer);
	}

	/**
	 * Get map configuration service
	 */
	public getMapService(): MapService {
		return this.mapService;
	}

	/**
	 * Get Leaflet map reference
	 **/
	public getLMap(): L.Map {
		return this.getMapService().map;
	}

	/**
	 * Get current center
	 */
	public getCenter(): Center {
		return this.center || DEFAULT_CENTER;
	}

	/**
	 * Set center from a coma separated coordinates 'latitude, longitude' string.
	 * Accepted ',' and ';'
	 * @param {string} sCenter - 'latitude, longitude' string
	 */
	public setCenter(sCenter: string) {
		if (Util.isBlank(sCenter)) {
			this.center = DEFAULT_CENTER;
		} else {
			let coordinates = sCenter.split(/,|;/);
			if (coordinates.length === 2) {
				let latitude = parseFloat(coordinates[0]);
				let longitude = parseFloat(coordinates[1]);
				this.center = new Center(latitude, longitude);
			} else {
				this.center = DEFAULT_CENTER;
			}
		}

		let map = this.getMapService().map;
		if (!Util.isBlank(map)) {
			map.panTo([this.center.latitude, this.center.longitude]);
		}
	}

	/**
	 * @deprecated use getMapService().addMarker
	 */
	public addMarker(id, latitude, longitude, options, popup, hidden, showInMenu, menuLabel) {
		this.mapService.addMarker(id, latitude, longitude, options, popup, hidden, showInMenu, menuLabel);
	}
}
