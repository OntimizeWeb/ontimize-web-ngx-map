import {
  Component,
  Injector,
  ElementRef,
  OnInit,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { MdIconRegistry, MdSidenav } from '@angular/material';
import { TranslatePipe } from 'ng2-translate/ng2-translate';
import { OMapBaseLayerComponent, OMapLayerGroupComponent, OMapWorkspaceComponent } from '../../components';
import { OMarkerComponent } from '../marker/o-marker.component';
import { MapService, GeocodingService } from '../../services';
import { Feature } from '../../core';
import { Util } from '../../utils';
import { OMapWSearch } from './o-map-w-search.class';

import * as L from 'leaflet';
//TODO import {Control} from 'leaflet-draw';

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
export class OMapComponent extends OMapWSearch implements OnInit {
  @ViewChild(OMarkerComponent) markerComponent: OMarkerComponent;
  @ViewChild('sidenav') sideNavCmp: MdSidenav;
  @ViewChildren('mainBaseLayerGroup') mapBaseLayerGroup: Array<OMapBaseLayerComponent>;
  @ViewChild('mainLayerGroup') mapLayerGroup: OMapLayerGroupComponent;
  @ViewChild('oMapWorkspace') mapWorkspace: OMapWorkspaceComponent;

  public set sCenter(center: string) {
    this.setCenter(center);
  }
  public sZoom: string;
  public sMinZoom: string;
  public sMaxZoom: string;
  public sZoomControl: string;
  public sSearchControl: string;
  public sDrawControl: string;

  constructor(
    protected elRef: ElementRef,
    protected injector: Injector
  ) {
    super();
    this.mapService = this.injector.get(MapService);
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
      console.debug('Initializing map...');
      this.configureMap();
    }
  }

  ngAfterViewInit() {
    this.toggleSidenav();
    // Enable search on workspace?
    //this.mapSearchers.push(this.mapWorkspace);
  }

  protected configureMap() {
    L.Icon.Default.imagePath = './vendor/leaflet/dist/images/';

    let mapOptions = {
      zoomControl: false,
      center: new L.LatLng(this.getCenter().latitude, this.getCenter().longitude),
      zoom: this.zoom ? this.zoom : 12,
      minZoom: this.minZoom ? this.minZoom : 4,
      maxZoom: this.maxZoom ? this.maxZoom : 19,
      layers: [this.mapService.baseLayers.getTileLayer(MapService.DEFAULT_BASE_MAP)],
      drawControl: false
    };

    let map = this.mapService.getMap('map', mapOptions);

    if (this.zoomControl) {
      L.control.zoom({ position: 'bottomright' }).addTo(map);
    }

    if (this.drawControl) {
      //TODO  this.configureDrawControl(map);
    }

    this.mapConfiguration.emit(true);
  }

}

