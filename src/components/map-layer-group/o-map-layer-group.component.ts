import { Component, Inject, forwardRef, ViewChildren } from '@angular/core';
import {
  OMapComponent,
  OMapLayerComponent
} from '../../components';
import { LayerConfiguration, LayerGroupConfiguration, OMapLayerGroupsWarehouse } from '../../core';

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
  styleUrls: ['./o-map-layer-group.component.scss']
})
export class OMapLayerGroupComponent {
  id: string;
  idParent: string;
  name: string;
  protected _description: string;
  protected _collapsed: boolean = false;
  refGroup: LayerGroupConfiguration;

  public mapLayers: Array<LayerConfiguration> = new Array<LayerConfiguration>();
  public mLayerGroupsWarehouse: OMapLayerGroupsWarehouse = new OMapLayerGroupsWarehouse();

  @ViewChildren(OMapLayerComponent) layerChildren: OMapLayerComponent[];
  @ViewChildren(OMapLayerGroupComponent) layerGroupChildren: OMapLayerGroupComponent[];

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
    var childLayerGroupInWS: boolean = false;
    if (this.layerGroupChildren) {
      this.layerGroupChildren.forEach(lg => {
        if (lg.hasChildInWS()) {
          childLayerGroupInWS = true;
        }
      });
    }
    var childLayerInWS: boolean = false;
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

  protected getLayerCenter(layerConf: LayerConfiguration): string {
    let center = undefined;
    if (layerConf && layerConf.center) {
      center = layerConf.center.latitude + ';' + layerConf.center.longitude;
    }
    return center;
  }

  public toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  get collapsed(): boolean {
    return this._collapsed;
  }

  set collapsed(val: boolean) {
    this._collapsed = val;
  }

  get description(): string {
    return this._description;
  }

  set description(val: string) {
    this._description = val;
  }
}
