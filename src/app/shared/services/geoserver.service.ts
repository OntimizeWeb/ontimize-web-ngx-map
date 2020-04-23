import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injector } from '@angular/core';
import { APP_CONFIG, Config } from 'ontimize-web-ngx';
import { IFeature, IGeoJSONLayerService, LayerConfiguration } from 'ontimize-web-ngx-map';
import { Observable, Observer } from 'rxjs';
import { map, share } from 'rxjs/operators';

export class GeoServerService implements IGeoJSONLayerService {

  private dataObservable: Observable<IFeature[]>;
  private innerObserver: Observer<IFeature[]>;
  public dataStore: {
    features: IFeature[];
  };

  public test: string;

  private appConfig: Config;
  private http: HttpClient;

  constructor(
    protected injector: Injector
  ) {
    this.http = this.injector.get(HttpClient);
    this.appConfig = this.injector.get(APP_CONFIG);

    this.dataStore = { features: [] };

    this.test = new Date().toISOString();
  }

  public load(ctxt: [LayerConfiguration]): Observable<IFeature[]> {
    let [layerConf] = ctxt;

    this.dataObservable = new Observable<IFeature[]>(observer =>
      this.innerObserver = observer
    ).pipe(share());

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

  private loadFeaturesFrom(headers: HttpHeaders, url: string) {
    const options: any = {
      headers: headers
    };

    this.http.get(url, options)
      // .pipe(map(response => response.json()))
      .subscribe((data: any) => {

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

  private initHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json;charset=UTF-8',
    });
  }

}
