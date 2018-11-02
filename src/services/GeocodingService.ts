import { Http, Response } from '@angular/http';
import { Inject, forwardRef } from '@angular/core';
import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { Location } from '../core';

export class GeocodingService {

  constructor(@Inject(forwardRef(() => Http)) private http: Http) { }

  geocode(address: string): Observable<any> {
    return this.http
      .get('http://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address))
      .pipe(map((res: any) => res.json()))
      .pipe(map((result: any) => {
        if (result.status !== 'OK') { throw new Error('unable to geocode address'); }

        let locations = result.results.map(r => {
          let location = new Location();
          location.address = r.formatted_address;
          location.latitude = r.geometry.location.lat;
          location.longitude = r.geometry.location.lng;
          return location;
        });

        return locations;
      }));
  }

  getCurrentLocation(): Observable<any> {
    return this.http
      .get('http://ipv4.myexternalip.com/json')
      .pipe(map((res: any) => res.json().ip))
      .pipe(flatMap(ip => this.http.get('http://freegeoip.net/json/' + ip)))
      .pipe(map((res: Response) => res.json()))
      .pipe(map((result: any) => {
        var location = new Location();
        location.address = result.city + ', ' + result.region_code + ' ' + result.zip_code + ', ' + result.country_code;
        location.latitude = result.latitude;
        location.longitude = result.longitude;

        return location;
      }));
  }
}
