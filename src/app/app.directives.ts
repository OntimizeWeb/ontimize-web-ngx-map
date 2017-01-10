import { MainComponent } from './+main';
import { HOME_DIRECTIVES } from './+main/+home';
import { BASIC_USAGE_DIRECTIVES } from './+main/+basic';
import { MARKER_LAYER_DIRECTIVES } from './+main/+marker-layer';
import { GEOJSON_LAYER_DIRECTIVES } from './+main/+geojson-layer';
import { WMS_LAYER_DIRECTIVES } from './+main/+wms-layer';
import { SHARED_DIRECTIVES } from './shared';

// All directives of the application
export const APP_DIRECTIVES: any = [
  MainComponent,
  HOME_DIRECTIVES,
  BASIC_USAGE_DIRECTIVES,
  MARKER_LAYER_DIRECTIVES,
  GEOJSON_LAYER_DIRECTIVES,
  WMS_LAYER_DIRECTIVES,
  SHARED_DIRECTIVES
];
