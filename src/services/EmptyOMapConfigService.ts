import { IOMapConfigService } from '../interfaces';

export class EmptyOMapConfigService implements IOMapConfigService {
	getConfig(param: string): string {
		return undefined;
	}

	getService(param: string): any {
		return undefined;
	}

	getRoute(param: string): string {
		return undefined;
	}
}
