import * as L from 'leaflet';

import type { OMapLayerComponent } from '../map-layer/o-map-layer.component';
import type { OMapCrsComponent } from './o-map-crs.component';

export interface ICRSConfiguration {
  epsg: string;
  epsg_configuration: string;
  epsg_args?: Object;
}

export interface ICRSConfigurationParameter {
  crs?: string;
  crsConfiguration?: ICRSConfiguration;
}

export class OMapCrsConfigurationClass {
  // OMapComponent | OMapLayerComponent
  static getCRSFromConfigurationObject(comp: OMapCrsComponent | OMapLayerComponent) {
    let result;
    const crsParam: ICRSConfiguration = comp.getCRSConfigurationParam().crsConfiguration;
    let args = {};
    if (crsParam !== undefined && crsParam.epsg_args !== undefined) {
      args = crsParam.epsg_args;
    }
    if (crsParam.epsg !== undefined && crsParam.epsg_configuration !== undefined) {
      result = new L.Proj.CRS(crsParam.epsg, crsParam.epsg_configuration, args);
    }
    return result;
  }

  static getCRSObject(arg: OMapCrsComponent | OMapLayerComponent) {
    const conf: ICRSConfigurationParameter = arg.getCRSConfigurationParam();
    if (conf.crs !== undefined && L.CRS && L.CRS[conf.crs]) {
      // EPSG3857 EPSG4326 EPSG900913 L.CRS.Earth L.CRS.Simple
      return L.CRS[conf.crs];
    } else if (conf.crsConfiguration !== undefined) {
      return OMapCrsConfigurationClass.getCRSFromConfigurationObject(arg);
    }
    return undefined;
  }
}
