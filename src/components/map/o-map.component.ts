import { Component, Injector, ElementRef, ViewChild, ViewChildren, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MdIconRegistry, MdSidenav, MdTabGroup, MdTab } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { OMapBaseLayerComponent, OMapLayerGroupComponent, OMapWorkspaceComponent } from '../../components';
import { OMarkerComponent } from '../marker/o-marker.component';
import { MapService, GeocodingService, TranslateMapService } from '../../services';
import { Util } from '../../utils';
import { OMapWSearch } from './o-map-w-search.class';
import * as L from 'leaflet';
import { OMapCrsComponent } from '../map-crs/o-map-crs.component';

//TODO import {Control} from 'leaflet-draw';

const DEFAULT_INPUTS = [
  'sAttr: attr',
  'sCenter: center',
  'sZoom: zoom',
  'sMinZoom: min-zoom',
  'sMaxZoom: max-zoom',
  'sZoomControl: zoom-control',
  'sSearchControl: search-control',
  'sSearchControlButtonVisible: search-control-button-visible',
  'sDrawControl: draw-control',
  'sLayerPanelVisible: layer-panel-visible',

  // Array of provider Id's separated by ';'. The providers are extracted from
  // https://github.com/leaflet-extras/leaflet-providers#providers
  'sBaseLayerIds: base-layer-ids'
];

const DEFAULT_OUTPUTS = [
  'onToggleWSLayerSelected',
  'onToggleWSLayerVisibility',
  'onToggleWSLayerInWS',

  'onClick',
  'onDrag',
  'onMove',
  'onMoveEnd',
  'onZoomLevelsChange',

  'onDrawEvent',

  'onDrawCreated',
  'onDrawEdited',
  'onDrawDeleted',
  'onDrawDrawStart',
  'onDrawDrawstop',
  'onDrawvertex',
  'onDrawEditStart',
  'onDrawEditMove',
  'onDrawEditResize',
  'onDrawEditvertex',
  'onDrawEditStop',
  'onDrawDeleteStart',
  'onDrawDeleteStop'
];

@Component({
  selector: 'o-map',
  providers: [MapService, GeocodingService, MdIconRegistry],
  inputs: OMapComponent.DEFAULT_INPUTS,
  outputs: OMapComponent.DEFAULT_OUTPUTS,
  templateUrl: './o-map.component.html',
  styleUrls: ['./o-map.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OMapComponent extends OMapWSearch {

  public static DEFAULT_INPUTS = DEFAULT_INPUTS;
  public static DEFAULT_OUTPUTS = DEFAULT_OUTPUTS;

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
  public sSearchControlButtonVisible: string;
  public sDrawControl: string;
  public sLayerPanelVisible: string;
  public sBaseLayerIds: string;

  protected mapId: string;
  protected baseLayerIds: Array<string>;
  protected mdTabGroupContainer: MdTabGroup;
  protected mdTabContainer: MdTab;
  protected mdTabGroupSubscription: Subscription;
  protected _waitForBuild: boolean = false;
  protected _searchControlButtonVisible: boolean = true;
  protected crsComponent: OMapCrsComponent;

  constructor(
    protected elRef: ElementRef,
    protected injector: Injector
  ) {
    super();
    this.mapService = this.injector.get(MapService);
    this.translateMapService = this.injector.get(TranslateMapService);
    try {
      this.mdTabGroupContainer = this.injector.get(MdTabGroup);
      this.mdTabContainer = this.injector.get(MdTab);
      if (this.mdTabGroupContainer && this.mdTabContainer) {
        this.waitForBuild = true;
      }
    } catch (error) {
      // Do nothing due to not always is contained on tab.
    }
  }

  public getInjector(): Injector {
    return this.injector;
  }

  ngOnInit() {
    if (!this.waitForBuild) {
      this.initialize();
    } else {
      this.waitForBuild = true;
    }
  }

  ngAfterViewInit() {
    if (this.waitForBuild && !this.mdTabContainer.content.isAttached) {
      this.registerTabGroupListener();
    } else if (this.waitForBuild) {
      this.initialize();
    }
    if (!this.mapService.map) {
      // console.debug('Initializing map...');
      this.configureMap();
    }
    if (this.drawDefaultControl && !this.drawControlComponent) {
      this.configureDefaultDrawControl(this.mapService.getMap());
    }
    this.onMapReady().emit(this);
  }

  initialize() {
    this.mapId = this.sAttr ? this.sAttr : 'map_' + new Date().getTime();
    this.elRef.nativeElement.querySelector('.leaflet-map-container').setAttribute('id', this.mapId);
    this.zoom = {
      current: parseInt(this.sZoom),
      min: parseInt(this.sMinZoom),
      max: parseInt(this.sMaxZoom),
      control: Util.parseBoolean(this.sZoomControl, true)
    };
    this.searchControl = Util.parseBoolean(this.sSearchControl, true);
    this.isSearchControlButtonVisible = Util.parseBoolean(this.sSearchControlButtonVisible, true);
    this.drawDefaultControl = Util.parseBoolean(this.sDrawControl, false);
    this.isSidenavVisible = Util.parseBoolean(this.sLayerPanelVisible, false);

    this.baseLayerIds = Util.parseArray(this.sBaseLayerIds);
    this.mapService.configureBaseLayers(this.baseLayerIds);
  }

  registerCRSComponent(crsComp: OMapCrsComponent) {
    this.crsComponent = crsComp;
  }

  registerTabGroupListener() {
    var self = this;
    this.mdTabGroupSubscription = this.mdTabGroupContainer.selectChange.subscribe((evt) => {
      var interval = setInterval(function () { timerCallback(evt.tab); }, 250);
      function timerCallback(tab: MdTab) {
        if (tab && tab.content.isAttached) {
          clearInterval(interval);
          if (tab === self.mdTabContainer) {
            self.mdTabGroupSubscription.unsubscribe();
            self.initialize();
            self.waitForBuild = false;
          }
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.mdTabGroupSubscription) {
      this.mdTabGroupSubscription.unsubscribe();
    }
  }

  get waitForBuild(): boolean {
    return this._waitForBuild;
  }

  set waitForBuild(val: boolean) {
    this._waitForBuild = val;
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

  public getText(text: string): string {
    if (this.translateMapService) {
      return this.translateMapService.get(text);
    }
    return text;
  }

  protected configureMap() {
    L.Icon.Default.imagePath = './assets/';

    let mapOptions = {
      zoomControl: false,
      center: new L.LatLng(this.getCenter().latitude, this.getCenter().longitude),
      zoom: this.zoom.current || 12,
      minZoom: this.zoom.min || 4,
      maxZoom: this.zoom.max || 19,
      layers: this.mapService.baseLayers.getLayersArray()
    };

    if (this.crsComponent) {
      let crsConf = this.crsComponent.getCRS();
      if (crsConf) {
        mapOptions['crs'] = crsConf;
      }
    }

    let map = this.mapService.getMap(this.mapId, mapOptions);

    L.control.scale().addTo(map);
    if (this.zoom.control) {
      L.control.zoom({ position: 'bottomright' }).addTo(map);
    }

    this.onMapConfigured().emit(true);
  }

  get isSearchControlButtonVisible(): boolean {
    return this._searchControlButtonVisible;
  }

  set isSearchControlButtonVisible(val: boolean) {
    this._searchControlButtonVisible = val;
  }

}
