import {
  Component,
  Injector,
  ElementRef,
  OnInit,
  ViewChild,
  ContentChildren,
  forwardRef,
  ApplicationRef,
  EventEmitter
} from '@angular/core';
import {MdButton} from '@angular2-material/button/button';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {MdSidenav} from '@angular2-material/sidenav';

import {TranslatePipe} from 'ng2-translate/ng2-translate';

import * as L from 'leaflet';
//TODO import {Control} from 'leaflet-draw';

import {
  OMapLayerComponent,
  OMapLayerGroupComponent,
  OMapWorkspaceComponent,
  OMapWorkspaceLayerComponent,
  NavigatorComponent
} from '../../components';
import { MarkerComponent } from '../marker/marker.component';
import {
  MapService,
  GeocodingService,
  EmptyOMapConfigService
} from '../../services';
import {
  IOMapConfigService
} from '../../interfaces';
import {
  Center,
  LayerConfiguration,
  LayerGroupConfiguration,
  OMapLayerGroupsWarehouse,
  Location,
  Feature
} from '../../core';
import {
  Util
} from '../../utils';


const DEFAULT_CENTER = new Center(42.167602, -8.682654);

@Component({
  selector: 'o-map',
  moduleId: module.id,
  providers: [MapService, GeocodingService, MdIconRegistry],
  inputs: [
    'sCenter: center',
    'sZoom: zoom',
    'sMinZoom: min-zoom',
    'sMaxZoom: max-zoom',
    'sZoomControl: zoom-control',
    'sSearchControl: search-control',
    'sDrawControl: draw-control'
  ],
  templateUrl: '/map/o-map.component.html',
  styleUrls: ['/map/o-map.component.css']
})
export class OMapComponent implements OnInit {

  @ViewChild(MarkerComponent)   markerComponent : MarkerComponent;
  @ViewChild('sidenav') sideNavCmp: MdSidenav;
  @ViewChild('mainLayerGroup')  mapLayerGroup   : OMapLayerGroupComponent;
  @ViewChild('oMapWorkspace')   mapWorkspace    : OMapWorkspaceComponent;

  public sCenter: string;
  public sZoom: string;
  public sMinZoom: string;
  public sMaxZoom: string;
  public sZoomControl: string;
  public sSearchControl: string;
  public sDrawControl: string;

  public center: Center;
  public zoom: number;
  public minZoom: number;
  public maxZoom: number;
  public zoomControl: boolean = true;
  public searchControl: boolean = true;
  public drawControl: boolean = false;

  public featureInfo : Array<Feature> = new Array<Feature>();

  private mapLayers: Array<OMapLayerComponent> = new Array<OMapLayerComponent>();
  private mLayerGroupsWarehouse: OMapLayerGroupsWarehouse = new OMapLayerGroupsWarehouse();
  private auxLayerGroupWarehouse: OMapLayerGroupsWarehouse = new OMapLayerGroupsWarehouse();
  private mapService: MapService;
  private geocoder: GeocodingService;

  private isSidenavVisible : boolean = false;

  private _clickEvtEmitter: EventEmitter<any> = new EventEmitter();
  private _dragEvtEmitter: EventEmitter<any> = new EventEmitter();
  private _moveEvtEmitter: EventEmitter<any> = new EventEmitter();
  private _moveEndEvtEmitter: EventEmitter<any> = new EventEmitter();
  private _zoomLevelEvtEmitter: EventEmitter<any> = new EventEmitter();

  constructor(protected elRef: ElementRef,
    protected injector: Injector) {

    this.mapService = this.injector.get(MapService);
    this.geocoder = this.injector.get(GeocodingService);
  }

  public getInjector(): Injector {
    return this.injector;
  }

  ngOnInit() {
    this.zoom = parseInt(this.sZoom);
    this.minZoom = parseInt(this.sMinZoom);
    this.maxZoom = parseInt(this.sMaxZoom);
    this.zoomControl = Util.parseBoolean(this.sZoomControl, true);

    this.searchControl = Util.parseBoolean(this.sSearchControl, true);

    this.drawControl = Util.parseBoolean(this.sDrawControl, false);

    if (!this.mapService.map) {
      console.log('Initializing map...');
      this.configureMap();
      this.bindMapEvents();
    }
  }

  ngAfterViewInit() {
    this.toggleSidenav();
  }


  public addOMapLayerGroupsConfiguration(groups: Array<LayerGroupConfiguration>) {
    if (!groups || groups.length === 0) {
      // nothing to add...
      return;
    }
    groups.forEach(layerGroup => {
      this.addOMapLayerGroupConfiguration(layerGroup);
    });
  }

  public addOMapLayerGroupConfiguration(layerGroup: LayerGroupConfiguration) {
    if (layerGroup) {
      this.auxLayerGroupWarehouse.push(layerGroup);
      if (layerGroup.idParent) {
        this.auxLayerGroupWarehouse.get(layerGroup.idParent).layerGroupsWarehouse.push(layerGroup);
      } else {
         this.mapLayerGroup.mLayerGroupsWarehouse.push(layerGroup);
      }
    }
  }

  public addOMapLayerConfiguration(layer: LayerConfiguration) {
    if (!layer) {
      return;
    }

    if (layer.layerGroupId) {
      this.auxLayerGroupWarehouse.get(layer.layerGroupId).mapLayers.push(layer);
    } else {
      this.mapLayerGroup.mapLayers.push(layer);
    }
  }

  public getOMapLayer(layerId: string): OMapLayerComponent {
    let filtered = this.mapLayers.filter((item: OMapLayerComponent) => {
      if (item.layerId === layerId) {
        return true;
      }
    });
    if (filtered.length === 1) {
      return filtered[0];
    }
    return null;
  }

  public getOMapLayers(): Array<OMapLayerComponent> {
    return this.mapLayers;
  }

  public addOMapLayer(layer: OMapLayerComponent) {
    this.mapLayers.push(layer);
  }

  public getWorkspaceMapLayers(): Array<OMapLayerComponent> {
    if (this.mapWorkspace) {
      return this.mapWorkspace.getMapLayers();
    }
    return [];
  }

  public getWorkspaceSelectedMapLayer(): OMapLayerComponent {
    if (this.mapWorkspace) {
      return this.mapWorkspace.getSelectedMapLayer();
    }
    return undefined;
  }

  public getMapService(): MapService {
    return this.mapService;
  }

  public addMarker(id, latitude, longitude, options, popup, hidden, showInMenu, menuLabel) {
    this.mapService.addMarker(id, latitude, longitude, options, popup, hidden, showInMenu, menuLabel);
  }

  public toggleSidenav() {
    if (this.sideNavCmp) {
      if (this.isSidenavVisible) {
        setTimeout(() => this.sideNavCmp.close(), 0);
      } else {
        setTimeout(() => this.sideNavCmp.open(), 0);
      }
    }
    this.isSidenavVisible = !this.isSidenavVisible;
  }

  protected configureMap() {

    this.center = DEFAULT_CENTER;
    if (this.sCenter) {
      var coordinates = this.sCenter.split(/,|;/);
      if (coordinates.length === 2) {
        let aux: number[] = [];
        for (var i in coordinates) {
          aux[i] = parseFloat(coordinates[i]);
        }
        this.center = new Center(aux[0], aux[1]);
      }
    }

    L.Icon.Default.imagePath = './vendor/leaflet/dist/images/';

    var mapOptions = {
      zoomControl: false,
      center: new L.LatLng(this.center.latitude, this.center.longitude),
      zoom: this.zoom ? this.zoom : 12,
      minZoom: this.minZoom ? this.minZoom : 4,
      maxZoom: this.maxZoom ? this.maxZoom : 19,
      layers: [this.mapService.baseMaps['OpenStreetMap']],
      drawControl: false
    };

    var map = new L.Map('map', mapOptions);
    L.control.layers(this.mapService.baseMaps).addTo(map);
    L.control.scale().addTo(map);

    if (this.zoomControl) {
      L.control.zoom({ position: 'bottomright' }).addTo(map);
    }
    if (this.drawControl) {
     //TODO  this.configureDrawControl(map);
    }

    this.mapService.map = map;

  }

  protected configureDrawControl(map: L.Map): void {
    var editableLayers = new L.FeatureGroup();
    map.addLayer(editableLayers);

    var options: L.Control.IDrawConstructorOptions = {
      position: 'topright',
      draw: {
        polygon: {
          allowIntersection: false // Restricts shapes to simple polygons
        }
      },
      edit: {
        featureGroup: editableLayers, //REQUIRED!!
        remove: true
      }
    };

    var drawControl = new L.Control.Draw(options);
    map.addControl(drawControl);

    map.on('draw:created', function(e) {
      //TODO editableLayers.addLayer(e.layer);
    });
  }

  bindMapEvents(): void {
    let map = this.getMapService().map;
    var self = this;
    map.on('click', function(evt : L.LeafletLocationEvent) {
        self._clickEvtEmitter.emit(evt);
    });
    map.on('drag', function(evt) {
      self._dragEvtEmitter.emit(evt);
    });
    map.on('move', function(evt) {
      self._moveEvtEmitter.emit(evt);
    });
    map.on('moveend', function(evt) {
      self._moveEndEvtEmitter.emit(evt);
    });
    map.on('zoomlevelschange', function(evt) {
      self._zoomLevelEvtEmitter.emit(evt);
    });

  }

  onClickEvent(onNext: (value: any) => void): Object {
    return this._clickEvtEmitter.subscribe(onNext);
  }

  onDragEvent(onNext: (value: any) => void): Object {
    return this._dragEvtEmitter.subscribe(onNext);
  }

  onMoveEvent(onNext: (value: any) => void): Object {
    return this._moveEvtEmitter.subscribe(onNext);
  }

  onMoveEndEvent(onNext: (value: any) => void): Object {
    return this._moveEndEvtEmitter.subscribe(onNext);
  }

  onZoomLevelChangeEvent(onNext: (value: any) => void): Object {
    return this._zoomLevelEvtEmitter.subscribe(onNext);
  }

}

