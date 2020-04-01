import { Geometry } from '../models';

export class Feature {
  id: string;
  geometry: Geometry;
  geometry_name: string;
  properties: Object;
}
