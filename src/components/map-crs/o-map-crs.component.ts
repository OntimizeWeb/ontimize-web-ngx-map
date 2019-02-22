import { Component, Inject, forwardRef } from '@angular/core';
import { OMapComponent } from '../../components';
import { ICRSConfiguration, OMapCrsConfigurationClass, ICRSConfigurationParameter } from './o-map-crs-configuration.class';

const DEFAULT_INPUTS = [
  'crs',
  'crsConfiguration : crs-configuration'
];

const DEFAULT_OUTPUTS = [
];

@Component({
  moduleId: module.id,
  selector: 'o-map-crs',
  templateUrl: './o-map-crs.component.html',
  styleUrls: ['./o-map-crs.component.scss'],
  inputs: DEFAULT_INPUTS,
  outputs: DEFAULT_OUTPUTS
})
export class OMapCrsComponent {

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
