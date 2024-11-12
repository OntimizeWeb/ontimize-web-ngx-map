import { Observable } from "rxjs";

export interface IGeocodingService {
  geocode(address: string): Observable<any>;
  getCurrentLocation(): Observable<any>;
}
