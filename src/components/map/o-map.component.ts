import { Component, Injector, ElementRef, ViewChild, ViewChildren, EventEmitter, ViewEncapsulation, ContentChildren, QueryList } from '@angular/core';
import { MatSidenav, MatTabGroup, MatTab } from '@angular/material';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subscription } from 'rxjs';
import { InputConverter } from 'ontimize-web-ngx';
import * as L from 'leaflet';
import { MapService, GeocodingService, TranslateMapService } from '../../services';
import { Util } from '../../utils';
import { OMarkerComponent } from '../marker/o-marker.component';
import { OMapBaseLayerComponent } from '../map-base-layer/o-map-base-layer.component';
import { OMapLayerGroupComponent } from '../map-layer-group/o-map-layer-group.component';
import { OMapWorkspaceComponent } from '../map-workspace/o-map-workspace.component';
import { OMapLayerContainerComponent } from '../map-layer-container/o-map-layer-container.component';
import { OMapCrsComponent } from '../map-crs/o-map-crs.component';
import { OMapWSearch } from './o-map-w-search.class';
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
  'sBaseLayerIds: base-layer-ids',

  'sidenavMode: sidenav-mode',

  'showBaseLayersMenu: show-base-layers-menu',
  'showLayersMenu: show-layers-menu',
  'showWorkspaceMenu: show-workspace-menu'
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
  moduleId: module.id,
  selector: 'o-map',
  providers: [MapService, GeocodingService],
  inputs: OMapComponent.DEFAULT_INPUTS,
  outputs: OMapComponent.DEFAULT_OUTPUTS,
  templateUrl: './o-map.component.html',
  styleUrls: ['./o-map.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('navigatorState', [
      state('collapsed', style({
        position: 'absolute',
        left: '0px'
      })),
      state('expanded', style({
        position: 'absolute',
        left: '{{navigatorExpandedPosition}}'
      }), { params: { navigatorExpandedPosition: '0px' } }),
      transition('collapsed <=> expanded', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)'))
    ])
  ],
  host: {
    '[class.o-map]': 'true'
  }
})
export class OMapComponent extends OMapWSearch {

  public static DEFAULT_INPUTS = DEFAULT_INPUTS;
  public static DEFAULT_OUTPUTS = DEFAULT_OUTPUTS;

  @ViewChild(OMarkerComponent) markerComponent: OMarkerComponent;
  @ViewChild('sidenav') sideNavCmp: MatSidenav;
  @ViewChildren('mainBaseLayerGroup') mapBaseLayerGroup: Array<OMapBaseLayerComponent>;
  @ViewChild('mainLayerGroup') mapLayerGroup: OMapLayerGroupComponent;
  @ViewChild('oMapWorkspace') mapWorkspace: OMapWorkspaceComponent;
  @ViewChild('navigatorContainer') navigatorContainer: ElementRef;
  @ContentChildren(OMapLayerContainerComponent)
  protected mapLayerContainerQueryList: QueryList<OMapLayerContainerComponent>;
  mapLayerContainerComponent: OMapLayerContainerComponent;

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
  private _sidenavMode: 'over' | 'push' | 'side' = 'over';
  get sidenavMode(): 'over' | 'push' | 'side' { return this._sidenavMode; }
  set sidenavMode(value: 'over' | 'push' | 'side') {
    this._sidenavMode = value;
  }
  @InputConverter()
  public showBaseLayersMenu: boolean = true;
  @InputConverter()
  public showLayersMenu: boolean = true;
  @InputConverter()
  public showWorkspaceMenu: boolean = true;

  mapId: string;
  protected baseLayerIds: Array<string>;
  protected tabGroupContainer: MatTabGroup;
  protected tabContainer: MatTab;
  protected tabGroupSubscription: Subscription;
  protected _waitForBuild: boolean = false;
  protected _searchControl: boolean = true;
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
      this.tabGroupContainer = this.injector.get(MatTabGroup);
      this.tabContainer = this.injector.get(MatTab);
      if (this.tabGroupContainer && this.tabContainer) {
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
    if (this.waitForBuild && !this.tabContainer.content.isAttached) {
      this.registerTabGroupListener();
    } else if (this.waitForBuild) {
      this.initialize();
    }
    if (this.mapLayerContainerQueryList && this.mapLayerContainerQueryList.length > 0) {
      this.mapLayerContainerComponent = this.mapLayerContainerQueryList.first;
    }
  }

  initialize() {
    this.mapId = this.sAttr ? this.sAttr : 'map_' + new Date().getTime();
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

    const self = this;
    setTimeout(() => {
      if (!self.mapService.map) {
        // console.debug('Initializing map...');
        self.configureMap();
      }
      if (self.drawDefaultControl && !self.drawControlComponent) {
        self.configureDefaultDrawControl(self.mapService.getMap());
      }
      self.onMapAfterViewInit().emit(self);
      self.onMapReady().next(self);
    }, 0);
  }

  registerCRSComponent(crsComp: OMapCrsComponent) {
    this.crsComponent = crsComp;
  }

  registerTabGroupListener() {
    var self = this;
    this.tabGroupSubscription = this.tabGroupContainer.selectedTabChange.subscribe((evt) => {
      var interval = setInterval(function () { timerCallback(evt.tab); }, 250);
      function timerCallback(tab: MatTab) {
        if (tab && tab.content.isAttached) {
          clearInterval(interval);
          if (tab === self.tabContainer) {
            self.tabGroupSubscription.unsubscribe();
            self.initialize();
            self.waitForBuild = false;
          }
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.tabGroupSubscription) {
      this.tabGroupSubscription.unsubscribe();
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

  get searchControl(): boolean {
    return this._searchControl;
  }

  set searchControl(val: boolean) {
    this._searchControl = val;
  }

  get isSearchControlButtonVisible(): boolean {
    return this._searchControlButtonVisible;
  }

  set isSearchControlButtonVisible(val: boolean) {
    this._searchControlButtonVisible = val;
  }

  get isNavigatorVisible(): boolean {
    return this._searchControl || this._searchControlButtonVisible;
  }

  get navigatorState(): any {
    let value = 'none';
    if (this.sidenavMode === 'over' && this.sideNavCmp) {
      value = this.sideNavCmp.opened ? 'expanded' : 'collapsed';
    }
    return {
      value: value,
      params: {
        navigatorExpandedPosition: this.navigatorExpandedPosition
      }
    };
  }

  get navigatorExpandedPosition(): string {
    let result = 0;
    if (this.sideNavCmp && this.sideNavCmp.opened) {
      result = this.sideNavCmp._width;
    }
    return result + 'px';
  }
}
