import { Component, forwardRef, Inject, OnInit } from '@angular/core';

import { OMapComponent } from '../map/o-map.component';
import { ICRSConfiguration, ICRSConfigurationParameter, OMapCrsConfigurationClass } from './o-map-crs-configuration.class';

const DEFAULT_INPUTS = [
  'crs',
  'crsConfiguration : crs-configuration'
];

const DEFAULT_OUTPUTS = [
];

@Component({
  selector: 'o-map-crs',
  templateUrl: './o-map-crs.component.html',
  styleUrls: ['./o-map-crs.component.scss'],
  inputs: DEFAULT_INPUTS,
  outputs: DEFAULT_OUTPUTS
})
export class OMapCrsComponent implements OnInit {

  public static DEFAULT_INPUTS = DEFAULT_INPUTS;
  public static DEFAULT_OUTPUTS = DEFAULT_OUTPUTS;

  protected crs: string;
  protected crsConfiguration: ICRSConfiguration;

  constructor(
    @Inject(forwardRef(() => OMapComponent)) protected oMap: OMapComponent
  ) {

  }

  ngOnInit() {
    if (this.oMap) {
      this.oMap.registerCRSComponent(this);
    }
  }

  getCRSConfigurationParam(): ICRSConfigurationParameter {
    return {
      crsConfiguration: this.crsConfiguration,
      crs: this.crs
    };
  }

  getCRS() {
    return OMapCrsConfigurationClass.getCRSObject(this);
  }

}
