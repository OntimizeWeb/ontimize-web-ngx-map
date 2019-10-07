import { Component, ViewChild, TemplateRef } from '@angular/core';

@Component({
  moduleId: module.id,
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

  @ViewChild('headerTemplateref', { read: TemplateRef })
  public headerTemplateref: TemplateRef<any>;

  constructor() {
    //
  }
}
