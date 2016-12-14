import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { OSearcher, OSearchable } from '../interfaces';

export class SearcherDefault implements OSearcher {
	/**
	 * OSearcher implementation
	 */
	oSearchTitle: string = '';
	oSearcherCollection = [];
	get oSearchableCollection(): Array<OSearchable> {
		return this.collection();
	}

	private collection: () => Array<OSearchable>;

	constructor(title?: string, collection?: () => Array<OSearchable>) {
		if (!!title) {
			this.oSearchTitle = title;
		}
		this.setSearchableCollection(collection);
	}

	/**
	 * OSearcher implementation
	 */
	search(oSearchValue: string): Observable<Array<OSearchable>> {
		let subject = new Subject<Array<OSearchable>>();
		setTimeout(() => subject.next(this.oSearchableCollection.filter(sc => {
			let r = false,
				l = sc.oSearchKeys.length;
			for (let i = 0; i < l && !r; i++) {
				let k = sc.oSearchKeys[i],
					t = sc[k] ? this.transformSearchTerm(sc[k]) : '';
				r = t.indexOf(this.transformSearchTerm(oSearchValue)) > -1;
			}
			return r;
		})), 1);
		return subject.asObservable();
	}

	setSearchableCollection(collection: () => Array<OSearchable>) {
		return this.collection = collection;
	}

	private transformSearchTerm(s: string): string {
		let t = s.toLowerCase();
		// Keyboard mapping
		t = t.replace(/[ç]/g,'c')
			.replace(/[àáäâã]/g, 'a')
			.replace(/[èéëê]/g, 'e')
			.replace(/[ìíïî]/g, 'i')
			.replace(/[òóöôõ]/g, 'o')
			.replace(/[ùúüû]/g, 'u');
		// Galician interference
		t = t.replace(/\bel\b/g, 'o')
			.replace(/\bla\b/g, 'a')
			.replace(/(ua)/g, 'a')
			.replace(/(ie|ei)/g, 'e')
			.replace(/(ou|ue)/g, 'o')
			.replace(/(ll|y|lh|ie)/g, 'i')
			.replace(/(nh|nn|ny|ñ)/g, 'n')
			.replace(/(ch)/g,'c')
			.replace(/(gh)/g,'g')
			.replace(/(j|g)/g, 'x')
			.replace(/\b(h)/g, 'f')
			.replace(/(ito)/g,'ino')
			.replace(/(aa|ee|ii|oo|uu)/g,r => r[0]);
		return t;
	}
}
