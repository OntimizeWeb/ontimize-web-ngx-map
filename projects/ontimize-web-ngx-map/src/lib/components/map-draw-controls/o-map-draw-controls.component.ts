import { Component, forwardRef, Inject, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { InputConverter } from 'ontimize-web-ngx';
import { Subscription } from 'rxjs';

import { OMapComponent } from '../map/o-map.component';
import { MapService } from '../../services/MapService';
import { OMapDrawControlsEvents } from './o-map-draw-controls-events.class';

const DEFAULT_INPUTS = [
  'position',
  'polylineOptions : polyline-options',
  'polygonOptions : polygon-options',
  'rectangleOptions : rectangle-options',
  'circleOptions : circle-options',
  'circleMarkerOptions : circlemarker-options',
  'markerOptions : marker-options',

  'editPolyOptions : edit-poly-options',
  'editHandlerOptions : edit-handler-options',
  'deleteHandlerOptions : delete-handler-options',
  'showControls: show-controls'
];

const DEFAULT_OUTPUTS = [
];

@Component({
  selector: 'o-map-draw-controls',
  templateUrl: './o-map-draw-controls.component.html',
  styleUrls: ['./o-map-draw-controls.component.scss'],
  inputs: DEFAULT_INPUTS,
  outputs: DEFAULT_OUTPUTS
})
export class OMapDrawControlsComponent implements OnInit, OnDestroy {

  public static DEFAULT_INPUTS = DEFAULT_INPUTS;
  public static DEFAULT_OUTPUTS = DEFAULT_OUTPUTS;

  protected static EMPTY_CONTROL_TAG = 'none';

  drawControl: L.Control.Draw;

  protected position: 'topleft' | 'topright' | 'bottomleft' | 'bottomright' = 'topright';
  // https://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html

  // DrawOptions

  protected polylineOptions: L.DrawOptions.PolylineOptions | boolean = {};
  protected polygonOptions: L.DrawOptions.PolygonOptions | boolean = {};
  protected rectangleOptions: L.DrawOptions.RectangleOptions | boolean = {};
  protected circleOptions: L.DrawOptions.CircleOptions | boolean = {};
  protected markerOptions: L.DrawOptions.MarkerOptions | boolean = {};
  protected circleMarkerOptions = {};

  // EditPolyOptions
  protected editPolyOptions: any = {};

  protected editHandlerOptions: any = {};

  protected deleteHandlerOptions: any = {};

  protected options: any;

  drawControlEvents: OMapDrawControlsEvents;

  private _editableLayers: L.FeatureGroup;

  protected onMapReadySubscription: Subscription;
  @InputConverter()
  protected showControls: boolean = true;

  constructor(@Inject(forwardRef(() => OMapComponent)) protected oMap: OMapComponent) {
  }

  ngOnInit() {
    if (this.oMap) {
      this.parseDrawOptions();
      this.setOptions();
      this.addDrawControlEvents();
      this.oMap.registerDrawControlComponent(this);

      this.onMapReadySubscription = this.oMap.onMapAfterViewInit().subscribe(() => {
        this.configureDrawControl();
      });
    }
  }

  ngOnDestroy() {
    if (this.onMapReadySubscription) {
      this.onMapReadySubscription.unsubscribe();
    }
  }

  getMapService(): MapService {
    return this.oMap.getMapService();
  }

  protected parseDrawOptions() {
    // drawOptions
    if (this.polylineOptions === OMapDrawControlsComponent.EMPTY_CONTROL_TAG) {
      this.polylineOptions = false;
    }
    if (this.polygonOptions === OMapDrawControlsComponent.EMPTY_CONTROL_TAG) {
      this.polygonOptions = false;
    }
    if (this.rectangleOptions === OMapDrawControlsComponent.EMPTY_CONTROL_TAG) {
      this.rectangleOptions = false;
    }
    if (this.circleOptions === OMapDrawControlsComponent.EMPTY_CONTROL_TAG) {
      this.circleOptions = false;
    }
    if (this.markerOptions === OMapDrawControlsComponent.EMPTY_CONTROL_TAG) {
      this.markerOptions = false;
    }
    if (this.circleMarkerOptions === OMapDrawControlsComponent.EMPTY_CONTROL_TAG) {
      this.circleMarkerOptions = false;
    }

    // editPolyOptions
    if (this.editPolyOptions === OMapDrawControlsComponent.EMPTY_CONTROL_TAG) {
      this.editPolyOptions = false;
    }

    // editHandlerOptions
    if (this.editHandlerOptions === OMapDrawControlsComponent.EMPTY_CONTROL_TAG) {
      this.editHandlerOptions = false;
    }

    // deleteHandlerOptions
    if (this.deleteHandlerOptions === OMapDrawControlsComponent.EMPTY_CONTROL_TAG) {
      this.deleteHandlerOptions = false;
    }

  }

  protected setOptions() {
    this.options = {
      position: this.position
    };

    const drawOptions: any = {
      polyline: this.polylineOptions,
      polygon: this.polygonOptions,
      rectangle: this.rectangleOptions,
      circle: this.circleOptions,
      marker: this.markerOptions,
      circlemarker: this.circleMarkerOptions
    };
    this.options.draw = drawOptions;

    if (this.editPolyOptions) {
      this.editableLayers = new L.FeatureGroup();

      this.editPolyOptions = {
        featureGroup: this.editableLayers,
        remove: this.deleteHandlerOptions
      };

      if (this.editHandlerOptions) {
        this.editPolyOptions.edit = this.editHandlerOptions;
      }
    }

    this.options.edit = this.editPolyOptions;
  }

  protected addDrawControlEvents(): void {
    this.drawControlEvents = new OMapDrawControlsEvents(this.editableLayers);
  }

  configureDrawControl(): void {
    const map: L.Map = this.oMap.getLMap();
    this.drawControl = new L.Control.Draw(this.options);
    if (this.showControls) {
      this.showDrawControl();
    }
    this.drawControlEvents.setMap(map);
  }

  removeDrawControl(): void {
    const map: L.Map = this.oMap.getLMap();
    map.removeControl(this.drawControl);
    const mapService: MapService = this.getMapService();
    mapService.removeDrawLayer();
  }

  showDrawControl() {
    const map: L.Map = this.oMap.getLMap();
    map.addControl(this.drawControl);
    const mapService: MapService = this.getMapService();
    mapService.addDrawLayer(this.editableLayers);
  }

  public get editableLayers(): L.FeatureGroup {
    return this._editableLayers;
  }
  public set editableLayers(value: L.FeatureGroup) {
    this._editableLayers = value;
  }
}
