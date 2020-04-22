import { Component, OnInit } from '@angular/core';
import { LeafletMouseEvent } from 'leaflet';
import * as L from 'leaflet';

import { MapService } from '../../services';

@Component({
  selector: 'o-marker',
  templateUrl: './o-marker.component.html',
  styleUrls: ['./o-marker.component.scss']
})
export class OMarkerComponent implements OnInit {
  protected _editing: boolean;
  protected _removing: boolean;
  public markerCount: number;
  private mapService: MapService;

  constructor(mapService: MapService) {
    this.editing = false;
    this.removing = false;
    this.markerCount = 0;
    this.mapService = mapService;
  }

  ngOnInit() {
    this.mapService.disableMouseEvent('add-marker');
    this.mapService.disableMouseEvent('remove-marker');
  }

  Initialize() {
    this.mapService.map.on('click', (e: LeafletMouseEvent) => {
      if (this.editing) {
        const marker = L.marker(e.latlng, {
          // icon: L.icon({
          //     iconUrl: require('../../../node_modules/leaflet/dist/images/marker-icon.png'),
          //     shadowUrl: require('../../../node_modules/leaflet/dist/images/marker-shadow.png')
          // }),
          draggable: true
        }).bindPopup('Marker #' + (this.markerCount + 1).toString(), {
          offset: L.point(12, 6)
        }).addTo(this.mapService.map);
        // .openPopup();

        this.markerCount += 1;

        marker.on('click', () => {
          if (this.removing) {
            this.mapService.map.removeLayer(marker);
            this.markerCount -= 1;
          }
        });
      }
    });
  }

  toggleEditing() {
    this.editing = !this.editing;

    if (this.editing === true && this.removing === true) {
      this.removing = false;
    }
  }

  toggleRemoving() {
    this.removing = !this.removing;

    if (this.editing === true && this.removing === true) {
      this.editing = false;
    }
  }

  get editing(): boolean {
    return this._editing;
  }

  set editing(val: boolean) {
    this._editing = val;
  }

  get removing(): boolean {
    return this._removing;
  }

  set removing(val: boolean) {
    this._removing = val;
  }
}
