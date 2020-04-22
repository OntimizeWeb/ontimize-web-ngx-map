import { HttpClient } from '@angular/common/http';
import { forwardRef, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

import { Location } from '../models/Location.class';

export class GeocodingService {

  constructor(@Inject(forwardRef(() => HttpClient)) private httpClient: HttpClient) { }

  geocode(address: string): Observable<any> {
    return this.httpClient
      .get('http://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address))
      .pipe(map((res: any) => res.json()))
      .pipe(map((result: any) => {
        if (result.status !== 'OK') {
          throw new Error('unable to geocode address');
        }
        const locations = result.results.map(r => {
          const location = new Location();
          location.address = r.formatted_address;
          location.latitude = r.geometry.location.lat;
          location.longitude = r.geometry.location.lng;
          return location;
        });
        return locations;
      }));
  }

  getCurrentLocation(): Observable<any> {
    return this.httpClient
      .get('http://ipv4.myexternalip.com/json')
      .pipe(map((res: any) => res.json().ip))
      .pipe(flatMap(ip => this.httpClient.get('http://freegeoip.net/json/' + ip)))
      .pipe(map((res: any) => res.json()))
      .pipe(map((result: any) => {
        const location = new Location();
        location.address = result.city + ', ' + result.region_code + ' ' + result.zip_code + ', ' + result.country_code;
        location.latitude = result.latitude;
        location.longitude = result.longitude;
        return location;
      }));
  }

}
