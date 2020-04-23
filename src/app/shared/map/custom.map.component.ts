import { Injector, forwardRef, ElementRef, Component } from '@angular/core';
import { OComponent } from 'ontimize-web-ngx';

import {
  OMapComponent, MapService
  // ChartFactory, ChartDataAdapterFactory
} from 'ontimize-web-ngx-map';

// import { CustomMapFactory } from './custom.map.factory';

// @OComponent({
//   selector: 'custom-map',
//   providers: [
//     MapService,
//     { provide: OMapComponent, useExisting: forwardRef(() => CustomMapComponent) }
//   ],
//   inputs: [
//     ...OMapComponent.DEFAULT_INPUTS
//   ]
// })

@Component({
  selector: 'custom-map',
  template: '<div></div>',
  providers: [
    MapService,
    { provide: OMapComponent, useExisting: forwardRef(() => CustomMapComponent) }
  ],
  inputs: [
    ...OMapComponent.DEFAULT_INPUTS
  ]
})
export class CustomMapComponent extends OMapComponent {

  constructor(
    protected elRef: ElementRef,
    protected injector: Injector) {

    super(elRef, injector);
  }

  // public ngOnInit() {
  //   super.ngOnInit();
  // }

  // getChartFactory(): ChartFactory {
  //   return new CustomChartFactory();
  // }

  // getChartDataAdapterFactory(): ChartDataAdapterFactory {
  //   return super.getChartDataAdapterFactory();
  // }

}
