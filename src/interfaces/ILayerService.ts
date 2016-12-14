import { Observable } from 'rxjs/Observable';

export interface ILayerService {
	load(ctxt?: Array<any>): Observable<any>;
}
