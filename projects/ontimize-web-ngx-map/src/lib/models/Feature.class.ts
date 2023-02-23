import { Geometry } from './Geometry.class';

export class Feature {
  id: string;
  geometry: Geometry;
  geometry_name: string;
  properties: Object;
}
