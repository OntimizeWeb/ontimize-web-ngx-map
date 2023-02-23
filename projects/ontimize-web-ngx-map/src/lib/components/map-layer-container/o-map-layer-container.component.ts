import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'o-map-layer-container',
  inputs: [
    'label'
  ],
  templateUrl: './o-map-layer-container.component.html',
  host: {
    '[class.o-map-layer-container]': 'true'
  }
})
export class OMapLayerContainerComponent {

  public label: string;

  @ViewChild('headerTemplateref', { read: TemplateRef, static: false })
  public headerTemplateref: TemplateRef<any>;

  constructor() {
    //
  }
}
