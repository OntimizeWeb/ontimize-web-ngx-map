import { Layer } from 'leaflet';

import { OMapLayerOptions } from '../types/layer-options.type';
import { Center } from './Center.class';

export class LayerConfiguration {
  public layerId: string;
  public layerGroupId: string;
  public type: string;
  public center: Center;
  public points: any[];
  public radius: number;
  public bounds: any;
  public popup: string;
  public popupUrl: string;
  public menuLabel: string;
  public menuLabelSecondary: string;
  public service: string;
  public baseUrl: string;
  public options: OMapLayerOptions;
  public showInMenu: string;
  // Status of the label
  public selected: boolean = false;
  public visible: boolean = false;
  public inWS: boolean = false;
  public contextmenu: LayerConfigurationContextmenu;
}

export type LayerConfigurationFunction = (e: Layer) => LayerConfigurationContextmenuItem[];

export class LayerConfigurationContextmenu {
  contextmenuWidth?: number;
  contextmenuItems?: LayerConfigurationContextmenuItem[];
  contextmenuCallback?: Function;
  defaultContextmenuItems?: boolean = true;
  callback?: LayerConfigurationFunction;
}

export class LayerConfigurationContextmenuItem {
  label: string;
  attr?: string;
  index?: number;
  defaultContextmenuItems?: boolean = true;
  callback?: Function;
  icon?: string;
  separator?: boolean;
}
