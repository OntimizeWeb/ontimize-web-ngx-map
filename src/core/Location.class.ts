import { ILatLng } from '../interfaces';

export class Location implements ILatLng {
	latitude: number;
	longitude: number;
	address: string;
}
