import { Component, Inject, forwardRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {
  polylineOptions,
  polygonOptions,
  rectangleOptions,
  circleOptions,
  markerOptions,
  DrawOptions,
  EditPolyOptions,
  EditHandlerOptions,
  DeleteHandlerOptions
} from 'leaflet-draw';

import * as L from 'leaflet';
import { OMapComponent } from '../../components';

import { OMapDrawControlsEvents } from './o-map-draw-controls-events.class';
import { MapService } from '../../services/MapService';


const DEFAULT_INPUTS = [
  'position',
  'polylineOptions : polyline-options',
  'polygonOptions : polygon-options',
  'rectangleOptions : rectangle-options',
  'circleOptions : circle-options',
  'markerOptions : marker-options',

  'editPolyOptions : edit-poly-options',
  'editHandlerOptions : edit-handler-options',
  'deleteHandlerOptions : delete-handler-options'
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

  protected position: 'topleft' | 'topright' | 'bottomleft' | 'bottomright' = 'topright';
  // https://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html

  // DrawOptions
  protected polylineOptions: polylineOptions = {};
  protected polygonOptions: polygonOptions = {};
  protected rectangleOptions: rectangleOptions = {};
  protected circleOptions: circleOptions = {};
  protected markerOptions: markerOptions = {};

  // EditPolyOptions
  protected editPolyOptions: EditPolyOptions = {};
  // EditHandlerOptions
  protected editHandlerOptions: EditHandlerOptions = {};
  // DeleteHandlerOptions
  protected deleteHandlerOptions: DeleteHandlerOptions = {};

  protected options: L.Control.IDrawConstructorOptions;

  drawControlEvents: OMapDrawControlsEvents;

  protected editableLayers: L.FeatureGroup;

  protected onMapReadySubscription: Subscription;

  constructor( @Inject(forwardRef(() => OMapComponent)) protected oMap: OMapComponent) {
  }

  ngOnInit() {
    if (this.oMap) {
      this.parseDrawOptions();
      this.setOptions();
      this.addDrawControlEvents();
      this.oMap.registerDrawControlComponent(this);

      this.onMapReadySubscription = this.oMap.onMapReady().subscribe(() => {
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

    let drawOptions: DrawOptions = {
      polyline: this.polylineOptions,
      polygon: this.polygonOptions,
      rectangle: this.rectangleOptions,
      circle: this.circleOptions,
      marker: this.markerOptions
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

  protected configureDrawControl(): void {
    const map: L.Map = this.oMap.getLMap();
    var drawControl = new L.Control.Draw(this.options);
    map.addControl(drawControl);

    let mapService: MapService = this.getMapService();
    mapService.addDrawLayer(this.editableLayers);
    this.drawControlEvents.setMap(map);
  }

}
