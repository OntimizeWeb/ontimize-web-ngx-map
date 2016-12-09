import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {
    OSearcher,
    OSearchable
} from '../../interfaces';
import {
    OMapWBaseLayer
} from './o-map-w-baselayer.class';

class DefaultSearcher implements OSearcher {
    public oSearchTitle: string = '';
    private collection: () => Array<OSearchable>;

    constructor(title?: string, collection?: () => Array<OSearchable>) {
        if (!!title) {
            this.oSearchTitle = title;
        }
        this.setSearchableCollection(collection);
    }

    setSearchableCollection(collection: () => Array<OSearchable>) {
        return this.collection = collection;
    }
    getSearchableCollection(): Array<OSearchable> {
        return this.collection();
    }

    getSearcherCollection(): Array<OSearcher> {
        return [];
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
        return subject.asObservable();
    }
}

export class OMapWSearch extends OMapWBaseLayer implements OSearcher {
    public searchControl: boolean = true;
    public mapSearchers: Array<OSearcher> = [
        new DefaultSearcher('Capas Base', () => this.mapBaseLayerGroup),
        new DefaultSearcher('Capas', () => this.mapLayers)
    ];

    public oSearchTitle: string = '';

    getSearchableCollection(): Array<OSearchable> {
        return [];
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
