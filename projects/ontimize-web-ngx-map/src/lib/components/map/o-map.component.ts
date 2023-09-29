import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Injector,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import * as L from 'leaflet';
import { BooleanInputConverter } from 'ontimize-web-ngx';
import { Subscription } from 'rxjs';

import { OMapLayerGroup } from '../../interfaces/o-map-layer-group.interface';
import { OMapWorkspace } from '../../interfaces/o-map-workspace.interface';
import { LayerConfigurationContextmenu } from '../../models/LayerConfiguration.class';
import { GeocodingService } from '../../services/GeocodingService';
import { MapService } from '../../services/MapService';
import { TranslateMapService } from '../../services/TranslateMapService';
import { Util } from '../../utils/util';
import type { OMapBaseLayerComponent } from '../map-base-layer/o-map-base-layer.component';
import { OMapCrsComponent } from '../map-crs/o-map-crs.component';
import { OMapLayerContainerComponent } from '../map-layer-container/o-map-layer-container.component';
import { OMarkerComponent } from '../marker/o-marker.component';
import { OMapWSearch } from './o-map-w-search.class';
import { OMapBase } from './o-map-base.class';

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
  'showWorkspaceMenu: show-workspace-menu',
  'contextMenu : layer-contextmenu',

  'queryFeaturesInBounds: query-features-in-bounds'
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
  'onZoomStart',
  'onZoomEnd',
  'onZoom',

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
  providers: [MapService, GeocodingService, { provide: OMapBase, useExisting: forwardRef(() => OMapComponent) }],
  inputs: OMapComponent.DEFAULT_INPUTS,
  outputs: OMapComponent.DEFAULT_OUTPUTS,
  templateUrl: './o-map.component.html',
  styleUrls: ['./o-map.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('navigatorState', [
      state('closed', style({
        position: 'absolute',
        left: '0px'
      })),
      state('open', style({
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
export class OMapComponent extends OMapWSearch implements OnInit, AfterViewInit, OnDestroy {

  public static DEFAULT_INPUTS = DEFAULT_INPUTS;
  public static DEFAULT_OUTPUTS = DEFAULT_OUTPUTS;

  @ViewChild(OMarkerComponent) markerComponent: OMarkerComponent;
  @ViewChild('sidenav') sideNavCmp: MatSidenav;
  @ViewChildren('mainBaseLayerGroup') mapBaseLayerGroup: Array<OMapBaseLayerComponent>;
  @ViewChild('mainLayerGroup') mapLayerGroup: OMapLayerGroup;
  @ViewChild('oMapWorkspace') mapWorkspace: OMapWorkspace;
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
  @BooleanInputConverter()
  public showBaseLayersMenu: boolean = true;
  @BooleanInputConverter()
  public showLayersMenu: boolean = true;
  @BooleanInputConverter()
  public showWorkspaceMenu: boolean = true;
  @BooleanInputConverter()
  public queryFeaturesInBounds: boolean = true;

  mapId: string;
  protected baseLayerIds: Array<string>;
  protected tabGroupContainer: MatTabGroup;
  protected tabContainer: MatTab;
  protected tabGroupSubscription: Subscription;
  protected _waitForBuild: boolean = false;
  protected _searchControl: boolean = true;
  protected _searchControlButtonVisible: boolean = true;
  protected crsComponent: OMapCrsComponent;
  protected _contextmenu: any;

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
      current: parseInt(this.sZoom, 10),
      min: parseInt(this.sMinZoom, 10),
      max: parseInt(this.sMaxZoom, 10),
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
    const self = this;
    this.tabGroupSubscription = this.tabGroupContainer.selectedTabChange.subscribe((evt) => {
      const interval = setInterval(function () { timerCallback(evt.tab); }, 250);
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

    const mapOptions = {
      zoomControl: false,
      center: new L.LatLng(this.getCenter().latitude, this.getCenter().longitude),
      zoom: this.zoom.current || 12,
      minZoom: this.zoom.min || 4,
      maxZoom: this.zoom.max || 19,
      layers: this.mapService.baseLayers.getLayersArray()
    };
    // Added contextmenu option in mapOptions
    if (this.contextMenu) {
      mapOptions['contextmenu'] = true;
      mapOptions['contextmenuWidth'] = this.contextMenu.contextmenuWidth;
      mapOptions['contextmenuItems'] = this.contextMenu.contextmenuItems;
    }

    if (this.crsComponent) {
      const crsConf = this.crsComponent.getCRS();
      if (crsConf) {
        mapOptions['crs'] = crsConf;
      }
    }

    const map = this.mapService.getMap(this.mapId, mapOptions);

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
      value = this.sideNavCmp.opened ? 'open' : 'closed';
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
      result = this.sideNavCmp._getWidth();
    }
    return result + 'px';
  }

  set contextMenu(val: LayerConfigurationContextmenu) {
    if (!val) {
      return;
    }
    this._contextmenu = val;
    if (val.defaultContextmenuItems) {
      this._contextmenu.contextmenuItems =
        this._contextmenu.contextmenuItems.concat(this.getMapService().defaultContextMenu.contextmenuItems);
    }
    if (!this._contextmenu.contextmenuItems) {
      return;
    }
    this._contextmenu.contextmenuItems = this.getMapService().parseContextmenuItems(this._contextmenu.contextmenuItems);
  }

  get contextMenu(): LayerConfigurationContextmenu {
    return this._contextmenu;
  }
}
