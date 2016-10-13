import {ILatLng} from '../interfaces/ILatLng';


export class Location implements ILatLng {
    latitude: number;
    longitude: number;
    address: string;
}
