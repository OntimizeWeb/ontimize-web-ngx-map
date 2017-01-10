import { Injector, forwardRef, ElementRef, OnInit } from '@angular/core';
import { OComponent } from 'ontimize-web-ng2/ontimize';

import {
  OMapComponent, MapService
  // ChartFactory, ChartDataAdapterFactory
} from 'ontimize-web-ng2-map/o-map';

// import { CustomMapFactory } from './custom.map.factory';

@OComponent({
  selector: 'custom-chart',
  providers: [
    MapService,
    { provide: OMapComponent, useExisting: forwardRef(() => CustomMapComponent) }],
  inputs: [
    ...OMapComponent.DEFAULT_INPUTS
  ]
})
export class CustomMapComponent extends OMapComponent implements OnInit {

  constructor(
    protected elRef: ElementRef,
    protected injector: Injector) {

    super(elRef, injector);
  }

  public ngOnInit() {
    super.ngOnInit();
  }

  // getChartFactory(): ChartFactory {
  //   return new CustomChartFactory();
  // }

  // getChartDataAdapterFactory(): ChartDataAdapterFactory {
  //   return super.getChartDataAdapterFactory();
  // }

}
