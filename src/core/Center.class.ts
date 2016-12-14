import { ILatLng } from '../interfaces';

export class Center implements ILatLng {
	latitude: number;
	longitude: number;

	constructor(lat: number, lng: number) {
		this.latitude = lat;
		this.longitude = lng;
	}
}
