import { ILayerService } from './ILayerService';

export interface IOMapConfigService {
	getConfig(param: string): string;
	getService(param: string): ILayerService;
	getRoute(param: string): string;
}
