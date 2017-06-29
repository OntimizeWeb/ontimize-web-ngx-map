import { Component, Injector, ElementRef, OnInit, ViewChild, ViewChildren, EventEmitter } from '@angular/core';
import { MdIconRegistry, MdSidenav } from '@angular/material';
import { OMapBaseLayerComponent, OMapLayerGroupComponent, OMapWorkspaceComponent } from '../../components';
import { OMarkerComponent } from '../marker/o-marker.component';
import { MapService, GeocodingService, TranslateMapService } from '../../services';
import { Feature } from '../../core';
import { Util } from '../../utils';
import { OMapWSearch } from './o-map-w-search.class';

import * as L from 'leaflet';
//TODO import {Control} from 'leaflet-draw';


const DEFAULT_INPUTS = [
	'sAttr: attr',
	'sCenter: center',
	'sZoom: zoom',
	'sMinZoom: min-zoom',
	'sMaxZoom: max-zoom',
	'sZoomControl: zoom-control',
	'sSearchControl: search-control',
	'sDrawControl: draw-control',
	'sLayerPanelVisible: layer-panel-visible',

	// Array of provider Id's separated by ';'. The providers are extracted from
	// https://github.com/leaflet-extras/leaflet-providers#providers
	'sBaseLayerIds: base-layer-ids'
];

@Component({
	selector: 'o-map',
	moduleId: module.id,
	providers: [MapService, GeocodingService, MdIconRegistry],
	inputs: [
		...OMapComponent.DEFAULT_INPUTS
	],
	outputs: [
		'onToggleWSLayerSelected',
		'onToggleWSLayerVisibility',
		'onToggleWSLayerInWS'
	],
	templateUrl: '/map/o-map.component.html',
	styleUrls: ['/map/o-map.component.css']
})
export class OMapComponent extends OMapWSearch implements OnInit {

	public static DEFAULT_INPUTS = DEFAULT_INPUTS;

	@ViewChild(OMarkerComponent) markerComponent: OMarkerComponent;
	@ViewChild('sidenav') sideNavCmp: MdSidenav;
	@ViewChildren('mainBaseLayerGroup') mapBaseLayerGroup: Array<OMapBaseLayerComponent>;
	@ViewChild('mainLayerGroup') mapLayerGroup: OMapLayerGroupComponent;
	@ViewChild('oMapWorkspace') mapWorkspace: OMapWorkspaceComponent;

	onToggleWSLayerSelected: EventEmitter<Object> = new EventEmitter<Object>();
	onToggleWSLayerVisibility: EventEmitter<Object> = new EventEmitter<Object>();
	onToggleWSLayerInWS: EventEmitter<Object> = new EventEmitter<Object>();

	public set sCenter(center: string) {
		this.setCenter(center);
	}
	public sAttr: string;
	public sZoom: string;
	public sMinZoom: string;
	public sMaxZoom: string;
	public sZoomControl: string;
	public sSearchControl: string;
	public sDrawControl: string;
	public sLayerPanelVisible: string;
	public sBaseLayerIds: string;

	protected mapId: string;
	protected baseLayerIds: Array<string>;

	constructor(
		protected elRef: ElementRef,
		protected injector: Injector
	) {
		super();
		this.mapService = this.injector.get(MapService);
		this.translateMapService = this.injector.get(TranslateMapService);
	}

	public getInjector(): Injector {
		return this.injector;
	}

	ngOnInit() {
		this.mapId = this.sAttr ? this.sAttr : 'map_' + new Date().getTime();
		this.elRef.nativeElement.querySelector('.leaflet-map-container').setAttribute('id', this.mapId);
		this.zoom = {
			current: parseInt(this.sZoom),
			min: parseInt(this.sMinZoom),
			max: parseInt(this.sMaxZoom),
			control: Util.parseBoolean(this.sZoomControl, true)
		};
		this.searchControl = Util.parseBoolean(this.sSearchControl, true);
		this.drawControl = Util.parseBoolean(this.sDrawControl, false);
		this.isSidenavVisible = Util.parseBoolean(this.sLayerPanelVisible, false);

		this.baseLayerIds = Util.parseArray(this.sBaseLayerIds);
		this.mapService.configureBaseLayers(this.baseLayerIds);

		if (!this.mapService.map) {
			console.debug('Initializing map...');
			this.configureMap();
		}
	}

	ngAfterViewInit() {
		// this.toggleSidenav();
		// Enable search on workspace?
		//this.mapSearchers.push(this.mapWorkspace);
	}

	public onWSLayerSelected(event) {
		this.onToggleWSLayerSelected.emit(event);
	}

	public onWSLayerVisibilityToggled(event) {
		this.onToggleWSLayerVisibility.emit(event);
	}

	public onWSLayerInWSToggled(event) {
		this.onToggleWSLayerInWS.emit(event);
	}

	protected getText(text: string): string {
		if (this.translateMapService) {
			return this.translateMapService.get(text);
		}
		return text;
	}

	protected configureMap() {
		L.Icon.Default.imagePath = './vendor/leaflet/dist/images/';

		let mapOptions = {
			zoomControl: false,
			center: new L.LatLng(this.getCenter().latitude, this.getCenter().longitude),
			zoom: this.zoom.current || 12,
			minZoom: this.zoom.min || 4,
			maxZoom: this.zoom.max || 19,
			layers: this.mapService.baseLayers.getLayersArray(),
			drawControl: false
		};

		let map = this.mapService.getMap(this.mapId, mapOptions);

		L.control.scale().addTo(map);
		if (this.zoom.control) {
			L.control.zoom({ position: 'bottomright' }).addTo(map);
		}

		if (this.drawControl) {
			//TODO  this.configureDrawControl(map);
		}

		this.mapConfiguration.emit(true);
	}

}

