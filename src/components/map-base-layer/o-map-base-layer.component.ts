import { Component, Inject, forwardRef } from '@angular/core';
import {
  OMapComponent
} from '../../components';
import {
  BaseLayer,
  OSearchable,
  OSearchResult
} from '../../interfaces';

@Component({
  selector: 'o-map-base-layer',
  providers: [],
  inputs: [
    'id: layer-id',
    'name: title',
    'urlTemplate: src',
    'active'
  ],
  template: require('./o-map-base-layer.component.html'),
  styles: [require('./o-map-base-layer.component.scss')]
})
export class OMapBaseLayerComponent implements BaseLayer, OSearchable {
  id: string;
  active: boolean = false;

  name: string;
  urlTemplate: string;

  public oSearchKeys: Array<string> = ['name'];
  get oSearchResult(): OSearchResult {
    return {
      label: this.name,
      icon: 'map',
      buttons: [{
        icon: ['visibility', 'visibility_off'],
        status: () => this.active,
        callback: () => this.select()
      }]
    };
  }

  constructor(
    @Inject(forwardRef(() => OMapComponent)) protected oMap: OMapComponent
  ) { }

  ngOnInit() {
    if (this.oMap) {
      var self = this;
      this.oMap.getLMap().on('baselayerchange', (evt) => {
        self.updateActiveState(evt['name']);
      });
    }
  }

  updateActiveState(layerId: string) {
    if (layerId === this.name) {
      this.active = true;
    } else {
      this.active = false;
    }
  }

  select(): boolean {
    this.oMap.unselectBaseLayers();
    this.oMap.getMapService().selectBaseLayer(this.id);
    return this.active = true;
  }
}
