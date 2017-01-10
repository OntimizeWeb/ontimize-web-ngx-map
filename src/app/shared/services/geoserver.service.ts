import { Injector } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import { APP_CONFIG, Config } from 'ontimize-web-ng2/ontimize';

import { IFeature, IGeoJSONLayerService } from 'ontimize-web-ng2-map/o-map';
import { LayerConfiguration } from 'ontimize-web-ng2-map/src/core/LayerConfiguration.class';

export class GeoServerService implements IGeoJSONLayerService {

  private dataObservable: Observable<IFeature[]>;
  private innerObserver: Observer<IFeature[]>;
  public dataStore: {
    features: IFeature[];
  };

  public test: string;

  private appConfig: Config;
  private http: Http;

  constructor(
    protected injector: Injector
  ) {
    this.http = this.injector.get(Http);
    this.appConfig = this.injector.get(APP_CONFIG);

    this.dataStore = { features: [] };

    this.test = new Date().toISOString();
  }

  public load(ctxt: [LayerConfiguration]): Observable<IFeature[]> {
    let [layerConf] = ctxt;

    this.dataObservable = new Observable<IFeature[]>(observer =>
      this.innerObserver = observer
    ).share();

    this.loadFeaturesFrom(
      this.initHeaders(),
      this.getBaseUrl(layerConf)
    );

    return this.dataObservable;
  }

  public getBaseUrl(layerConf: LayerConfiguration): string {
    let baseUrl = './assets/dummy-data/';
    return baseUrl + layerConf.type + '/' + layerConf.layerId + '.json';
  }

  private loadFeaturesFrom(headers: Headers, url: string) {
    this.http.get(url, { headers: headers })
      .map(response => response.json()).subscribe(data => {

        let features = data.features;
        if (features) {
          // Filtering features to show only Galician features...
          features.forEach((feature: any, index: number) => {
            if (feature && feature.geometry) {
              let type = feature.geometry.type;
              if (type === 'MultiPoint') {
                let coordX = feature.geometry.coordinates[0][0];
                let coordY = feature.geometry.coordinates[0][1];
                if (coordX <= -6.0 && coordX >= -10.0
                  && coordY >= 41.75) {
                  this.dataStore.features.push(feature);
                }
              } else if (type === 'MultiLineString') {
                let coordX = feature.geometry.coordinates[0][0][0];
                let coordY = feature.geometry.coordinates[0][0][1];
                if (coordX <= -6.0 && coordX >= -10.0
                  && coordY >= 41.75) {
                  this.dataStore.features.push(feature);
                }
              } else {
                this.dataStore.features.push(feature);
              }
            }
          });
        }

        // this.dataStore.features = data.features;
        this.innerObserver.next(this.dataStore.features);
      }, error => console.log('Could not load features.'));
  }

  private initHeaders(): Headers {
    var headers: Headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    return headers;
  }
}
