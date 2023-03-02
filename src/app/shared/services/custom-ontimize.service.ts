import { Injector } from '@angular/core';
import { OntimizeService, Util } from 'ontimize-web-ngx';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

export class CustomOntimizeService extends OntimizeService {

  public customUrlBase: string;

  constructor(protected injector: Injector) {
    super(injector);
  }

  public getDefaultServiceConfiguration(serviceName?: string): object {
    const configuration = this._config.getServiceConfiguration();

    let servConfig = {};
    if (serviceName && configuration.hasOwnProperty(serviceName)) {
      servConfig = configuration[serviceName];
    }
    return servConfig;
  }

  public configureService(config: any): void {
    super.configureService(config);
    this.customUrlBase = './assets/dummy-data';
  }

  public startsession(user: string, password: string): Observable<any> {
    return undefined;
  }

  public endsession(user: string, sessionId: number): Observable<any> {
    return undefined;
  }

  public hassession(user: string, sessionId: number): Observable<any> {
    return undefined;
  }

  public query(kv?: object, av?: Array<string>, entity?: string, sqltypes?: object): Observable<any> {
    entity = (Util.isDefined(entity)) ? entity : this.entity;

    let url = this.customUrlBase;
    if (entity === 'EMovements') {
      url += '/emovements.json';
    } else if (entity === 'EMovementTypes') {
      url += '/emovementtypes.json';
    } else if (entity === 'EMovementTypesTotal') {
      url += '/emovementtypestotal.json';
    } else if (entity === 'EMovementsGrouped') {
      url += '/emovementsgrouped.json';
    } else if (entity === 'EAccounts') {
      url += '/eaccounts.json';
    }

    const options = {
      headers: this.buildHeaders()
    };

    let innerObserver: any;
    const dataObservable = new Observable(observer => innerObserver = observer).pipe(share());

    this.httpClient.get(url, options).subscribe((resp: any) => {
      if (resp && resp.code === 3) {
        this.authService.logout();
      } else if (resp.code === 1) {
        innerObserver.error(resp.message);
      } else if (resp.code === 0) {
        innerObserver.next(resp);
      } else {
        // Unknow state -> error
        innerObserver.error('Service unavailable');
      }
    }, error => innerObserver.error(error),
      () => innerObserver.complete());

    return dataObservable;
  }

  public advancedQuery(kv?: object, av?: Array<string>, entity?: string, sqltypes?: object, offset?: number, pagesize?: number,
    orderby?: object[]): Observable<any> {
    return undefined;
  }

  public insert(av: object = {}, entity?: string, sqltypes?: object): Observable<any> {
    return undefined;
  }

  public update(kv: object = {}, av: object = {}, entity?: string, sqltypes?: object): Observable<any> {
    return undefined;
  }

  public delete(kv: object = {}, entity?: string, sqltypes?: object): Observable<any> {
    return undefined;
  }

}
