import { IFeature } from './IFeature';
import { ILayerService } from './ILayerService';
import { Observable } from 'rxjs/Observable';
import { LayerConfiguration } from '../core/LayerConfiguration.class';

export interface IGeoJSONLayerService extends ILayerService {

	getBaseUrl(layerConf: LayerConfiguration): string;
}
