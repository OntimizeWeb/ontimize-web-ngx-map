import { Observable } from 'rxjs';

export interface ILayerService {
  load(ctxt?: Array<any>): Observable<any>;
}
