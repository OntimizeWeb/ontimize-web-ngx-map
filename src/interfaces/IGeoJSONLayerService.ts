import { ILayerService } from './ILayerService';
import { LayerConfiguration } from '../core/LayerConfiguration.class';

export interface IGeoJSONLayerService extends ILayerService {
  getBaseUrl(layerConf: LayerConfiguration): string;
}
