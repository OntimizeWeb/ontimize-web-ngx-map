import { Component } from '@angular/core';

const MARKER_LAYER_HTML_DATA = `
<o-map #oMapMarker center="42.940599, -7.120727" zoom="8" min-zoom="3" max-zoom="20"
zoom-control="yes" search-control="yes" layer-panel-visible="no" fxFlex>
<o-map-layer layer-type="marker" layer-id="office_marker" layer-center="42.240599;-8.720727"
layer-menu-label="Office headquarters " layer-menu-label-secondary="Location of office headquarters"></o-map-layer>
</o-map>
`;

@Component({
  selector: 'marker-layer',
  templateUrl: './marker-layer.component.html'
})
export class MarkerLayerComponent {

  constructor() { }

  getFiles() {
    return {
      'html': {
        'data': MARKER_LAYER_HTML_DATA
      },
      'scss': {
        'data': undefined
      },
      'typescript': {
        'data': undefined
      }
    };
  }
}

