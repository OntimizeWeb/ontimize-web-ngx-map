import { Geometry } from '../core';

export class Feature {
	id: string;
	geometry: Geometry;
	geometry_name: string;
	properties: Object;
}
