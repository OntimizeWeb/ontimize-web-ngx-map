import { ILayerService } from '../interfaces';
import * as L from 'leaflet';

export class Util {

	static parseBoolean(value: string, defaultValue?: boolean): boolean {
		if ((typeof value === 'string') && (value.toUpperCase() === 'TRUE' || value.toUpperCase() === 'YES')) {
			return true;
		} else if ((typeof value === 'string') && (value.toUpperCase() === 'FALSE' || value.toUpperCase() === 'NO')) {
			return false;
		} else if (defaultValue !== undefined || defaultValue !== null) {
			return defaultValue;
		}
		return false;
	}

	static parseArray(value: string): string[] {
		if (value) {
			return value.split(';');
		}
		return [];
	}

	/**
	 * Checks wether specified service as argument implements 'ILayerService' interface
	 * @param  {any} arg The service instance for checking.
	 * @returns boolean
	 */
	static isLayerService(arg: any): arg is ILayerService {
		return arg && ((arg as ILayerService).load !== undefined);
	}

	static isGeoJSONLayer(arg: any): arg is L.GeoJSON {
		return arg && ((arg as L.GeoJSON).addData !== undefined);
	}

	static isTileLayer(arg: any): arg is L.TileLayer {
		return arg && ((arg as L.TileLayer).setZIndex !== undefined &&
			(arg as L.TileLayer).on !== undefined);
	}

	static isBlank(value: any): boolean {
		let isBlank = false;
		if (value === undefined || value === null || value.length === 0) {
			isBlank = true;
		}
		return isBlank;
	}
}
