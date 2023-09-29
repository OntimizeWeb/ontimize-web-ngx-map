import { LayerConfiguration } from '../models';
import { ILayerService } from './ILayerService';

export interface IGeoJSONLayerService extends ILayerService {
  getBaseUrl(layerConf: LayerConfiguration): string;
}
