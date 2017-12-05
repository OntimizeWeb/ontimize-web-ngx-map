import { Component, Inject, forwardRef } from '@angular/core';
import { OMapComponent } from '../../components';
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
export class OMapDrawControlsComponent {

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

  constructor( @Inject(forwardRef(() => OMapComponent)) protected oMap: OMapComponent) {
  }

  ngOnInit() {
    if (this.oMap) {
      this.parseDrawOptions();
      this.setOptions();
      this.configureDrawControl();
      this.oMap.registerDrawControlComponent(this);
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
      let mapService: MapService = this.getMapService();
      mapService.addDrawLayer(this.editableLayers);

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

  protected configureDrawControl(): void {
    const map: L.Map = this.oMap.getLMap();

    var drawControl = new L.Control.Draw(this.options);
    map.addControl(drawControl);

    this.drawControlEvents = new OMapDrawControlsEvents(map, this.editableLayers);
  }

}
