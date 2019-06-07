import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, forwardRef, Inject, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import * as L from 'leaflet';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { OMapComponent, OMapLayerFactory } from '../../components';
import { ILayerService, OSearchable, OSearchResult } from '../../interfaces';
import { Center, LayerConfiguration } from '../../models';
import { LayerConfigurationContextmenu } from '../../models/LayerConfiguration.class';
import { MapService, TranslateMapService } from '../../services';
import { Util } from '../../utils';
import { ICRSConfiguration, ICRSConfigurationParameter } from '../map-crs/o-map-crs-configuration.class';


@Component({
  moduleId: module.id,
  selector: 'o-map-layer',
  providers: [MapService],
  inputs: [
    'sCenter : layer-center',
    'sPoints : layer-points',
    'sRadius : layer-radius',
    'sBounds : layer-bounds',
    'sService : layer-service',
    'baseUrl  : layer-base-url',
    'selected : layer-selected',
    'visible : layer-visible',
    'inWS : layer-in-ws',
    'inMenu : layer-in-menu',
    'layerId : layer-id',
    'layerGroupId : layer-group-id',
    'type : layer-type',
    'popup : layer-popup',
    'popupUrl : layer-popup-url',
    'menuLabel : layer-menu-label',
    'menuLabelSecondary : layer-menu-label-secondary',
    'icon : layer-icon',
    'options : layer-options',
    'crs',
    'crsConfiguration : crs-configuration',
    'contextMenu : layer-contextmenu'

  ],
  templateUrl: './o-map-layer.component.html',
  styleUrls: ['./o-map-layer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.o-map-layer]': 'true'
  }
})
export class OMapLayerComponent implements OnInit, AfterViewInit, OSearchable {
  sCenter: string;
  sPoints: string;
  sRadius: string;
  sBounds: string;
  sService: string;

  // Status of the label
  public selected: boolean = false;
  public visible: boolean = true;
  protected _inWS: boolean = true;
  public inMenu: string;

  protected _layerId: string;
  public layerGroupId: string;
  public type: string;
  public center: Center;
  public points: any[];
  public radius: number;
  public bounds: any;
  public popup: string;
  public popupUrl: string;
  protected _menuLabel: string;
  protected _menuLabelSecondary: string;
  public service: ILayerService;
  public baseUrl: string;
  protected _icon: string;
  public options: Object;
  protected _contextmenu;

  protected crs: string;
  protected crsConfiguration: ICRSConfiguration;
  protected translateMapService: TranslateMapService;

  public oSearchKeys: Array<string> = ['menuLabel', 'menuLabelSecondary'];

  layer: L.Layer;
  protected layerConf: LayerConfiguration;

  private rendered: boolean = null;
  private _clickEvtEmitter: EventEmitter<any> = new EventEmitter();
  private _dblClickEvtEmitter: EventEmitter<any> = new EventEmitter();
  private _mouseDownEvtEmitter: EventEmitter<any> = new EventEmitter();
  private _mouseUpEvtEmitter: EventEmitter<any> = new EventEmitter();
  private _mouseOverEvtEmitter: EventEmitter<any> = new EventEmitter();
  private _mouseOutEvtEmitter: EventEmitter<any> = new EventEmitter();
  private _mouseMoveEvtEmitter: EventEmitter<any> = new EventEmitter();
  private _dragStartEvtEmitter: EventEmitter<any> = new EventEmitter();
  private _dragEvtEmitter: EventEmitter<any> = new EventEmitter();
  private _dragEndEvtEmitter: EventEmitter<any> = new EventEmitter();
  private _resizeEvtEmitter: EventEmitter<any> = new EventEmitter();
  private _popupOpenEvtEmitter: EventEmitter<any> = new EventEmitter();
  private _popupCloseEvtEmitter: EventEmitter<any> = new EventEmitter();
  private _contextmenuEvtEmitter: EventEmitter<any> = new EventEmitter();
  protected oMapConfigurationSubscription: Subscription;

  protected layerAfterViewInitStream: EventEmitter<Object> = new EventEmitter<Object>();
  protected layerMapConfigured: EventEmitter<Object> = new EventEmitter<Object>();
  protected layerStream: Observable<any>;
  protected layerStreamSubscription: Subscription;

  constructor(
    @Inject(forwardRef(() => OMapComponent)) protected oMap: OMapComponent,
    protected injector: Injector
  ) {
    this.translateMapService = this.injector.get(TranslateMapService);
    this.layerStream = combineLatest(
      this.layerAfterViewInitStream.asObservable(),
      this.layerMapConfigured.asObservable()
    );

    this.layerStreamSubscription = this.layerStream.subscribe(() => {
      if (oMap) {
        this.oMap.addOMapLayer(this);
        this.updateStatus();
      }
    });

    this.oMapConfigurationSubscription = this.oMap.onMapReady().subscribe((oMap) => {
      if (oMap) {
        this.layerMapConfigured.emit(true);
      }
    });
  }

  ngOnInit() {
    this.inMenu = this.inMenu ? this.inMenu : 'overlay';
  }

  ngAfterViewInit() {
    this.layerAfterViewInitStream.emit(true);
  }

  ngOnDestroy() {
    if (this.oMapConfigurationSubscription) {
      this.oMapConfigurationSubscription.unsubscribe();
    }
    if (this.layerStreamSubscription) {
      this.layerStreamSubscription.unsubscribe();
    }
  }

  getCRSConfigurationParam(): ICRSConfigurationParameter {
    return {
      crsConfiguration: this.crsConfiguration,
      crs: this.crs
    };
  }

  get oSearchResult(): OSearchResult {
    return {
      label: this.menuLabel,
      sublabel: this.menuLabelSecondary,
      icon: this.icon || 'layers',
      buttons: [{
        icon: ['check_box', 'check_box_outline_blank'],
        status: () => this.inWS,
        callback: () => this.toggleInWS()
      }, {
        icon: ['visibility', 'visibility_off'],
        status: () => this.visible,
        callback: () => this.toggleVisible()
      }]
    };
  }

  getMapService(): MapService {
    return this.oMap.getMapService();
  }

  getMapLayerFactory(): any {
    return new OMapLayerFactory();
  }
  getLayerConfiguration(): LayerConfiguration {
    if (this.layerConf === undefined) {
      this.layerConf = this.createLayerConfiguration();
    }
    return this.layerConf;
  }
  createLayerConfiguration(): LayerConfiguration {
    let layerConf = new LayerConfiguration();
    layerConf.layerId = this.layerId;
    layerConf.type = this.type;
    layerConf.center = this.center;
    layerConf.popup = this.popup;
    layerConf.selected = this.selected;
    layerConf.visible = this.visible;
    layerConf.inWS = this.inWS;
    layerConf.menuLabel = this.menuLabel;
    layerConf.menuLabelSecondary = this.menuLabelSecondary;
    layerConf.service = this.sService;
    layerConf.baseUrl = this.baseUrl;
    layerConf.showInMenu = this.inMenu;
    layerConf.options = this.options;
    layerConf.contextmenu = this.contextMenu;

    return layerConf;
  }

  initializeMapLayer() {
    var self = this;
    if (!this.center && this.sCenter) {
      var coordinates = this.sCenter.split(/,|;/);
      if (coordinates.length === 2) {
        let aux: number[] = [];
        for (var i in coordinates) {
          aux[i] = parseFloat(coordinates[i]);
        }
        this.center = new Center(aux[0], aux[1]);
      }
    }

    if (!this.service && this.sService && this.sService.length > 0) {
      this.service = this.oMap.getInjector().get(this.sService);
    }
    this.layerConf = this.createLayerConfiguration();

    if (this.popupUrl && this.popupUrl.length > 0) {
      this.loadPopupTpl().subscribe(data => {
        self.popup = data;
        self.layerConf.popup = data;
        self.createMapLayer(self.layerConf);
      }, () => {
        console.log('Could not load popup template.');
        self.popup = '';
        self.layerConf.popup = '';
        self.createMapLayer(self.layerConf);
      });
    } else {
      self.createMapLayer(self.layerConf);
    }
  }

  createMapLayer(layerConf: LayerConfiguration) {
    let mapService = this.getMapService();
    this.layer = this.getMapLayerFactory().createMapLayer(layerConf, mapService);

    if (Util.isLayerService(this.service) &&
      Util.isGeoJSONLayer(this.layer)) {
      var self = this;
      (<ILayerService>this.service).load([layerConf])
        .subscribe(resp => {
          (<L.GeoJSON>self.layer).addData(resp);
        }, err => {
          console.log(err);
        });
    }

    this.bindLayerEvents();
  }

  public setSelected(status: boolean) {
    return this.toggleSelected(status);
  }

  public toggleSelected(status?: boolean) {
    this.selected = !Util.isBlank(status) ? status : !this.selected;
    this.updateStatus();
    return this.selected;
  }

  public setInWS(status: boolean) {
    return this.toggleInWS(status);
  }

  public toggleInWS(status?: boolean) {
    this.inWS = !Util.isBlank(status) ? status : !this.inWS;
    this.updateStatus();
    return this.inWS;
  }

  public setVisible(status: boolean) {
    return this.toggleVisible(status);
  }

  public toggleVisible(status?: boolean) {
    this.visible = !Util.isBlank(status) ? status : !this.visible;
    this.updateStatus();
    return this.visible;
  }

  public setZIndex(i: number) {
    if (Util.isTileLayer(this.layer)) {
      this.layer.setZIndex(i);
    }
  }

  public updateStatus() {
    let mapService = this.getMapService();

    let notCreated = !!this.visible && !!this.inWS && this.rendered === null;
    let createdNotRendered = !!this.visible && !!this.inWS && !this.rendered;
    let renderedNotVisible = !this.visible && !!this.rendered;

    if (notCreated) {
      this.initializeMapLayer();
      this.rendered = true;
    } else if (createdNotRendered) {
      mapService.addLayer(this.layerId, this.layer, !this.visible, this.inMenu, this.menuLabel);
      this.rendered = true;
    } else if (renderedNotVisible) {
      mapService.removeLayer(this.layerId);
      this.rendered = false;
    }
    this.oMap.mapWorkspace.updateMapLayers();
  }

  /**
     * @see('http://leafletjs.com/reference.html#map-events')
     * @returns void
     */
  bindLayerEvents(): void {
    var self = this;
    if (Util.isTileLayer(this.layer)) {
      this.layer.on('click', function (evt) {
        self._clickEvtEmitter.emit(evt);
      });
      this.layer.on('dblclick', function (evt) {
        self._dblClickEvtEmitter.emit(evt);
      });
      this.layer.on('mousedown', function (evt) {
        self._mouseDownEvtEmitter.emit(evt);
      });
      this.layer.on('mouseup', function (evt) {
        self._mouseUpEvtEmitter.emit(evt);
      });
      this.layer.on('mouseover', function (evt) {
        self._mouseOverEvtEmitter.emit(evt);
      });
      this.layer.on('mouseout', function (evt) {
        self._mouseOutEvtEmitter.emit(evt);
      });
      this.layer.on('mousemove', function (evt) {
        self._mouseMoveEvtEmitter.emit(evt);
      });
      this.layer.on('dragstart', function (evt) {
        self._dragStartEvtEmitter.emit(evt);
      });
      this.layer.on('drag', function (evt) {
        self._dragEvtEmitter.emit(evt);
      });
      this.layer.on('dragend', function (evt) {
        self._dragEndEvtEmitter.emit(evt);
      });
      this.layer.on('resize', function (evt) {
        self._resizeEvtEmitter.emit(evt);
      });
      this.layer.on('popupopen', function (evt) {
        self._popupOpenEvtEmitter.emit(evt);
      });
      this.layer.on('popupclose', function (evt) {
        self._popupCloseEvtEmitter.emit(evt);
      });

      this.layer.on('contextmenu', function (evt) {
        self._contextmenuEvtEmitter.emit(evt);
      });
    }
  }

  onClickEvent(onNext: (value: any) => void): Object {
    return this._clickEvtEmitter.subscribe(onNext);
  }

  onDoubleClickEvent(onNext: (value: any) => void): Object {
    return this._dblClickEvtEmitter.subscribe(onNext);
  }

  onMouseDownEvent(onNext: (value: any) => void): Object {
    return this._mouseDownEvtEmitter.subscribe(onNext);
  }

  onMouseUpEvent(onNext: (value: any) => void): Object {
    return this._mouseUpEvtEmitter.subscribe(onNext);
  }

  onMouseOverEvent(onNext: (value: any) => void): Object {
    return this._mouseOverEvtEmitter.subscribe(onNext);
  }

  onMouseOutEvent(onNext: (value: any) => void): Object {
    return this._mouseOutEvtEmitter.subscribe(onNext);
  }

  onMouseMoveEvent(onNext: (value: any) => void): Object {
    return this._mouseMoveEvtEmitter.subscribe(onNext);
  }

  onDragStartEvent(onNext: (value: any) => void): Object {
    return this._dragStartEvtEmitter.subscribe(onNext);
  }

  onDragEvent(onNext: (value: any) => void): Object {
    return this._dragEvtEmitter.subscribe(onNext);
  }

  onDragEndEvent(onNext: (value: any) => void): Object {
    return this._dragEndEvtEmitter.subscribe(onNext);
  }

  onResizeEvent(onNext: (value: any) => void): Object {
    return this._resizeEvtEmitter.subscribe(onNext);
  }

  onPopupCloseEvent(onNext: (value: any) => void): Object {
    return this._popupCloseEvtEmitter.subscribe(onNext);
  }

  onPopupOpenEvent(onNext: (value: any) => void): Object {
    return this._popupOpenEvtEmitter.subscribe(onNext);
  }

  public loadPopupTpl(): Observable<any> {
    var headers: Headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    let _http = this.injector.get(HttpClient);
    return _http.get(this.popupUrl)
      .pipe(map((response: any) => response.text()));
  }

  get layerId(): string {
    return this._layerId;
  }

  set layerId(val: string) {
    this._layerId = val;
  }

  get icon(): string {
    return (this._icon && this._icon.length) ? this._icon : 'layers';
  }

  set icon(val: string) {
    this._icon = val;
  }

  get inWS(): boolean {
    return this._inWS;
  }

  set inWS(val: boolean) {
    this._inWS = val;
  }

  get menuLabelSecondary(): string {
    return this._menuLabelSecondary;
  }

  set menuLabelSecondary(val: string) {
    this._menuLabelSecondary = val;
  }

  get menuLabel(): string {
    return this._menuLabel;
  }

  set menuLabel(val: string) {
    this._menuLabel = val;
  }

  set contextMenu(val: LayerConfigurationContextmenu) {
    if (!val) {
      return;
    }

    this._contextmenu = val;

    if (val.defaultContextmenuItems) {
      this._contextmenu.contextmenuItems = this._contextmenu.contextmenuItems.concat(this.getMapService().defaultContextMenu.contextmenuItems);
    }
    
    if(!this._contextmenu.contextmenuItems){
      return;
    }

    this._contextmenu.contextmenuItems = this.getMapService().parseContextmenuItems(this._contextmenu.contextmenuItems);
  }

  get contextMenu(): LayerConfigurationContextmenu {
    return this._contextmenu;
  }

}
