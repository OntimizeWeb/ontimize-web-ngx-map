import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {
    OSearcher,
    OSearchable
} from '../../interfaces';
import {
    OMapWEvents
} from './o-map-w-events.class';

export class OMapWSearch extends OMapWEvents implements OSearcher {
    public searchControl: boolean = true;
    public mapSearchers: Array<OSearcher>;

    getSearchableCollection(): Array<OSearchable> {
        return this.mapLayers;
    }

    getSearcherCollection(): Array<OSearcher> {
        return this.mapSearchers;
    }

    search(oSearchValue: string): Observable<Array<OSearchable>> {
        let subject = new Subject<Array<OSearchable>>();
        setTimeout(() => subject.next(this.getSearchableCollection().filter(sc => {
            let r = false;
            sc.oSearchKeys.forEach(k => {
                r = r || (sc[k] ? sc[k].toString() : '').indexOf(oSearchValue) > -1;
            });
            return r;
        })), 1);
        this.getSearcherCollection().forEach(s => s.search(oSearchValue).subscribe(r => r.length > 0 && subject.next(r)));
        return subject.asObservable();
    }
}
