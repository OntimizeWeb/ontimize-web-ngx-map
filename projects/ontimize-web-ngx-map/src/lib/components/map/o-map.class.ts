import { EventEmitter } from '@angular/core';
import * as L from 'leaflet';
import { BehaviorSubject } from 'rxjs';

import { Zoom } from '../../interfaces/IZoom';
import { Center } from '../../models/Center.class';
import { MapService } from '../../services/MapService';
import { TranslateMapService } from '../../services/TranslateMapService';
import { Util } from '../../utils/util';
import { OMapBaseLayerComponent } from '../map-base-layer/o-map-base-layer.component';
import { OMapLayerComponent } from '../map-layer/o-map-layer.component';

const DEFAULT_CENTER = new Center(42.2274519, -8.7236805);

export class OMapBase {
  public zoom: Zoom = { control: true };
  protected translateMapService: TranslateMapService;
  protected mapBaseLayerGroup: Array<OMapBaseLayerComponent> = new Array<OMapBaseLayerComponent>();
  protected mapLayers: Array<OMapLayerComponent> = new Array<OMapLayerComponent>();
  protected mapService: MapService;
  protected mapConfiguration: EventEmitter<any> = new EventEmitter();
  protected mapAfterViewInit: EventEmitter<any> = new EventEmitter();
  protected mapReady: BehaviorSubject<any> = new BehaviorSubject(undefined);
  private center: Center;

  /**
   * Get individual layer
   * @param layerId - Id of the layer to find
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
   * @param layer - The layer to add
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
   */
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
   * @param sCenter - 'latitude, longitude' string
   */
  public setCenter(sCenter: string) {
    if (Util.isBlank(sCenter)) {
      this.center = DEFAULT_CENTER;
    } else {
      const coordinates = sCenter.split(/,|;/);
      if (coordinates.length === 2) {
        const latitude = parseFloat(coordinates[0]);
        const longitude = parseFloat(coordinates[1]);
        this.center = new Center(latitude, longitude);
      } else {
        this.center = DEFAULT_CENTER;
      }
    }

    const map = this.getMapService().map;
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

  public onMapConfigured(): EventEmitter<any> {
    return this.mapConfiguration;
  }

  public onMapAfterViewInit(): EventEmitter<any> {
    return this.mapAfterViewInit;
  }

  public onMapReady(): BehaviorSubject<any> {
    return this.mapReady;
  }

}
