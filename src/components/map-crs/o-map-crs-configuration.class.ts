
import * as L from 'leaflet';
import { OMapLayerComponent/*, OMapComponent*/ } from '../../components/index';
import { OMapCrsComponent } from './o-map-crs.component';


export interface ICRSConfiguration {
  espg: string;
  espg_configuration: string;
  resolutions?: Array<number>;
  origin?: Array<number>;
}

export interface ICRSConfigurationParameter {
  crs?: string;
  crsConfiguration?: any;
}

export class OMapCrsConfigurationClass {
  // OMapComponent | OMapLayerComponent
  static getCRSFromConfigurationObject(comp: OMapCrsComponent | OMapLayerComponent) {
    let result = undefined;
    let crsParam: ICRSConfiguration = comp.getCRSConfigurationParam().crsConfiguration;
    if (crsParam !== undefined) {
      let args = {};
      if (crsParam.resolutions !== undefined) {
        args['resolutions'] = crsParam.resolutions;
      }
      if (crsParam.origin !== undefined) {
        args['origin'] = crsParam.origin;
      }
      if (crsParam.espg !== undefined && crsParam.espg_configuration !== undefined) {
        result = new L.Proj.CRS(crsParam.espg, crsParam.espg_configuration, args);
      }
    }
    return result;
  }

  static getCRSObject(arg: OMapCrsComponent | OMapLayerComponent) {
    let conf: ICRSConfigurationParameter = arg.getCRSConfigurationParam();
    if (conf.crs !== undefined && L.CRS && L.CRS[conf.crs]) {
      // EPSG3857 EPSG4326 EPSG900913 L.CRS.Earth L.CRS.Simple
      return L.CRS[conf.crs];
    } else if (conf.crsConfiguration !== undefined) {
      return OMapCrsConfigurationClass.getCRSFromConfigurationObject(arg);
    }
    return undefined;
  }
}
