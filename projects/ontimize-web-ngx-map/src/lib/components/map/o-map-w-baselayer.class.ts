import { BaseLayer } from '../../interfaces/baselayers/baselayers.interface';
import { OMapWMarkerCluster } from './o-map-w-markercluster.class';

export class OMapWBaseLayer extends OMapWMarkerCluster {
  private baseLayersGroup: Array<BaseLayer> = new Array<BaseLayer>();

  constructor() {
    super();
    /**
     * When configuration is triggered this subscription:
     * - creates a Leaflet layer panel
     * - adds baseLayers to map
     */
    this.onMapConfigured().subscribe(() => {
      this.getMapService().uploadBaseLayers();
      const bLayers = this.getMapService().baseLayers.getBaseLayers();
      if (bLayers && bLayers.length > 0) {
        const layerId = bLayers[0].id;
        this.getMapService().selectBaseLayer(layerId);
      }
    });
  }

  /**
   * Look for changes on MapService baseLayers
   * @return
   */
  get baseLayers(): Array<BaseLayer> {
    let newBaseLayerGroup = this.getMapService().baseLayers.getBaseLayers();
    if (this.baseLayersGroup.length !== newBaseLayerGroup.length) {
      this.baseLayersGroup = newBaseLayerGroup.map(bL => this.buildBaseLayerUrl(bL));
    }
    return this.baseLayersGroup;
  }

  /**
   * Makes all baseLayers inactive
   */
  unselectBaseLayers() {
    this.mapBaseLayerGroup.forEach(bL => bL.active = false);
  }

  /**
   * Transforms baseLayers url to the same tile
   * @param baseLayer - The baseLayer to transform
   * @return
   */
  private buildBaseLayerUrl(bL: BaseLayer): BaseLayer {
    let url = bL.urlTemplate.replace('{s}', 'b').replace('{x}', '974').replace('{y}', '758').replace('{z}', '11');
    if (url && url.indexOf('//') === 0) {
      url = 'http:' + url;
    }
    if (url.indexOf('{variant}') > -1) {
      url = url.replace('{variant}', bL.options['variant']);
    }
    return {
      id: bL.id,
      active: bL.active,
      name: bL.name,
      urlTemplate: url
    };
  }
}
