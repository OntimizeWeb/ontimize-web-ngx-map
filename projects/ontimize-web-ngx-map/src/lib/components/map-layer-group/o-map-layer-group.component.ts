import { Component, forwardRef, Inject, OnInit, ViewChildren, ViewEncapsulation } from '@angular/core';
import { InputConverter } from 'ontimize-web-ngx';

import { OMapLayerGroup } from '../../interfaces/o-map-layer-group.interface';
import { LayerConfiguration } from '../../models/LayerConfiguration.class';
import { LayerGroupConfiguration } from '../../models/LayerGroupConfiguration.class';
import { OMapLayerGroupsWarehouse } from '../../models/LayerGroupsWarehouse.class';
import { OMapLayerComponent } from '../map-layer/o-map-layer.component';
import { OMapComponent } from '../map/o-map.component';

@Component({
  selector: 'o-map-layer-group',
  providers: [],
  inputs: [
    'id: group-id',
    'idParent: group-id-parent',
    'name: group-name',
    'description: group-description',
    'collapsed: group-collapsed',
    'refGroup: group-ref'
  ],
  templateUrl: './o-map-layer-group.component.html',
  styleUrls: ['./o-map-layer-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.o-map-layer-group]': 'true'
  }
})
export class OMapLayerGroupComponent implements OMapLayerGroup, OnInit {

  id: string;
  idParent: string;
  name: string;
  protected _description: string;
  @InputConverter()
  collapsed: boolean = false;
  refGroup: LayerGroupConfiguration;

  public mapLayers: LayerConfiguration[] = [];
  public mLayerGroupsWarehouse: OMapLayerGroupsWarehouse = new OMapLayerGroupsWarehouse();

  @ViewChildren(forwardRef(() => OMapLayerComponent)) layerChildren: OMapLayerComponent[];
  @ViewChildren(forwardRef(() => OMapLayerGroupComponent)) layerGroupChildren: OMapLayerGroupComponent[];

  constructor(
    @Inject(forwardRef(() => OMapComponent)) protected oMap: OMapComponent
  ) { }

  ngOnInit() {
    if (!!this.refGroup) {
      this.mapLayers = this.refGroup.mapLayers;
      this.mLayerGroupsWarehouse = this.refGroup.layerGroupsWarehouse;
    }
  }

  public hasChildInWS(): boolean {
    let childLayerGroupInWS: boolean = false;
    if (this.layerGroupChildren) {
      this.layerGroupChildren.forEach(lg => {
        if (lg.hasChildInWS()) {
          childLayerGroupInWS = true;
        }
      });
    }
    let childLayerInWS: boolean = false;
    if (this.layerChildren) {
      this.layerChildren.forEach(l => {
        if (l.inWS) {
          childLayerInWS = true;
        }
      });
    }
    return childLayerGroupInWS || childLayerInWS;
  }

  public getMapLayers() {
    return this.mapLayers;
  }

  public getLayerGroups() {
    if (this.mLayerGroupsWarehouse.all &&
      this.mLayerGroupsWarehouse.all.length > 0) {
      return this.mLayerGroupsWarehouse.all;
    }
    return [];
  }

  public getLayerCenter(layerConf: LayerConfiguration): string {
    let center;
    if (layerConf && layerConf.center) {
      center = layerConf.center.latitude + ';' + layerConf.center.longitude;
    }
    return center;
  }

  public toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  get description(): string {
    return this._description;
  }

  set description(val: string) {
    this._description = val;
  }

}
