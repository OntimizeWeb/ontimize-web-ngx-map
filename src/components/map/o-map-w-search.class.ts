import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { OSearcher, OSearchable } from '../../interfaces';
import { SearcherDefault } from '../../core';
import { OMapWBaseLayer } from './o-map-w-baselayer.class';

export class OMapWSearch extends OMapWBaseLayer implements OSearcher {
	/**
	 * OSearcher implementation
	 */
	oSearchTitle: string = '';
	oSearchableCollection = null;
	get oSearcherCollection(): Array<OSearcher> {
		return this.mapSearchers;
	}

	public searchControl: boolean = true;
	public mapSearchers: Array<OSearcher> = [
		new SearcherDefault('Capas Base', () => this.mapBaseLayerGroup),
		new SearcherDefault('Capas', () => this.mapLayers)
	];

	/**
	 * OSearcher implementation
	 */
	search(oSearchValue: string): Observable<Array<OSearchable>> {
		let subject = new Subject<Array<OSearchable>>();
		this.oSearcherCollection.forEach(s => s.search(oSearchValue).subscribe(r => {
			if (r.length > 0) {
				subject.next(r);
			}
		}));
		return subject.asObservable();
	}
}
